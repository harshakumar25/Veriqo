import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/lib/use-app-store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  Building2,
  FileCheck2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Gift,
  Award,
  Zap,
  Calendar,
  ChevronRight,
  FileText,
} from 'lucide-react';
import './DashboardPage.css';

export default function EntrepreneurDashboardPage() {
  const { business, application, queries, events, inspection } = useAppStore();

  const openQueries = queries.filter((q) => q.status === 'OPEN');
  const isApproved = application.status === 'APPROVED';
  const hasActiveQuery = openQueries.length > 0 && !isApproved;

  // Dynamic status & progress calculations for Approval Insights
  const completedCount = isApproved ? 2 : 1; // Stage 1 approvals
  const inProgressCount = isApproved ? 0 : 1;
  const actionRequiredCount = hasActiveQuery ? 1 : 0;
  const pendingCount = 9 - completedCount - inProgressCount - actionRequiredCount;
  
  // Visual progress weight matching the reference UI
  const progressPercent = isApproved ? 85 : 72;
  const circumference = 2 * Math.PI * 45; // radius 45 -> 282.74
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <div className="page-body ent-dash-container">
      {/* ── Top Header with Business Context & Quick Navigation ── */}
      <div className="ent-dash-header">
        <div className="ent-dash-header-left">
          <div className="ent-dash-badges-row">
            <span className="badge badge-blue">MAHARASHTRA SINGLE WINDOW</span>
            <span className="badge badge-green">PROFILE VERIFIED (92%)</span>
            {isApproved && <span className="badge badge-green">CLEARANCE ACTIVE</span>}
          </div>
          <h1 className="ent-dash-title">
            {business.name}
          </h1>
          <div className="ent-dash-meta">
            <span>
              <MapPin size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> {business.plotNumber},{' '}
              {business.industrialArea}, {business.district}, {business.state} ({business.locationType})
            </span>
            <span className="ent-dash-meta-sep">•</span>
            <span>{business.sector} &gt; {business.subSector}</span>
            <span className="ent-dash-meta-sep">•</span>
            <span>Capacity: {business.storageCapacityMt?.toLocaleString()} MT</span>
          </div>
        </div>

        <div className="ent-dash-header-actions">
          <Link to="/business-profile" className="btn btn-secondary">
            <Building2 size={14} /> Business Profile
          </Link>
          <Link to="/roadmap" className="btn btn-primary">
            Regulatory Roadmap <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── 1. Hero Clearance or Action Banner ── */}
      {isApproved ? (
        <div className="ent-banner-approved">
          <div className="ent-banner-content">
            <div className="ent-banner-icon-box">
              <Award size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="ent-banner-title">
                  FSSAI Central Licence Clearance Approved
                </span>
                <span className="badge badge-green" style={{ fontSize: '11px' }}>
                  APR-MH-2026-00124
                </span>
              </div>
              <div className="ent-banner-desc">
                Statutory food storage clearance granted for 5,000 MT facility at MIDC Chakan Phase II. Official reference:{' '}
                <strong>{application.decisionReason || 'APR-MH-2026-00124'}</strong>.
              </div>
            </div>
          </div>
          <Link to={`/application/${application.id}`} className="btn btn-primary btn-sm">
            <ShieldCheck size={14} /> View Approved Dossier & Certificate
          </Link>
        </div>
      ) : hasActiveQuery ? (
        <div className="ent-banner-query">
          <div className="ent-banner-content">
            <div className="ent-banner-icon-box amber">
              <AlertCircle size={22} />
            </div>
            <div>
              <div className="ent-banner-title">
                ACTION REQUIRED: Department Clarification Requested
              </div>
              <div className="ent-banner-desc">
                {openQueries[0]?.title || 'Officer requested updated documentation on active application.'}
              </div>
            </div>
          </div>
          <Link to={`/query/${openQueries[0]?.id || 'latest'}`} className="btn btn-primary btn-sm">
            Respond to Query <ArrowRight size={12} />
          </Link>
        </div>
      ) : (
        <div className="ent-banner-clear">
          <div className="ent-banner-content">
            <div className="ent-banner-icon-box blue">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div className="ent-banner-title">
                YOU&apos;RE ALL CAUGHT UP
              </div>
              <div className="ent-banner-desc">
                No pending actions required. All submitted applications are progressing through the single-window workflow.
              </div>
            </div>
          </div>
          <Link to="/roadmap" className="btn btn-secondary btn-sm">
            View Roadmap Status
          </Link>
        </div>
      )}

      {/* ── 2. Top KPI Pods (Matches Screenshot Metrics) ── */}
      <div className="ent-kpi-grid">
        <div className="ent-kpi-card">
          <div className="ent-kpi-icon-wrap green">
            <FileCheck2 size={20} />
          </div>
          <div className="ent-kpi-content">
            <span className="ent-kpi-value">9</span>
            <span className="ent-kpi-label">Approvals Identified</span>
          </div>
        </div>

        <div className="ent-kpi-card">
          <div className="ent-kpi-icon-wrap orange">
            <Zap size={20} />
          </div>
          <div className="ent-kpi-content">
            <span className="ent-kpi-value" style={{ color: hasActiveQuery ? '#ea580c' : '#0f172a' }}>
              {hasActiveQuery ? '1' : '0'}
            </span>
            <span className="ent-kpi-label">Action Required</span>
          </div>
        </div>

        <div className="ent-kpi-card">
          <div className="ent-kpi-icon-wrap blue">
            <FileText size={20} />
          </div>
          <div className="ent-kpi-content">
            <span className="ent-kpi-value">
              {isApproved ? '0' : '1'}
            </span>
            <span className="ent-kpi-label">Application in Progress</span>
          </div>
        </div>

        <div className="ent-kpi-card">
          <div className="ent-kpi-icon-wrap amber">
            <Gift size={20} />
          </div>
          <div className="ent-kpi-content">
            <span className="ent-kpi-value">4</span>
            <span className="ent-kpi-label">Potential Incentives</span>
          </div>
        </div>
      </div>

      {/* ── 3. Split Grid: Current Priorities & Approval Insights ── */}
      <div className="ent-split-grid">
        {/* Left: Current Priorities */}
        <div className="ent-card">
          <div className="ent-card-header">
            <div>
              <div className="ent-card-title">Current Priorities</div>
              <div className="ent-card-subtitle">Urgent tasks and upcoming departmental milestones</div>
            </div>
            {hasActiveQuery && <span className="badge badge-amber">1 URGENT</span>}
          </div>

          <div className="ent-priorities-list">
            {/* Priority 1: Query Response */}
            <Link
              to={queries.length > 0 ? `/query/${queries[0].id}` : '/dashboard'}
              className={`ent-priority-item ${hasActiveQuery ? 'action-req' : ''}`}
            >
              <div className="ent-priority-left">
                <div className={`ent-priority-icon ${hasActiveQuery ? 'orange' : 'blue'}`}>
                  <Zap size={16} />
                </div>
                <div className="ent-priority-info">
                  <div className="ent-priority-title">Respond to Process Flow query — FSSAI</div>
                  <div className="ent-priority-meta">
                    {hasActiveQuery ? 'Action required • FSSAI Scrutiny Desk' : 'Query resolved and closed'}
                  </div>
                </div>
              </div>
              <div className="ent-priority-right">
                <span className={`badge ${hasActiveQuery ? 'badge-amber' : 'badge-green'}`} style={{ fontSize: '10px' }}>
                  {hasActiveQuery ? 'ACTION REQUIRED' : 'RESOLVED'}
                </span>
                <ChevronRight size={15} className="ent-priority-chevron" />
              </div>
            </Link>

            {/* Priority 2: Inspection Scheduled */}
            <Link
              to={`/application/${application.id}`}
              className="ent-priority-item"
            >
              <div className="ent-priority-left">
                <div className="ent-priority-icon green">
                  <Calendar size={16} />
                </div>
                <div className="ent-priority-info">
                  <div className="ent-priority-title">
                    Inspection scheduled — {inspection?.scheduledDate || '06-Sep-2026'} · {inspection?.scheduledTime || '11:00 AM'}
                  </div>
                  <div className="ent-priority-meta">
                    Physical site verification • {inspection?.officerName || 'S. K. Kulkarni'} (MIDC Chakan)
                  </div>
                </div>
              </div>
              <div className="ent-priority-right">
                <span className={`badge ${isApproved ? 'badge-green' : 'badge-blue'}`} style={{ fontSize: '10px' }}>
                  {isApproved ? 'PASSED' : 'SCHEDULED'}
                </span>
                <ChevronRight size={15} className="ent-priority-chevron" />
              </div>
            </Link>

            {/* Priority 3: FSSAI Application */}
            <Link
              to={`/application/${application.id}`}
              className="ent-priority-item"
            >
              <div className="ent-priority-left">
                <div className="ent-priority-icon blue">
                  <FileText size={16} />
                </div>
                <div className="ent-priority-info">
                  <div className="ent-priority-title">FSSAI application — Under departmental review</div>
                  <div className="ent-priority-meta">
                    Application ID: {application.appNumber} • SLA: 30 days
                  </div>
                </div>
              </div>
              <div className="ent-priority-right">
                <StatusBadge status={application.status} />
                <ChevronRight size={15} className="ent-priority-chevron" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right: Approval Insights (Radial Progress Ring) */}
        <div className="ent-card">
          <div className="ent-card-header">
            <div>
              <div className="ent-card-title">Approval Insights</div>
              <div className="ent-card-subtitle">Personalized pathway completion status</div>
            </div>
            <Link to="/roadmap" className="btn btn-secondary btn-sm" style={{ fontSize: '11px' }}>
              View DAG
            </Link>
          </div>

          <div className="ent-insights-body">
            {/* Donut Chart */}
            <div className="ent-donut-wrapper">
              <svg className="ent-donut-svg" viewBox="0 0 120 120">
                <circle
                  className="ent-donut-bg"
                  cx="60"
                  cy="60"
                  r="45"
                />
                <circle
                  className="ent-donut-fill"
                  cx="60"
                  cy="60"
                  r="45"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="ent-donut-center">
                <span className="ent-donut-percent">{progressPercent}%</span>
                <span className="ent-donut-label">Overall Progress</span>
              </div>
            </div>

            {/* Legend */}
            <div className="ent-legend-list">
              <div className="ent-legend-item">
                <span><span className="ent-legend-dot green" />Completed</span>
                <span className="ent-legend-count">{completedCount}</span>
              </div>
              <div className="ent-legend-item">
                <span><span className="ent-legend-dot blue" />In-Progress</span>
                <span className="ent-legend-count">{inProgressCount}</span>
              </div>
              <div className="ent-legend-item">
                <span><span className="ent-legend-dot amber" />Action Required</span>
                <span className="ent-legend-count">{actionRequiredCount}</span>
              </div>
              <div className="ent-legend-item">
                <span><span className="ent-legend-dot gray" />Pending</span>
                <span className="ent-legend-count">{pendingCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Main Workspace Grid: Primary Application Dossier + Roadmap Fast-Track ── */}
      <div className="ent-two-col-grid">
        {/* Active Application Dossier Card */}
        <div className="ent-card">
          <div className="ent-card-header">
            <div>
              <div className="ent-card-title">Primary Regulatory Application</div>
              <div className="ent-card-subtitle">{application.approvalName}</div>
            </div>
            <StatusBadge status={application.status} />
          </div>

          <div className="ent-dossier-rows">
            <div className="ent-dossier-row">
              <span className="ent-dossier-key">Application ID:</span>
              <span className="ent-dossier-val">{application.appNumber}</span>
            </div>

            <div className="ent-dossier-row">
              <span className="ent-dossier-key">Department:</span>
              <span className="ent-dossier-val">{application.department}</span>
            </div>

            <div className="ent-dossier-row">
              <span className="ent-dossier-key">Authority:</span>
              <span className="ent-dossier-val">{application.authorityName}</span>
            </div>

            <div className="ent-dossier-row">
              <span className="ent-dossier-key">SLA Target Timeline:</span>
              <span className="ent-dossier-val green">30 Days (Cleared within SLA)</span>
            </div>

            {isApproved && (
              <div className="ent-dossier-row">
                <span className="ent-dossier-key">Clearance Reference:</span>
                <span className="ent-dossier-val green">
                  {application.decisionReason || 'APR-MH-2026-00124'}
                </span>
              </div>
            )}

            {inspection && (
              <div className="ent-inspection-mini-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: '#0f172a', fontSize: '12px' }}>Site Verification Outcome:</span>
                  <span className={`badge ${inspection.outcome === 'SATISFACTORY' ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '10px' }}>
                    {inspection.outcome}
                  </span>
                </div>
                <div style={{ color: '#475569', fontSize: '12px' }}>
                  Conducted by {inspection.officerName} at {inspection.location} on {inspection.scheduledDate}.
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Stage 1 Clearances: 100% Completed</span>
            <Link to={`/application/${application.id}`} className="btn btn-outline-primary btn-sm">
              Open Application Dossier <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Roadmap Progress Preview */}
        <div className="ent-card">
          <div className="ent-card-header">
            <div>
              <div className="ent-card-title">Personalized Approval Roadmap</div>
              <div className="ent-card-subtitle">Cold Storage (5,000 MT) • 9 Configured Clearances</div>
            </div>
            <Link to="/roadmap" className="btn btn-secondary btn-sm" style={{ fontSize: '11px' }}>
              View All 9
            </Link>
          </div>

          <div className="ent-roadmap-mini-list">
            {/* 1. MIDC Planning */}
            <div className="ent-roadmap-mini-item done">
              <div className="ent-roadmap-mini-left">
                <CheckCircle2 size={16} color="#15803d" />
                <span style={{ fontWeight: '600', color: '#14532d' }}>1. MIDC Building Plan Sanction</span>
              </div>
              <span className="badge badge-green" style={{ fontSize: '10px' }}>PRE-REQUISITE</span>
            </div>

            {/* 2. FSSAI */}
            <div className={`ent-roadmap-mini-item ${isApproved ? 'done' : 'active'}`}>
              <div className="ent-roadmap-mini-left">
                {isApproved ? <CheckCircle2 size={16} color="#15803d" /> : <Clock size={16} color="#1d4ed8" />}
                <span style={{ fontWeight: '600', color: isApproved ? '#14532d' : '#1d4ed8' }}>
                  2. FSSAI Central Licence ({isApproved ? 'Approved' : 'In Review'})
                </span>
              </div>
              <StatusBadge status={application.status} />
            </div>

            {/* 3. MPCB */}
            <div className="ent-roadmap-mini-item">
              <div className="ent-roadmap-mini-left">
                <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #94a3b8', display: 'inline-block' }} />
                <span style={{ color: '#475569' }}>3. MPCB Consent to Establish (Orange)</span>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '10px' }}>NEXT UP</span>
            </div>

            {/* 4. MSEDCL Power */}
            <div className="ent-roadmap-mini-item">
              <div className="ent-roadmap-mini-left">
                <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #94a3b8', display: 'inline-block' }} />
                <span style={{ color: '#475569' }}>4. MSEDCL Industrial HT Power (750 kW)</span>
              </div>
              <span className="badge badge-neutral" style={{ fontSize: '10px' }}>STAGE 2</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>2 of 9 Regulatory Milestones Cleared</span>
            <Link to="/roadmap" className="btn btn-primary btn-sm">
              Explore Full Pathway <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 5. Compliance, Renewal & Incentives Row ── */}
      <div className="ent-two-col-grid">
        {/* Compliance & Renewal Obligations Card */}
        <div className="ent-card">
          <div className="ent-card-header">
            <div>
              <div className="ent-card-title">Compliance & Renewal Tracking</div>
              <div className="ent-card-subtitle">Active statutory obligations & periodic filings</div>
            </div>
            <span className="badge badge-green">COMPLIANT</span>
          </div>

          <div className="ent-sub-cards-list">
            <div className="ent-sub-card-item">
              <div className="ent-sub-card-top">
                <div>
                  <div className="ent-sub-card-title">FSSAI Central Licence Validity</div>
                  <div className="ent-sub-card-desc">
                    Reference: APR-MH-2026-00124 • 1-Year Initial Term
                  </div>
                </div>
                <span className="badge badge-green" style={{ fontSize: '10px' }}>ACTIVE</span>
              </div>
              <div className="ent-sub-card-meta">
                <span>Valid Until: <strong>31 Aug 2027</strong></span>
                <span>•</span>
                <span>Renewal Window: <strong>60 Days Prior</strong></span>
              </div>
            </div>

            <div className="ent-sub-card-item">
              <div className="ent-sub-card-top">
                <div>
                  <div className="ent-sub-card-title">Annual Food Safety Return (Form D-1)</div>
                  <div className="ent-sub-card-desc">
                    Mandatory annual submission of food storage throughput
                  </div>
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>SCHEDULED</span>
              </div>
              <div className="ent-sub-card-meta">
                <span>Filing Deadline: <strong>31 May 2027</strong></span>
                <span>•</span>
                <span>Status: <strong>Not Due Yet</strong></span>
              </div>
            </div>

            <div className="ent-sub-card-item">
              <div className="ent-sub-card-top">
                <div>
                  <div className="ent-sub-card-title">Refrigeration Safety & Calibration Audit</div>
                  <div className="ent-sub-card-desc">
                    Ammonia sensor calibration & cold chain temperature logs
                  </div>
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>SEMI-ANNUAL</span>
              </div>
              <div className="ent-sub-card-meta">
                <span>Audit Target: <strong>28 Feb 2027</strong></span>
                <span>•</span>
                <span>Status: <strong>Pre-Commissioning</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Incentives Preview Card */}
        <div className="ent-card">
          <div className="ent-card-header">
            <div>
              <div className="ent-card-title">Government Incentives & Subsidies</div>
              <div className="ent-card-subtitle">Potentially relevant schemes matching your profile</div>
            </div>
            <Link to="/incentives" className="btn btn-secondary btn-sm" style={{ fontSize: '11px' }}>
              View All 4
            </Link>
          </div>

          <div className="ent-sub-cards-list">
            <div className="ent-sub-card-item highlight">
              <div className="ent-sub-card-top">
                <div className="ent-sub-card-title" style={{ color: '#1e3a8a' }}>
                  Maharashtra Package Scheme of Incentives (PSI) 2019
                </div>
                <span className="badge badge-blue" style={{ fontSize: '10px' }}>CAPITAL SUBSIDY</span>
              </div>
              <div className="ent-sub-card-desc" style={{ color: '#1d4ed8' }}>
                Industrial Promotion Subsidy (IPS) for Cold Logistics in Pune industrial zone.
              </div>
            </div>

            <div className="ent-sub-card-item">
              <div className="ent-sub-card-top">
                <div className="ent-sub-card-title">
                  PMKSY — Integrated Cold Chain Infrastructure Support
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>CENTRAL SCHEME</span>
              </div>
              <div className="ent-sub-card-desc">
                Ministry of Food Processing grant-in-aid for modern cold chain facilities.
              </div>
            </div>

            <div className="ent-sub-card-item">
              <div className="ent-sub-card-top">
                <div className="ent-sub-card-title">
                  MSEDCL Industrial Electricity Duty Exemption
                </div>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>TARIFF SUPPORT</span>
              </div>
              <div className="ent-sub-card-desc">
                100% Electricity Duty exemption on HT industrial power for 7 years.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>4 schemes matching ₹15 Cr / MIDC Chakan</span>
            <Link to="/incentives" className="btn btn-primary btn-sm">
              Explore Scheme Details <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 6. Audit Trail & Recent Notifications ── */}
      <div className="ent-card">
        <div className="ent-card-header">
          <div>
            <div className="ent-card-title">Recent Lifecycle Activity & Notifications</div>
            <div className="ent-card-subtitle">Complete chronological record of statutory submissions and decisions</div>
          </div>
          <span className="badge badge-neutral">{events.length} EVENTS RECORDED</span>
        </div>

        <div className="ent-audit-feed">
          {events.slice(0, 4).map((evt) => (
            <div key={evt.id} className="ent-audit-item">
              <div className={`ent-actor-badge ${evt.actorRole === 'ENTREPRENEUR' ? 'entrepreneur' : 'officer'}`}>
                {evt.actorRole === 'ENTREPRENEUR' ? 'EM' : 'IO'}
              </div>
              <div className="ent-audit-content">
                <div className="ent-audit-top">
                  <span className="ent-audit-title">{evt.title}</span>
                  <span className="ent-audit-date">
                    {evt.createdAt ? evt.createdAt.slice(0, 10) : ''}
                  </span>
                </div>
                {evt.description && (
                  <p className="ent-audit-desc">
                    {evt.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
