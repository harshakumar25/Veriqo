import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Calendar } from 'lucide-react';

export interface ScheduleInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: string, time: string, location: string) => void;
  defaultLocation?: string;
}

export const ScheduleInspectionModal: React.FC<ScheduleInspectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultLocation = 'Plot No. E-45, MIDC Chakan Phase II, Pune',
}) => {
  const [date, setDate] = useState('2026-09-05');
  const [time, setTime] = useState('11:00 AM');
  const [location, setLocation] = useState(defaultLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date.trim() || !time.trim() || !location.trim()) return;
    onSubmit(date, time, location);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Physical Site Inspection"
      subtitle="Coordinate with multi-departmental inspection team (MPCB, DISH, Fire Services)."
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" form="schedule-inspection-form" className="btn btn-primary">
            <Calendar size={14} /> Schedule Inspection
          </button>
        </>
      }
    >
      <form id="schedule-inspection-form" onSubmit={handleSubmit}>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Inspection Date *</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Time Slot *</label>
            <input
              type="text"
              className="form-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Inspection Site Location *</label>
          <input
            type="text"
            className="form-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div
          style={{
            padding: '12px 14px',
            background: '#f8fafc',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            fontSize: '12px',
            color: '#475569',
          }}
        >
          <strong>Joint Inspection (CIS-NX):</strong> Dispatch notice will be automatically routed to
          the applicant and the Pune Industrial Inspectorate.
        </div>
      </form>
    </Modal>
  );
};

