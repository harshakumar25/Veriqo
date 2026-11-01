import React, { useState } from 'react';
import { Calendar, ClipboardCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { InspectionChecklistItem, InspectionRecord } from '@/lib/types';
import { StatusBadge } from '@/components/ui/StatusBadge';

export interface InspectionDeskTabProps {
  inspection: InspectionRecord | null;
  onOpenScheduleModal: () => void;
  onStartInspection: () => void;
  onCompleteInspection: (
    outcome: 'SATISFACTORY' | 'UNSATISFACTORY',
    remarks: string,
    checklist: InspectionChecklistItem[],
  ) => void;
  onProceedToDecision: () => void;
}

export const InspectionDeskTab: React.FC<InspectionDeskTabProps> = ({
  inspection,
  onOpenScheduleModal,
  onStartInspection,
  onCompleteInspection,
  onProceedToDecision,
}) => {
  const [checklist, setChecklist] = useState<InspectionChecklistItem[]>([
    { id: 'chk-1', label: 'Site identity & plot demarcation verified (Plot No. E-45, MIDC Chakan)', status: 'PASS' },
    { id: 'chk-2', label: 'Insulated cold storage multi-chamber structure constructed', status: 'PASS' },
    { id: 'chk-3', label: 'Storage capacity consistent with application (5,000 MT verified)', status: 'PASS' },
    { id: 'chk-4', label: 'Process flow & temperature monitoring sensors reviewed', status: 'PASS' },
    { id: 'chk-5', label: 'Ammonia refrigerant relief valves & ventilation observed', status: 'PASS' },
  ]);

  const [inspRemarks, setInspRemarks] = useState(
    'Site verified. Refrigeration compressor units, ammonia safety valves, and multi-chamber insulation comply with FSSAI cold chain norms.',
  );

  const handleChecklistToggle = (id: string, newStatus: 'PASS' | 'FAIL') => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
  };

  const handleComplete = () => {
    const hasFail = checklist.some((c) => c.status === 'FAIL');
    const outcome = hasFail ? 'UNSATISFACTORY' : 'SATISFACTORY';
    onCompleteInspection(outcome, inspRemarks, checklist);
  };

  if (!inspection) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <Calendar size={36} color="#64748b" style={{ margin: '0 auto 12px' }} />
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
          No Inspection Currently Scheduled
        </div>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', maxWidth: '500px', margin: '6px auto 16px' }}>
          Schedule a site verification for cold storage chamber inspection and safety testing before issuing final clearance.
        </p>
        <button
          type="button"
          onClick={onOpenScheduleModal}
          className="btn btn-primary"
        >
          <Calendar size={14} /> Schedule Site Inspection (05 Sep 2026, 11:00 AM)
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClipboardCheck size={18} color="#1d4ed8" /> Site Inspection Desk
          </div>
          <div className="card-subtitle">
            Scheduled for: <strong>{inspection.scheduledDate} at {inspection.scheduledTime}</strong> • {inspection.location}
          </div>
        </div>
        <StatusBadge status={inspection.status} showDot />
      </div>

      {/* State: Scheduled */}
      {inspection.status === 'SCHEDULED' && (
        <div
          style={{
            padding: '20px',
            background: '#eff6ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e3a8a' }}>
              Inspection Scheduled for {inspection.scheduledDate} ({inspection.scheduledTime})
            </div>
            <div style={{ fontSize: '12px', color: '#3b82f6', marginTop: '2px' }}>
              Assigned Inspecting Officer: {inspection.officerName} (Pune Scrutiny Unit)
            </div>
          </div>
          <button
            type="button"
            onClick={onStartInspection}
            className="btn btn-primary"
          >
            Start Inspection
          </button>
        </div>
      )}

      {/* State: In Progress */}
      {inspection.status === 'IN_PROGRESS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
            Mandatory Site Verification Checklist:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {checklist.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: item.status === 'PASS' ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${item.status === 'PASS' ? '#bbf7d0' : '#fecaca'}`,
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                  {item.label}
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => handleChecklistToggle(item.id, 'PASS')}
                    className={`btn btn-sm ${item.status === 'PASS' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '11px', padding: '4px 10px' }}
                  >
                    PASS
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChecklistToggle(item.id, 'FAIL')}
                    className={`btn btn-sm ${item.status === 'FAIL' ? 'btn-danger' : 'btn-secondary'}`}
                    style={{ fontSize: '11px', padding: '4px 10px' }}
                  >
                    FAIL
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="form-group" style={{ marginTop: '10px' }}>
            <label className="form-label">Inspecting Officer Remarks / Field Notes *</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={inspRemarks}
              onChange={(e) => setInspRemarks(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={handleComplete}
              className="btn btn-primary"
              style={{ padding: '10px 20px' }}
            >
              <CheckCircle2 size={16} /> Complete Inspection (SATISFACTORY)
            </button>
          </div>
        </div>
      )}

      {/* State: Completed */}
      {inspection.status === 'COMPLETED' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              padding: '16px',
              background: inspection.outcome === 'SATISFACTORY' ? '#f0fdf4' : '#fef2f2',
              borderRadius: '6px',
              border: `1px solid ${inspection.outcome === 'SATISFACTORY' ? '#bbf7d0' : '#fecaca'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: inspection.outcome === 'SATISFACTORY' ? '#15803d' : '#b91c1c' }}>
              <CheckCircle2 size={18} />
              <span>INSPECTION OUTCOME: {inspection.outcome}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#1e293b', marginTop: '6px' }}>
              <strong>Officer Remarks:</strong> {inspection.remarks}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
              Conducted on: {inspection.scheduledDate} at {inspection.scheduledTime} • Signed by {inspection.officerName}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onProceedToDecision}
              className="btn btn-primary"
            >
              Proceed to Final Review &amp; Decision <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

