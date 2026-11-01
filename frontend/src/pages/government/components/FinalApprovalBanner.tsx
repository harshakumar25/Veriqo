import React from 'react';
import { Award } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

export interface FinalApprovalBannerProps {
  clearanceReference: string;
  officerName: string;
}

export const FinalApprovalBanner: React.FC<FinalApprovalBannerProps> = ({
  clearanceReference,
  officerName,
}) => {
  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '18px 24px',
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
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
            background: '#15803d',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Award size={24} />
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#14532d' }}>
            APPLICATION APPROVED — FINAL DECISION RECORDED
          </div>
          <div style={{ fontSize: '13px', color: '#166534', marginTop: '2px' }}>
            Veriqo Clearance Reference: <strong>{clearanceReference}</strong> • Decided by {officerName}
          </div>
        </div>
      </div>

      <StatusBadge status="APPROVED" showDot size="md" />
    </div>
  );
};

