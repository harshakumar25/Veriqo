import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Application } from '@/lib/types';

export interface ApplicationStatusBannerProps {
  application: Application;
}

export const ApplicationStatusBanner: React.FC<ApplicationStatusBannerProps> = ({ application }) => {
  const isApproved = application.status === 'APPROVED';
  const isInspection = application.status === 'INSPECTION_SCHEDULED';

  return (
    <div
      style={{
        marginBottom: '24px',
        padding: '20px',
        background: isApproved ? '#f0fdf4' : '#eff6ff',
        border: `1px solid ${isApproved ? '#bbf7d0' : '#bfdbfe'}`,
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: isApproved ? '#15803d' : '#1d4ed8',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <CheckCircle2 size={24} />
        </div>
        <div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: isApproved ? '#14532d' : '#1e3a8a',
            }}
          >
            {isApproved
              ? 'APPLICATION APPROVED — CLEARANCE GRANTED'
              : isInspection
              ? 'SITE INSPECTION SCHEDULED'
              : 'APPLICATION SUBMITTED TO SCRUTINY CELL'}
          </div>
          <div
            style={{
              fontSize: '13px',
              color: isApproved ? '#166534' : '#1d4ed8',
              marginTop: '2px',
            }}
          >
            {isApproved
              ? 'Clearance Reference: APR-MH-2026-00124 • Approved by FSSAI Designated Officer.'
              : isInspection
              ? 'Inspection scheduled for 05 Sep 2026 at 11:00 AM on-site at MIDC Chakan.'
              : `Dossier ${application.appNumber} has been transmitted to FSSAI Scrutiny Cell (Pune Division).`}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/roadmap" className="btn btn-primary">
          View Updated Roadmap <ArrowRight size={14} />
        </Link>
        <Link to="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
