import React, { useState } from 'react';
import { useAppStore } from '@/lib/use-app-store';
import { ApplicationDetailHeader } from './components/ApplicationDetailHeader';
import { FinalApprovalBanner } from './components/FinalApprovalBanner';
import { ScrutinyOverviewTab } from './components/tabs/ScrutinyOverviewTab';
import { ApplicationParametersTab } from './components/tabs/ApplicationParametersTab';
import { DocumentVerificationTab } from './components/tabs/DocumentVerificationTab';
import { QueryManagerTab } from './components/tabs/QueryManagerTab';
import { InspectionDeskTab } from './components/tabs/InspectionDeskTab';
import { FinalDecisionTab } from './components/tabs/FinalDecisionTab';
import { AuditTimelineTab } from './components/tabs/AuditTimelineTab';

import { RaiseQueryModal } from './components/modals/RaiseQueryModal';
import { ScheduleInspectionModal } from './components/modals/ScheduleInspectionModal';
import { ApproveApplicationModal } from './components/modals/ApproveApplicationModal';
import { RejectApplicationModal } from './components/modals/RejectApplicationModal';

export type DetailTabKey =
  | 'OVERVIEW'
  | 'FORM_DATA'
  | 'DOCUMENTS'
  | 'QUERIES'
  | 'INSPECTION'
  | 'DECISION'
  | 'TIMELINE';

export default function GovernmentApplicationReviewPage() {
  const {
    application,
    business,
    documents,
    updateDocumentStatus,
    queries,
    addQuery,
    resolveQuery,
    inspection,
    scheduleInspection,
    startInspection,
    completeInspection,
    approveApplication,
    rejectApplication,
    events,
    currentPersona,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<DetailTabKey>('OVERVIEW');

  // Modal Dialog Visibility
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const isDecisionMade = application.status === 'APPROVED' || application.status === 'REJECTED';

  const handleRaiseQuerySubmit = (title: string, text: string) => {
    addQuery(title, text);
    setActiveTab('QUERIES');
  };

  const handleScheduleSubmit = (date: string, time: string, location: string) => {
    scheduleInspection(date, time, location);
    setActiveTab('INSPECTION');
  };

  const handleConfirmApprove = () => {
    approveApplication('APR-MH-2026-00124');
  };

  const handleConfirmReject = (reason: string) => {
    rejectApplication(reason);
  };

  return (
    <div className="page-body">
      {/* ── Top Header ── */}
      <ApplicationDetailHeader
        application={application}
        business={business}
        currentPersona={currentPersona}
        inspection={inspection}
        isDecisionMade={isDecisionMade}
        onOpenQueryModal={() => setShowQueryModal(true)}
        onOpenScheduleModal={() => setShowScheduleModal(true)}
        onViewInspection={() => setActiveTab('INSPECTION')}
      />

      {/* ── Approved Spotlight Banner ── */}
      {application.status === 'APPROVED' && (
        <FinalApprovalBanner
          clearanceReference="APR-MH-2026-00124"
          officerName={currentPersona.name}
        />
      )}

      {/* ── Navigation Tab Bar ── */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '12px',
          overflowX: 'auto',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('OVERVIEW')}
          className={`btn btn-sm ${activeTab === 'OVERVIEW' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Scrutiny Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('FORM_DATA')}
          className={`btn btn-sm ${activeTab === 'FORM_DATA' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Application Parameters
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('DOCUMENTS')}
          className={`btn btn-sm ${activeTab === 'DOCUMENTS' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Documents ({documents.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('QUERIES')}
          className={`btn btn-sm ${activeTab === 'QUERIES' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Query Desk ({queries.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('INSPECTION')}
          className={`btn btn-sm ${activeTab === 'INSPECTION' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Inspection Desk {inspection ? `(${inspection.status})` : ''}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('DECISION')}
          className={`btn btn-sm ${activeTab === 'DECISION' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Final Review &amp; Decision
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('TIMELINE')}
          className={`btn btn-sm ${activeTab === 'TIMELINE' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Audit Timeline ({events.length})
        </button>
      </div>

      {/* ── Active Tab Content ── */}
      {activeTab === 'OVERVIEW' && (
        <ScrutinyOverviewTab application={application} inspection={inspection} />
      )}

      {activeTab === 'FORM_DATA' && <ApplicationParametersTab business={business} />}

      {activeTab === 'DOCUMENTS' && (
        <DocumentVerificationTab
          documents={documents}
          onVerifyDocument={(docId) => updateDocumentStatus(docId, 'VERIFIED')}
        />
      )}

      {activeTab === 'QUERIES' && (
        <QueryManagerTab
          queries={queries}
          isDecisionMade={isDecisionMade}
          onOpenQueryModal={() => setShowQueryModal(true)}
          onResolveQuery={resolveQuery}
        />
      )}

      {activeTab === 'INSPECTION' && (
        <InspectionDeskTab
          inspection={inspection}
          onOpenScheduleModal={() => setShowScheduleModal(true)}
          onStartInspection={startInspection}
          onCompleteInspection={completeInspection}
          onProceedToDecision={() => setActiveTab('DECISION')}
        />
      )}

      {activeTab === 'DECISION' && (
        <FinalDecisionTab
          application={application}
          documents={documents}
          queries={queries}
          inspection={inspection}
          isDecisionMade={isDecisionMade}
          onOpenApproveModal={() => setShowApproveModal(true)}
          onOpenRejectModal={() => setShowRejectModal(true)}
        />
      )}

      {activeTab === 'TIMELINE' && <AuditTimelineTab events={events} />}

      {/* ── Modal Dialogs ── */}
      <RaiseQueryModal
        isOpen={showQueryModal}
        onClose={() => setShowQueryModal(false)}
        onSubmit={handleRaiseQuerySubmit}
      />

      <ScheduleInspectionModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSubmit={handleScheduleSubmit}
      />

      <ApproveApplicationModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleConfirmApprove}
        appNumber={application.appNumber}
        enterpriseName={business.name}
        officerName={currentPersona.name}
      />

      <RejectApplicationModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleConfirmReject}
        appNumber={application.appNumber}
      />
    </div>
  );
}
