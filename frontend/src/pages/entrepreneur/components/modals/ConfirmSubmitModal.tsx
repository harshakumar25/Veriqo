import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Send, CheckCircle2 } from 'lucide-react';

export interface ConfirmSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  appNumber: string;
}

export const ConfirmSubmitModal: React.FC<ConfirmSubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  appNumber,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Application for Scrutiny"
      subtitle={`Application Reference: ${appNumber}`}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Back to Review
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn btn-primary"
            style={{ padding: '10px 24px' }}
          >
            <Send size={14} /> Confirm &amp; Submit Application
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
          <CheckCircle2 size={24} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#14532d' }}>
              Pre-Validation Quality Gate Cleared
            </div>
            <div style={{ fontSize: '12px', color: '#166534', marginTop: '4px', lineHeight: 1.5 }}>
              All 4 required documents, corporate identity records, and FSSAI declarations have been validated
              by the Veriqo pre-scrutiny engine with zero blocking discrepancies.
            </div>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
          Once submitted, the dossier will appear in the Pune Division Government Scrutiny Desk and official SLA
          timers will commence under the Maharashtra Citizen Charter.
        </div>
      </div>
    </Modal>
  );
};

