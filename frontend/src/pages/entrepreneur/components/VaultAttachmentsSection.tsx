import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, CheckCircle2, AlertCircle, Upload } from 'lucide-react';
import { VaultDocument } from '@/lib/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatFileSize } from '@/lib/formatters';

export interface RequiredDocSpec {
  code: string;
  name: string;
}

export interface VaultAttachmentsSectionProps {
  requiredDocCodes: RequiredDocSpec[];
  documents: VaultDocument[];
  onOpenUploadModal: () => void;
}

export const VaultAttachmentsSection: React.FC<VaultAttachmentsSectionProps> = ({
  requiredDocCodes,
  documents,
  onOpenUploadModal,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FolderOpen size={18} color="#1d4ed8" /> 4. Attached Vault Documents &amp; Drawings
          </div>
          <div className="card-subtitle">Required by FSSAI Central Licensing regulations</div>
        </div>
        <Link to="/vault" className="btn btn-secondary btn-sm">
          Manage Vault Documents
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {requiredDocCodes.map((req) => {
          const matchedDoc = documents.find((d) => d.docCode === req.code);
          const isAttached = Boolean(matchedDoc);

          return (
            <div
              key={req.code}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                borderRadius: '6px',
                background: isAttached ? '#f8fafc' : '#fef2f2',
                border: `1px solid ${isAttached ? '#e2e8f0' : '#fecaca'}`,
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {isAttached ? (
                  <CheckCircle2 size={18} color="#15803d" />
                ) : (
                  <AlertCircle size={18} color="#b91c1c" />
                )}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                    {req.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    {isAttached ? (
                      <span>
                        File: <strong>{matchedDoc?.fileName}</strong> ({formatFileSize(matchedDoc?.fileSizeKb || 0)})
                      </span>
                    ) : (
                      <span style={{ color: '#b91c1c', fontWeight: '600' }}>
                        MISSING FROM VAULT — Upload required before submission
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                {isAttached ? (
                  <StatusBadge status={matchedDoc?.verificationStatus || 'VERIFIED'} showDot />
                ) : (
                  <button
                    type="button"
                    onClick={onOpenUploadModal}
                    className="btn btn-primary btn-sm"
                  >
                    <Upload size={12} /> Upload Process Flow
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

