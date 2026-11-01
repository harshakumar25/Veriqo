import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { XCircle, AlertTriangle } from 'lucide-react';

export interface RejectApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  appNumber: string;
}

export const RejectApplicationModal: React.FC<RejectApplicationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  appNumber,
}) => {
  const [reason, setReason] = useState(
    'Failure to comply with cold storage insulation specifications and unresolved process flow discrepancies.',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onConfirm(reason);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reject Statutory Application"
      subtitle={`Application ${appNumber}`}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" form="reject-application-form" className="btn btn-danger">
            <XCircle size={14} /> Confirm Rejection
          </button>
        </>
      }
    >
      <form id="reject-application-form" onSubmit={handleSubmit}>
        <div
          style={{
            padding: '12px 14px',
            background: '#fef2f2',
            borderRadius: '6px',
            border: '1px solid #fecaca',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#991b1b',
            fontSize: '12.5px',
          }}
        >
          <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          <span>
            Rejection is an immutable statutory decision. A formal notice with grounds will be delivered
            to the applicant.
          </span>
        </div>

        <div className="form-group">
          <label className="form-label">Statutory Reason for Rejection *</label>
          <textarea
            className="form-textarea"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
      </form>
    </Modal>
  );
};
