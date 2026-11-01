import React from 'react';
import { HelpCircle, Check, CheckCircle2, FileText } from 'lucide-react';
import { QueryRecord } from '@/lib/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDateTime } from '@/lib/formatters';

export interface QueryManagerTabProps {
  queries: QueryRecord[];
  isDecisionMade: boolean;
  onOpenQueryModal: () => void;
  onResolveQuery: (queryId: string) => void;
}

export const QueryManagerTab: React.FC<QueryManagerTabProps> = ({
  queries,
  isDecisionMade,
  onOpenQueryModal,
  onResolveQuery,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Official Clarification &amp; Query Manager</div>
          <div className="card-subtitle">Official communications raised with applicant</div>
        </div>
        {!isDecisionMade && (
          <button
            type="button"
            onClick={onOpenQueryModal}
            className="btn btn-primary btn-sm"
          >
            <HelpCircle size={14} /> Raise Query
          </button>
        )}
      </div>

      {queries.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
          No queries currently raised on this application.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {queries.map((q) => (
            <div
              key={q.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '16px',
                background: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                      {q.title}
                    </span>
                    <StatusBadge status={q.status} showDot />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    Raised by: <strong>{q.officerName}</strong> • {formatDateTime(q.createdAt)}
                  </div>
                </div>

                {q.status === 'RESPONDED' && (
                  <button
                    type="button"
                    onClick={() => onResolveQuery(q.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ color: '#15803d', borderColor: '#bbf7d0', fontSize: '11px' }}
                  >
                    <Check size={12} /> Mark Resolved
                  </button>
                )}
              </div>

              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', fontSize: '13px', color: '#334155', border: '1px solid #e2e8f0' }}>
                <strong>Officer Request:</strong> {q.queryText}
              </div>

              {q.response && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '14px',
                    background: '#f0fdf4',
                    borderRadius: '6px',
                    border: '1px solid #bbf7d0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#15803d', marginBottom: '4px' }}>
                    <CheckCircle2 size={15} />
                    <span>Applicant Response (Submitted {formatDateTime(q.response.submittedAt)})</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#1e293b', lineHeight: '1.5' }}>
                    {q.response.responseText}
                  </div>
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#1d4ed8' }}>
                    <FileText size={14} />
                    <span>Attached Revision: <strong>FreshChain_Process_Flow_v2.pdf</strong> (1.92 MB)</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

