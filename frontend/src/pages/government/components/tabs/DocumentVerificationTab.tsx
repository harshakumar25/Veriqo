import React from 'react';
import { FileText, Check } from 'lucide-react';
import { VaultDocument } from '@/lib/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatFileSize } from '@/lib/formatters';

export interface DocumentVerificationTabProps {
  documents: VaultDocument[];
  onVerifyDocument: (docId: string) => void;
}

export const DocumentVerificationTab: React.FC<DocumentVerificationTabProps> = ({
  documents,
  onVerifyDocument,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Document Verification Desk</div>
          <div className="card-subtitle">Scrutinize uploaded drawings and statutory filings</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '10px 14px', fontWeight: '600' }}>Document Name</th>
              <th style={{ padding: '10px 14px', fontWeight: '600' }}>Category</th>
              <th style={{ padding: '10px 14px', fontWeight: '600' }}>File Attached</th>
              <th style={{ padding: '10px 14px', fontWeight: '600' }}>Scrutiny Status</th>
              <th style={{ padding: '10px 14px', fontWeight: '600' }}>Officer Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 14px', fontWeight: '600', color: '#0f172a' }}>
                  {doc.docName}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                    {doc.category}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', color: '#1d4ed8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={14} />
                    <span>{doc.fileName}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{formatFileSize(doc.fileSizeKb)}</div>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <StatusBadge status={doc.verificationStatus} showDot />
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <button
                    type="button"
                    onClick={() => onVerifyDocument(doc.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ color: '#15803d', borderColor: '#bbf7d0', fontSize: '11px' }}
                  >
                    <Check size={12} /> Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

