-- SIH 26130: Veriqo Prototype Initial Schema
-- Maharashtra Business Approval Prototype — Problem Statement 26130
-- Version: 2.0  Updated: 2026-11

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- UTILITY: auto-update updated_at on any row mutation
-- ============================================================
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 1. BUSINESSES
-- ============================================================
CREATE TABLE IF NOT EXISTS businesses (
    id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id               UUID,  -- references auth.users(id) when auth is enabled
    name                  TEXT NOT NULL,
    trade_name            TEXT,
    entity_type           TEXT NOT NULL DEFAULT 'Private Limited Company',
    cin                   TEXT,
    pan                   TEXT,
    gstin                 TEXT,
    sector                TEXT NOT NULL,
    sub_sector            TEXT NOT NULL,
    state                 TEXT NOT NULL DEFAULT 'Maharashtra',
    district              TEXT NOT NULL,
    taluka                TEXT,
    village_city          TEXT,
    pincode               TEXT,
    location_type         TEXT NOT NULL DEFAULT 'MIDC'
                            CHECK (location_type IN ('MIDC', 'Non-MIDC')),
    industrial_area       TEXT,
    plot_number           TEXT,
    project_type          TEXT NOT NULL DEFAULT 'New Project',
    project_stage         TEXT NOT NULL DEFAULT 'Proposed / Pre-Construction',
    total_investment_inr  NUMERIC DEFAULT 0,
    proposed_employment   INTEGER DEFAULT 0,
    built_up_area_sqft    NUMERIC DEFAULT 0,
    power_requirement_kw  NUMERIC DEFAULT 0,
    water_requirement_kld NUMERIC DEFAULT 0,
    is_food_storage       BOOLEAN DEFAULT FALSE,
    storage_type          TEXT,
    storage_capacity_mt   NUMERIC DEFAULT 0,
    temperature_range     TEXT,
    contact_name          TEXT NOT NULL,
    contact_designation   TEXT,
    contact_email         TEXT NOT NULL,
    contact_phone         TEXT NOT NULL,
    profile_completion_pct INTEGER DEFAULT 0 CHECK (profile_completion_pct BETWEEN 0 AND 100),
    created_at            TIMESTAMPTZ DEFAULT NOW(),
    updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_sector ON businesses(sector);

CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ============================================================
-- 2. DOCUMENTS (Document Vault)
-- ============================================================
CREATE TABLE IF NOT EXISTS documents (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id         UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    doc_code            TEXT NOT NULL,
    doc_name            TEXT NOT NULL,
    category            TEXT NOT NULL DEFAULT 'LEGAL'
                          CHECK (category IN ('LEGAL','LAND','TECHNICAL','FINANCIAL','ENVIRONMENTAL')),
    file_name           TEXT NOT NULL,
    file_size_kb        INTEGER DEFAULT 0,
    file_url            TEXT,
    verification_status TEXT NOT NULL DEFAULT 'UPLOADED'
                          CHECK (verification_status IN ('UPLOADED','PENDING_VERIFICATION','VERIFIED','REJECTED','EXPIRED')),
    uploaded_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_business_id ON documents(business_id);
CREATE INDEX IF NOT EXISTS idx_documents_doc_code ON documents(doc_code);
CREATE INDEX IF NOT EXISTS idx_documents_verification_status ON documents(verification_status);

-- ============================================================
-- 3. APPLICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS applications (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_number      TEXT UNIQUE NOT NULL,
    business_id     UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    approval_code   TEXT NOT NULL,
    approval_name   TEXT NOT NULL,
    department      TEXT NOT NULL,
    authority_name  TEXT NOT NULL,
    status          TEXT NOT NULL DEFAULT 'DRAFT'
                      CHECK (status IN (
                        'DRAFT','VALIDATION_ERROR','READY_TO_SUBMIT','SUBMITTED',
                        'ASSIGNED','UNDER_REVIEW','QUERY_RAISED','QUERY_RESPONDED',
                        'INSPECTION_SCHEDULED','INSPECTION_COMPLETED',
                        'FINAL_REVIEW','APPROVED','REJECTED'
                      )),
    sla_days        INTEGER DEFAULT 30,
    sla_due_date    TIMESTAMPTZ,
    form_data       JSONB DEFAULT '{}'::jsonb,
    submitted_at    TIMESTAMPTZ,
    decided_at      TIMESTAMPTZ,
    decision_reason TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_business_id ON applications(business_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_app_number ON applications(app_number);

CREATE TRIGGER trg_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ============================================================
-- 4. APPLICATION DOCUMENTS (Documents attached to applications)
-- ============================================================
CREATE TABLE IF NOT EXISTS application_documents (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    document_id    UUID REFERENCES documents(id) ON DELETE SET NULL,
    doc_code       TEXT NOT NULL,
    doc_name       TEXT NOT NULL,
    is_mandatory   BOOLEAN DEFAULT TRUE,
    status         TEXT NOT NULL DEFAULT 'ATTACHED'
                     CHECK (status IN ('MISSING','ATTACHED','VERIFIED','REJECTED')),
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_app_docs_application_id ON application_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_app_docs_document_id ON application_documents(document_id);

-- ============================================================
-- 5. APPLICATION EVENTS (Immutable Audit Timeline)
-- ============================================================
CREATE TABLE IF NOT EXISTS application_events (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    actor_role     TEXT NOT NULL DEFAULT 'SYSTEM'
                     CHECK (actor_role IN ('ENTREPRENEUR','OFFICER','SYSTEM')),
    actor_name     TEXT,
    event_type     TEXT NOT NULL,
    title          TEXT NOT NULL,
    description    TEXT,
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_application_id ON application_events(application_id);
CREATE INDEX IF NOT EXISTS idx_events_actor_role ON application_events(actor_role);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON application_events(created_at DESC);

-- ============================================================
-- 6. QUERIES & RESPONSES
-- ============================================================
CREATE TABLE IF NOT EXISTS queries (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    officer_name   TEXT NOT NULL,
    title          TEXT NOT NULL,
    query_text     TEXT NOT NULL,
    status         TEXT NOT NULL DEFAULT 'OPEN'
                     CHECK (status IN ('OPEN','RAISED','RESPONDED','RESOLVED')),
    created_at     TIMESTAMPTZ DEFAULT NOW(),
    updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_queries_application_id ON queries(application_id);
CREATE INDEX IF NOT EXISTS idx_queries_status ON queries(status);

CREATE TRIGGER trg_queries_updated_at
  BEFORE UPDATE ON queries
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TABLE IF NOT EXISTS query_responses (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    query_id      UUID NOT NULL REFERENCES queries(id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    document_id   UUID REFERENCES documents(id) ON DELETE SET NULL,
    submitted_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_query_responses_query_id ON query_responses(query_id);

-- ============================================================
-- 7. INSPECTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS inspections (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id  UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    officer_name    TEXT NOT NULL,
    scheduled_date  TEXT NOT NULL,   -- stored as text to support display formats like '29 Aug 2026'
    scheduled_time  TEXT NOT NULL,
    location        TEXT NOT NULL,
    status          TEXT NOT NULL DEFAULT 'SCHEDULED'
                      CHECK (status IN ('SCHEDULED','IN_PROGRESS','COMPLETED')),
    outcome         TEXT DEFAULT 'PENDING'
                      CHECK (outcome IN ('PENDING','SATISFACTORY','UNSATISFACTORY','FOLLOW_UP_REQUIRED')),
    remarks         TEXT,
    checklist       JSONB,           -- array of InspectionChecklistItem
    completed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inspections_application_id ON inspections(application_id);
CREATE INDEX IF NOT EXISTS idx_inspections_status ON inspections(status);

CREATE TRIGGER trg_inspections_updated_at
  BEFORE UPDATE ON inspections
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ============================================================
-- 8. NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID,  -- null means system-level; links to auth.users when auth is enabled
    title      TEXT NOT NULL,
    message    TEXT NOT NULL,
    type       TEXT NOT NULL DEFAULT 'INFO'
                 CHECK (type IN ('INFO','ACTION_REQUIRED','SUCCESS','WARNING')),
    link_url   TEXT,
    is_read    BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (enable but allow all in prototype mode)
-- Real policies should be added in migration 003 when auth is configured
-- ============================================================
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE query_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Prototype permissive policy: all roles can access all records.
-- Replace with row-scoped policies in 003_rls_policies.sql for production.
CREATE POLICY "prototype_allow_all" ON businesses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "prototype_allow_all" ON documents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "prototype_allow_all" ON applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "prototype_allow_all" ON application_documents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "prototype_allow_all" ON application_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "prototype_allow_all" ON queries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "prototype_allow_all" ON query_responses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "prototype_allow_all" ON inspections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "prototype_allow_all" ON notifications FOR ALL USING (true) WITH CHECK (true);
