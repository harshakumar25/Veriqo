import React from 'react';
import { Building2 } from 'lucide-react';
import { BusinessProfile } from '@/lib/types';

export interface EnterpriseIdentitySectionProps {
  business: BusinessProfile;
}

export const EnterpriseIdentitySection: React.FC<EnterpriseIdentitySectionProps> = ({
  business,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} color="#1d4ed8" /> 1. Applicant &amp; Enterprise Legal Identity
          </div>
          <div className="card-subtitle">Auto-populated from verified Business Profile</div>
        </div>
        <span className="badge badge-green">VERIFIED PROFILE DATA</span>
      </div>

      <div className="grid-3">
        <div className="form-group">
          <label className="form-label">Legal Name of Enterprise</label>
          <input type="text" className="form-input" value={business.name} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Trade / Facility Name</label>
          <input type="text" className="form-input" value={business.tradeName} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Company PAN</label>
          <input type="text" className="form-input" value={business.pan} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Corporate Identification (CIN)</label>
          <input type="text" className="form-input" value={business.cin} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Maharashtra GSTIN</label>
          <input type="text" className="form-input" value={business.gstin} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Authorized Signatory</label>
          <input
            type="text"
            className="form-input"
            value={`${business.contactName} (${business.contactDesignation})`}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

