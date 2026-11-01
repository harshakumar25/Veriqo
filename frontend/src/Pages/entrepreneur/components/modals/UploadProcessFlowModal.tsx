import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Upload, FileText } from 'lucide-react';

export interface UploadProcessFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: () => void;
}

export const UploadProcessFlowModal: React.FC<UploadProcessFlowModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Process Flow Diagram"
      subtitle="Attach the verified multi-chamber cold storage engineering schematic to resolve the pre-validation blocker."
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" form="upload-process-flow-form" className="btn btn-primary">
            <Upload size={14} /> Upload &amp; Verify Document
          </button>
        </>
      }
    >
      <form id="upload-process-flow-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Document Name *</label>
          <input
            type="text"
            className="form-input"
            value="Cold Chain Process Flow Diagram"
            disabled
          />
        </div>

        <div className="form-group">
          <label className="form-label">Select PDF Artifact *</label>
          <div
            style={{
              padding: '24px',
              border: '2px dashed #cbd5e1',
              borderRadius: '6px',
              textAlign: 'center',
              background: '#f8fafc',
            }}
          >
            <FileText size={32} color="#1d4ed8" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
              FreshChain_Process_Flow_v1.pdf
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Ready for upload (1.80 MB • MIME: application/pdf)
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
