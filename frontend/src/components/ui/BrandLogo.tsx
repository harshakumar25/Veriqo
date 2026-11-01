import React from 'react';
import { Link } from 'react-router-dom';

export interface BrandLogoProps {
  to?: string;
  variant?: 'light' | 'dark';
  monogramOnly?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  to = '/',
  variant = 'dark',
  monogramOnly = false,
}) => {
  const isDark = variant === 'dark';

  const logoContent = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Ashoka Chakra & Monogram Icon */}
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '15px',
          letterSpacing: '-0.5px',
          boxShadow: '0 2px 4px rgba(29, 78, 216, 0.25)',
          flexShrink: 0,
        }}
      >
        VQ
      </div>

      {!monogramOnly && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <div
            style={{
              fontSize: '17px',
              fontWeight: 800,
              letterSpacing: '-0.3px',
              color: isDark ? '#ffffff' : '#0f172a',
            }}
          >
            Veriq<span style={{ color: '#f97316' }}>o</span>
          </div>
          <div
            style={{
              fontSize: '9.5px',
              fontWeight: 600,
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              color: isDark ? 'rgba(255, 255, 255, 0.55)' : '#64748b',
              marginTop: '1px',
            }}
          >
            Govt. of Maharashtra
          </div>
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none', display: 'inline-flex' }}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

