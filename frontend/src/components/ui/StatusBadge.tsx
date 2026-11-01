import React from 'react';
import { ApplicationStatus, DocumentVerificationStatus } from '@/lib/types';

export type ExtendedStatus =
  | ApplicationStatus
  | DocumentVerificationStatus
  | 'SATISFACTORY'
  | 'UNSATISFACTORY'
  | 'FOLLOW_UP_REQUIRED'
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'RESOLVED'
  | 'RESPONDED'
  | 'OPEN'
  | 'PASSED'
  | 'FAILED'
  | 'READY_TO_APPLY'
  | 'LOCKED'
  | 'BLOCKING'
  | 'REVIEW_REQUIRED'
  | 'WARNING'
  | 'INFO'
  | string;

export interface StatusBadgeProps {
  status: ExtendedStatus;
  label?: string;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'sm',
  showDot = false,
}) => {
  const safeStatus = status ? String(status) : '';
  const displayLabel = label || safeStatus.replace(/_/g, ' ');

  let badgeClass = 'badge-neutral';
  let dotColor = '#94a3b8';

  switch (safeStatus) {
    case 'APPROVED':
    case 'VERIFIED':
    case 'SATISFACTORY':
    case 'COMPLETED':
    case 'RESOLVED':
    case 'PASSED':
    case 'READY_TO_SUBMIT':
      badgeClass = 'badge-green';
      dotColor = '#16a34a';
      break;

    case 'UNDER_REVIEW':
    case 'SUBMITTED':
    case 'ASSIGNED':
    case 'INSPECTION_SCHEDULED':
    case 'SCHEDULED':
    case 'IN_PROGRESS':
    case 'READY_TO_APPLY':
      badgeClass = 'badge-blue';
      dotColor = '#2563eb';
      break;

    case 'QUERY_RAISED':
    case 'PENDING_VERIFICATION':
    case 'VALIDATION_ERROR':
    case 'ACTION_REQUIRED':
    case 'REVIEW_REQUIRED':
    case 'WARNING':
    case 'FOLLOW_UP_REQUIRED':
    case 'RESPONDED':
    case 'OPEN':
      badgeClass = 'badge-amber';
      dotColor = '#d97706';
      break;

    case 'REJECTED':
    case 'UNSATISFACTORY':
    case 'EXPIRED':
    case 'MISSING':
    case 'FAILED':
    case 'BLOCKING':
    case 'LOCKED':
      badgeClass = 'badge-red';
      dotColor = '#dc2626';
      break;

    case 'DRAFT':
    case 'UPLOADED':
    case 'INFO':
    default:
      badgeClass = 'badge-neutral';
      dotColor = '#64748b';
      break;
  }

  const paddingStyle = size === 'sm' ? { fontSize: '10.5px', padding: '2px 8px' } : { fontSize: '12px', padding: '4px 10px' };

  return (
    <span
      className={`badge ${badgeClass}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
        ...paddingStyle,
      }}
    >
      {showDot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: dotColor,
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
      )}
      {displayLabel}
    </span>
  );
};
