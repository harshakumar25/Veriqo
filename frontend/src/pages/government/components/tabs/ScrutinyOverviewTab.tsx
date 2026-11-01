import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { Application, InspectionRecord } from '@/lib/types';
import { StatusBadge } from '@/components/ui/StatusBadge';

export interface ScrutinyOverviewTabProps {
  application: Application;
  inspection: InspectionRecord | null;
}

export const ScrutinyOverviewTab: React.FC<ScrutinyOverviewTabProps> = ({
  application,
  inspection,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* KPI Summary Cards */}
      <div className="grid-3">
        <div className="card">
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
            Application Number
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#1d4ed8', marginTop: '4px' }}>
            {application.appNumber}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            FSSAI Central Licensing Portal
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
            Inspection Status
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: inspection?.outcome === 'SATISFACTORY' ? '#15803d' : '#0f172a',
              marginTop: '4px',
            }}
          >
            {inspection ? `${inspection.status} (${inspection.outcome})` : 'Not Scheduled'}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            {inspection ? `Date: ${inspection.scheduledDate} at ${inspection.scheduledTime}` : 'Pending scheduling'}
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
            Final Decision Status
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: application.status === 'APPROVED' ? '#15803d' : '#0f172a',
              marginTop: '4px',
            }}
          >
            {application.status}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            {application.status === 'APPROVED' ? 'Clearance Ref: APR-MH-2026-00124' : 'In Scrutiny Workflow'}
          </div>
        </div>
      </div>

      {/* Stage Progress Checklist */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Scrutiny Stage Progress</div>
            <div className="card-subtitle">Official checklist for single-window clearance</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f8fafc', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#15803d" />
              <span style={{ fontWeight: '600' }}>1. Pre-Submission Quality Gate &amp; Verification</span>
            </div>
            <StatusBadge status="PASSED" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f8fafc', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#15803d" />
              <span style={{ fontWeight: '600' }}>2. Officer Scrutiny &amp; Document Verification</span>
            </div>
            <StatusBadge status="VERIFIED" />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              background: inspection?.status === 'COMPLETED' ? '#f0fdf4' : '#eff6ff',
              borderRadius: '6px',
              border: `1px solid ${inspection?.status === 'COMPLETED' ? '#bbf7d0' : '#bfdbfe'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {inspection?.status === 'COMPLETED' ? (
                <CheckCircle2 size={16} color="#15803d" />
              ) : (
                <Clock size={16} color="#1d4ed8" />
              )}
              <span
                style={{
                  fontWeight: '600',
                  color: inspection?.status === 'COMPLETED' ? '#15803d' : '#1d4ed8',
                }}
              >
                3. Site Verification &amp; Inspection
              </span>
            </div>
            <StatusBadge status={inspection ? inspection.status : 'PENDING'} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              background: application.status === 'APPROVED' ? '#f0fdf4' : '#f8fafc',
              borderRadius: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {application.status === 'APPROVED' ? (
                <CheckCircle2 size={16} color="#15803d" />
              ) : (
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '2px solid #94a3b8',
                    display: 'inline-block',
                  }}
                />
              )}
              <span
                style={{
                  fontWeight: application.status === 'APPROVED' ? '600' : 'normal',
                  color: application.status === 'APPROVED' ? '#15803d' : '#64748b',
                }}
              >
                4. Final Decision &amp; Grant of Clearance
              </span>
            </div>
            <StatusBadge status={application.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

