import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ApplicationEvent } from '@/lib/types';
import { formatDateTime } from '@/lib/formatters';

export interface AuditTimelineTabProps {
  events: ApplicationEvent[];
}

export const AuditTimelineTab: React.FC<AuditTimelineTabProps> = ({ events }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Application Audit Trail &amp; Timeline</div>
          <div className="card-subtitle">
            Immutable log of events across entrepreneur and government interactions
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '10px' }}>
        {events.map((evt) => (
          <div
            key={evt.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: evt.actorRole === 'OFFICER' ? '#eff6ff' : '#f0fdf4',
                color: evt.actorRole === 'OFFICER' ? '#1d4ed8' : '#15803d',
                border: `1px solid ${evt.actorRole === 'OFFICER' ? '#bfdbfe' : '#bbf7d0'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CheckCircle2 size={16} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                  {evt.title}
                </span>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                  {evt.actorRole}
                </span>
              </div>
              {evt.description && (
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                  {evt.description}
                </div>
              )}
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                {formatDateTime(evt.createdAt)} • {evt.actorName || 'System'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
