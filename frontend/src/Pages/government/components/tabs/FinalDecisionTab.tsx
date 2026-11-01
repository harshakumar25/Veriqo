import React from 'react';
import { Award, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { Application, InspectionRecord, QueryRecord, VaultDocument } from '@/lib/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { evaluateReviewGates } from '@/lib/services/review-gates.service';
import { formatDateTime } from '@/lib/formatters';

export interface FinalDecisionTabProps {
  application: Application;
  documents: VaultDocument[];
  queries: QueryRecord[];
  inspection: InspectionRecord | null;
  isDecisionMade: boolean;
  onOpenApproveModal: () => void;
  onOpenRejectModal: () => void;
}

export const FinalDecisionTab: React.FC<FinalDecisionTabProps> = ({
  application,
  documents,
  queries,
  inspection,
  isDecisionMade,
  onOpenApproveModal,
  onOpenRejectModal,
}) => {
  const { gates, allPassed } = evaluateReviewGates({
    application,
    documents,
    queries,
    inspection,
  });

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="#1d4ed8" /> Final Scrutiny Review &amp; Decision Gate
          </div>
          <div className="card-subtitle">
            Verify all upstream clearances before granting statutory approval
          </div>
        </div>
        <StatusBadge status={application.status} showDot />
      </div>

      {/* Verification Checklist Gate */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {gates.map((gate) => (
          <div
            key={gate.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              borderRadius: '6px',
              background: gate.passed ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${gate.passed ? '#bbf7d0' : '#fecaca'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {gate.passed ? (
                <CheckCircle2 size={16} color="#15803d" />
              ) : (
                <AlertCircle size={16} color="#b91c1c" />
              )}
              <span style={{ fontSize: '13px', fontWeight: '600', color: gate.passed ? '#14532d' : '#991b1b' }}>
                {gate.label}
              </span>
            </div>
            <StatusBadge
              status={gate.passed ? 'PASSED' : 'PENDING'}
              label={gate.passed ? 'VERIFIED' : 'PENDING'}
            />
          </div>
        ))}
      </div>

      {/* Decision Status Actions */}
      {!isDecisionMade ? (
        <div
          style={{
            padding: '20px',
            background: allPassed ? '#f0fdf4' : '#fffbeb',
            borderRadius: '6px',
            border: `1px solid ${allPassed ? '#bbf7d0' : '#fde68a'}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: allPassed ? '#15803d' : '#92400e' }}>
              {allPassed ? 'READY FOR FINAL APPROVAL DECISION' : 'SCRUTINY STAGES INCOMPLETE'}
            </div>
            <div style={{ fontSize: '12px', color: allPassed ? '#166534' : '#b45309', marginTop: '2px' }}>
              {allPassed
                ? 'All 6 quality gates passed. Officer can grant official approval.'
                : 'Complete pending inspection before recording final decision.'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onOpenRejectModal}
              className="btn btn-danger btn-sm"
            >
              <XCircle size={14} /> Reject Application
            </button>
            <button
              type="button"
              onClick={onOpenApproveModal}
              disabled={!allPassed}
              className="btn btn-primary"
              style={{ padding: '10px 24px', opacity: allPassed ? 1 : 0.5 }}
            >
              <Award size={14} /> Approve Application
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: '20px',
            background: application.status === 'APPROVED' ? '#f0fdf4' : '#fef2f2',
            borderRadius: '6px',
            border: `1px solid ${application.status === 'APPROVED' ? '#bbf7d0' : '#fecaca'}`,
          }}
        >
          <div style={{ fontSize: '15px', fontWeight: '700', color: application.status === 'APPROVED' ? '#15803d' : '#b91c1c' }}>
            FINAL DECISION: {application.status}
          </div>
          <div style={{ fontSize: '13px', color: '#1e293b', marginTop: '4px' }}>
            {application.status === 'APPROVED'
              ? `Clearance Reference Number: APR-MH-2026-00124 (Decided ${formatDateTime(application.decidedAt)})`
              : `Reason for Rejection: ${application.decisionReason}`}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
            Decision recorded in audit trail. Immutability locked.
          </div>
        </div>
      )}
    </div>
  );
};
