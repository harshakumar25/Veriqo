import React from 'react';
import { Info } from 'lucide-react';
import { BusinessProfile } from '@/lib/types';

export interface TechnicalParametersSectionProps {
  business: BusinessProfile;
  standbyGensetKva: string;
  operationalShift: string;
  ammoniaSafetyAudit: string;
  isSubmitted: boolean;
  onFieldChange: (field: string, val: string) => void;
}

export const TechnicalParametersSection: React.FC<TechnicalParametersSectionProps> = ({
  business,
  standbyGensetKva,
  operationalShift,
  ammoniaSafetyAudit,
  isSubmitted,
  onFieldChange,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={18} color="#1d4ed8" /> 3. Cold Storage Technical &amp; Operational Parameters
          </div>
          <div className="card-subtitle">
            Specific refrigeration capacity, power, and food category classifications
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="form-group">
          <label className="form-label">Refrigerated Storage Capacity</label>
          <input
            type="text"
            className="form-input"
            value={`${business.storageCapacityMt.toLocaleString()} Metric Tonnes (MT)`}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="form-label">Temperature Operating Band</label>
          <input type="text" className="form-input" value={business.temperatureRange} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Connected Power / Grid Load</label>
          <input
            type="text"
            className="form-input"
            value={`${business.powerRequirementKw} kW (HT Connected)`}
            disabled
          />
        </div>
        <div className="form-group">
          <label className="form-label">Standby Diesel Generator (DG Set) *</label>
          <input
            type="text"
            className="form-input"
            value={standbyGensetKva}
            onChange={(e) => onFieldChange('standbyGensetKva', e.target.value)}
            disabled={isSubmitted}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Operating Schedule / Shifts *</label>
          <select
            className="form-select"
            value={operationalShift}
            onChange={(e) => onFieldChange('operationalShift', e.target.value)}
            disabled={isSubmitted}
          >
            <option value="24 Hours / 3 Shifts">24 Hours / 3 Continuous Shifts</option>
            <option value="16 Hours / 2 Shifts">16 Hours / 2 Shifts</option>
            <option value="8 Hours / Single Shift">8 Hours / Single Shift</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Ammonia Refrigerant Safety Compliance *</label>
          <input
            type="text"
            className="form-input"
            value={ammoniaSafetyAudit}
            onChange={(e) => onFieldChange('ammoniaSafetyAudit', e.target.value)}
            disabled={isSubmitted}
          />
        </div>
      </div>
    </div>
  );
};
