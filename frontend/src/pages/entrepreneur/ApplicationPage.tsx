import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/lib/use-app-store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { usePrevalidation } from '@/lib/prevalidation/use-prevalidation';
import { Save, ArrowRight, CheckCircle2, Send } from 'lucide-react';

import { ApplicationStatusBanner } from './components/ApplicationStatusBanner';
import { EnterpriseIdentitySection } from './components/EnterpriseIdentitySection';
import { SiteLocationSection } from './components/SiteLocationSection';
import { TechnicalParametersSection } from './components/TechnicalParametersSection';
import { VaultAttachmentsSection, RequiredDocSpec } from './components/VaultAttachmentsSection';
import { StatutoryDeclarationSection } from './components/StatutoryDeclarationSection';
import { PrevalidationDiagnosticsSection } from './components/PrevalidationDiagnosticsSection';

import { UploadProcessFlowModal } from './components/modals/UploadProcessFlowModal';
import { ConfirmSubmitModal } from './components/modals/ConfirmSubmitModal';

const REQUIRED_DOC_CODES: RequiredDocSpec[] = [
  { code: 'PAN_CARD', name: 'PAN Card of Business Entity' },
  { code: 'PROCESS_FLOW', name: 'Cold Chain Process Flow Diagram' },
  { code: 'LAYOUT_PLAN', name: 'Cold Storage Architectural & Layout Plan' },
  { code: 'FSMS_PLAN', name: 'Food Safety Management System (FSMS) Plan' },
];

export default function ApplicationBuilderPage() {
  const {
    business,
    documents,
    addDocument,
    application,
    updateApplicationStatus,
    updateApplicationFormData,
    submitApplication,
  } = useAppStore();

  const [formData, setFormData] = useState<Record<string, any>>(application.formData);
  const [declarationAccepted, setDeclarationAccepted] = useState(true);
  const [isPreValidating, setIsPreValidating] = useState(false);
  const [validationRun, setValidationRun] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Deep pre-validation engine (deterministic, DAG-aware)
  const { result, canSubmit } = usePrevalidation({ declarationAccepted, formData });

  const isSubmitted = application.status !== 'DRAFT';

  const handleFieldChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updateApplicationFormData(updated);
  };

  const handleSaveDraft = () => {
    updateApplicationFormData(formData);
    updateApplicationStatus('DRAFT');
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const runPreValidation = () => {
    setIsPreValidating(true);
    setTimeout(() => {
      setIsPreValidating(false);
      setValidationRun(true);
    }, 400);
  };

  const handleUploadProcessFlow = () => {
    addDocument({
      businessId: business.id,
      docCode: 'PROCESS_FLOW',
      docName: 'Cold Chain Process Flow Diagram',
      category: 'TECHNICAL',
      fileName: 'FreshChain_Process_Flow_v1.pdf',
      fileSizeKb: 1840,
      verificationStatus: 'VERIFIED',
    });
    setValidationRun(true);
  };

  const handleConfirmSubmit = () => {
    submitApplication();
  };

  return (
    <div className="page-body">
      {/* ── Top Header ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-blue">APPLICATION BUILDER</span>
            <span className="badge badge-neutral">{application.appNumber}</span>
            <StatusBadge status={application.status} showDot />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>
            {application.approvalName}
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
            Issuing Authority: <strong>{application.authorityName}</strong> • {application.department}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {!isSubmitted && (
            <button type="button" onClick={handleSaveDraft} className="btn btn-secondary">
              <Save size={14} /> Save Draft
            </button>
          )}
          <Link to="/roadmap" className="btn btn-outline-primary">
            View Roadmap <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── Toast Alert ── */}
      {saveToast && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '20px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '6px',
            color: '#15803d',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={16} />
          <span>Application draft progress saved successfully. Status: DRAFT.</span>
        </div>
      )}

      {/* ── Status Banner (When submitted/approved) ── */}
      {isSubmitted && <ApplicationStatusBanner application={application} />}

      {/* ── Main Form Sections ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <EnterpriseIdentitySection business={business} />

        <SiteLocationSection
          business={business}
          premisesType={formData.premisesType || 'Owned (MIDC Industrial Leasehold)'}
          isSubmitted={isSubmitted}
          onPremisesTypeChange={(val) => handleFieldChange('premisesType', val)}
        />

        <TechnicalParametersSection
          business={business}
          standbyGensetKva={formData.standbyGensetKva || '500 kVA'}
          operationalShift={formData.operationalShift || '24 Hours / 3 Shifts'}
          ammoniaSafetyAudit={formData.ammoniaSafetyAudit || 'Certified / Pressure Relief Compliant'}
          isSubmitted={isSubmitted}
          onFieldChange={handleFieldChange}
        />

        <VaultAttachmentsSection
          requiredDocCodes={REQUIRED_DOC_CODES}
          documents={documents}
          onOpenUploadModal={() => setShowUploadModal(true)}
        />

        <StatutoryDeclarationSection
          businessName={business.name}
          plotNumber={business.plotNumber}
          isAccepted={declarationAccepted}
          isSubmitted={isSubmitted}
          onAcceptedChange={setDeclarationAccepted}
        />

        <PrevalidationDiagnosticsSection
          result={result}
          isPreValidating={isPreValidating}
          isSubmitted={isSubmitted}
          validationRun={validationRun}
          onRunPreValidation={runPreValidation}
        />

        {/* ── Form Actions / Submission Bar ── */}
        {!isSubmitted && (
          <div
            style={{
              padding: '20px',
              background: canSubmit ? '#f0fdf4' : '#f8fafc',
              border: `1px solid ${canSubmit ? '#bbf7d0' : '#e2e8f0'}`,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: canSubmit ? '#15803d' : '#0f172a',
                }}
              >
                {canSubmit
                  ? 'All Pre-Validation Checks Cleared'
                  : 'Pre-Validation Requirements Incomplete'}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: canSubmit ? '#166534' : '#64748b',
                  marginTop: '2px',
                }}
              >
                {canSubmit
                  ? 'Ready for digital transmission to FSSAI Central Licensing Scrutiny Desk.'
                  : 'Resolve blocking issues above before submitting to the Government Scrutiny Desk.'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="btn btn-secondary"
              >
                <Save size={14} /> Save Draft
              </button>
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                disabled={!canSubmit}
                className="btn btn-primary"
                style={{
                  padding: '10px 24px',
                  opacity: canSubmit ? 1 : 0.4,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                }}
              >
                <Send size={14} /> Submit Application
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Dialog Modals ── */}
      <UploadProcessFlowModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUploadProcessFlow}
      />

      <ConfirmSubmitModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleConfirmSubmit}
        appNumber={application.appNumber}
      />
    </div>
  );
}
