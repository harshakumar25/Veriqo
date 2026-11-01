import React from 'react';
import { ShieldCheck } from 'lucide-react';

export interface StatutoryDeclarationSectionProps {
  businessName: string;
  plotNumber: string;
  isAccepted: boolean;
  isSubmitted: boolean;
  onAcceptedChange: (val: boolean) => void;
}

export const StatutoryDeclarationSection: React.FC<StatutoryDeclarationSectionProps> = ({
  businessName,
  plotNumber,
  isAccepted,
  isSubmitted,
  onAcceptedChange,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#1d4ed8" /> 5. Applicant Declaration &amp; Authorization
          </div>
          <div className="card-subtitle">Legal undertaking under Food Safety &amp; Standards Act, 2006</div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          fontSize: '13px',
          color: '#334155',
          lineHeight: '1.6',
        }}
      >
        <input
          type="checkbox"
          id="declaration"
          checked={isAccepted}
          onChange={(e) => onAcceptedChange(e.target.checked)}
          disabled={isSubmitted}
          style={{ marginTop: '3px', cursor: 'pointer' }}
        />
        <label htmlFor="declaration" style={{ cursor: 'pointer' }}>
          I hereby declare that the information furnished in this application for <strong>{businessName}</strong> at{' '}
          <strong>{plotNumber}, MIDC Chakan Phase II, Pune</strong> is true, correct, and complete to the best of my
          knowledge. All cold chain refrigeration, temperature logging, and food hygiene requirements comply with FSSAI
          regulations.
        </label>
      </div>
    </div>
  );
};
