import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Award, ShieldCheck } from 'lucide-react';

export interface ApproveApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  appNumber: string;
  enterpriseName: string;
  officerName: string;
}

export const ApproveApplicationModal: React.FC<ApproveApplicationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  appNumber,
  enterpriseName,
  officerName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Grant Statutory Approval"
      subtitle={`Application ${appNumber} • ${enterpriseName}`}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn btn-primary"
            style={{ background: '#15803d', borderColor: '#15803d' }}
          >
            <Award size={14} /> Confirm &amp; Grant Approval
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div
          style={{
            padding: '14px',
            background: '#f0fdf4',
            borderRadius: '6px',
            border: '1px solid #bbf7d0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <ShieldCheck size={24} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#14532d' }}>
              Final Regulatory Clearance Authorization
            </div>
            <div style={{ fontSize: '12px', color: '#166534', marginTop: '4px', lineHeight: 1.5 }}>
              By confirming, you certify that all 6 statutory quality gates have passed, physical inspection
              observations are satisfactory, and the formal clearance certificate (APR-MH-2026-00124) will be
              issued to the applicant.
            </div>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: '#475569' }}>
          <strong>Signing Officer:</strong> {officerName} (Scrutiny Lead, Western Regional Office)
        </div>
      </div>
    </Modal>
  );
};
