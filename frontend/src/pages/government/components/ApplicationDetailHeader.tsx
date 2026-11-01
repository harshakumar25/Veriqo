import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, HelpCircle, Calendar, Inbox } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Application, BusinessProfile, InspectionRecord, Persona } from '@/lib/types';
import { formatDateTime } from '@/lib/formatters';

export interface ApplicationDetailHeaderProps {
  application: Application;
  business: BusinessProfile;
  currentPersona: Persona;
  inspection: InspectionRecord | null;
  isDecisionMade: boolean;
  onOpenQueryModal: () => void;
  onOpenScheduleModal: () => void;
  onViewInspection: () => void;
}

export const ApplicationDetailHeader: React.FC<ApplicationDetailHeaderProps> = ({
  application,
  business,
  currentPersona,
  inspection,
  isDecisionMade,
  onOpenQueryModal,
  onOpenScheduleModal,
  onViewInspection,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-amber">DEMO WORKFLOW</span>
          <span className="badge badge-green">SCRUTINY DOSSIER</span>
          <span className="badge badge-neutral">{application.appNumber}</span>
          <StatusBadge status={application.status} showDot />
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a' }}>
          {business.name} — {application.approvalName}
        </h1>
        <div
          style={{
            fontSize: '13px',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '2px',
            flexWrap: 'wrap',
          }}
        >
          <span>
            Scrutiny Officer: <strong>{currentPersona.name}</strong>
          </span>
          <span>•</span>
          <span>
            <MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px' }} />{' '}
            {business.district}, {business.state} ({business.locationType} Chakan Phase II)
          </span>
          <span>•</span>
          <span>Submitted: {formatDateTime(application.submittedAt || '2026-08-28T09:00:00Z')}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        {!isDecisionMade && (
          <>
            <button
              type="button"
              onClick={onOpenQueryModal}
              className="btn btn-secondary btn-sm"
            >
              <HelpCircle size={14} /> Raise Query
            </button>
            {inspection?.status !== 'COMPLETED' && (
              <button
                type="button"
                onClick={inspection ? onViewInspection : onOpenScheduleModal}
                className="btn btn-primary btn-sm"
              >
                <Calendar size={14} /> {inspection ? 'View Inspection' : 'Schedule Inspection'}
              </button>
            )}
          </>
        )}
        <Link to="/government/applications" className="btn btn-secondary btn-sm">
          <Inbox size={14} /> Queue
        </Link>
      </div>
    </div>
  );
};

