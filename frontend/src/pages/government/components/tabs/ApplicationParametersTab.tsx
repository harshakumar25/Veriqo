import React from 'react';
import { BusinessProfile } from '@/lib/types';
import { formatCurrencyINR } from '@/lib/formatters';

export interface ApplicationParametersTabProps {
  business: BusinessProfile;
}

export const ApplicationParametersTab: React.FC<ApplicationParametersTabProps> = ({
  business,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Submitted Application Parameters</div>
          <div className="card-subtitle">Verified parameters transmitted by applicant</div>
        </div>
      </div>

      <div className="grid-3" style={{ fontSize: '13px' }}>
        <div className="form-group">
          <label className="form-label">Enterprise Name</label>
          <div style={{ fontWeight: '600', color: '#0f172a' }}>{business.name}</div>
        </div>
        <div className="form-group">
          <label className="form-label">PAN / GSTIN</label>
          <div style={{ fontWeight: '600', color: '#0f172a' }}>
            {business.pan} / {business.gstin}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Location Type &amp; Plot</label>
          <div style={{ fontWeight: '600', color: '#0f172a' }}>
            MIDC Chakan Phase II, {business.plotNumber}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Storage Capacity (MT)</label>
          <div style={{ fontWeight: '600', color: '#0f172a' }}>
            {business.storageCapacityMt} MT ({business.storageType})
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Connected Power Demand</label>
          <div style={{ fontWeight: '600', color: '#0f172a' }}>
            {business.powerRequirementKw} kW (HT Industrial)
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Capital Investment</label>
          <div style={{ fontWeight: '600', color: '#0f172a' }}>
            {formatCurrencyINR(business.totalInvestmentInr)}
          </div>
        </div>
      </div>
    </div>
  );
};

