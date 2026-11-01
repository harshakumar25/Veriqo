import React from 'react';
import { MapPin } from 'lucide-react';
import { BusinessProfile } from '@/lib/types';
import { formatCurrencyINR } from '@/lib/formatters';

export interface SiteLocationSectionProps {
  business: BusinessProfile;
  premisesType: string;
  isSubmitted: boolean;
  onPremisesTypeChange: (val: string) => void;
}

export const SiteLocationSection: React.FC<SiteLocationSectionProps> = ({
  business,
  premisesType,
  isSubmitted,
  onPremisesTypeChange,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="#1d4ed8" /> 2. Site Location &amp; Premises Details
          </div>
          <div className="card-subtitle">Physical premises context under MIDC Pune jurisdiction</div>
        </div>
      </div>

      <div className="grid-3">
        <div className="form-group">
          <label className="form-label">State &amp; District</label>
          <input type="text" className="form-input" value={`${business.state} — ${business.district}`} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Industrial Area / Zone</label>
          <input type="text" className="form-input" value={`${business.industrialArea} (${business.locationType})`} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Plot Number</label>
          <input type="text" className="form-input" value={business.plotNumber} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Premises Tenure *</label>
          <select
            className="form-select"
            value={premisesType}
            onChange={(e) => onPremisesTypeChange(e.target.value)}
            disabled={isSubmitted}
          >
            <option value="Owned (MIDC Industrial Leasehold)">Owned (MIDC 95-Year Industrial Leasehold)</option>
            <option value="Rented / Sub-leased">Rented / Sub-leased</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Total Built-up Area</label>
          <input type="text" className="form-input" value={`${business.builtUpAreaSqft.toLocaleString()} Sq. Ft.`} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Capital Investment</label>
          <input type="text" className="form-input" value={formatCurrencyINR(business.totalInvestmentInr)} disabled />
        </div>
      </div>
    </div>
  );
};

