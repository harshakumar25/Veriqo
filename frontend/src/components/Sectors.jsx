import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/use-app-store';
import { TiltCard } from '@/components/motion/TiltCard';
import './Sectors.css';

const sectors = [
  {
    name: 'Logistics & Warehousing',
    configured: true,
    statusText: 'HERO PATHWAY CONFIGURED',
    statusType: 'configured',
    coverageNote: 'Full deterministic pre-validation & approval DAG configured for Cold Chain.',
    theme: 'orange',
    subsectors: [
      { name: 'General Warehouse / Storage', status: 'PARTIAL' },
      { name: 'Cold Storage / Cold Chain', status: 'HERO_ACTIVE' },
      { name: 'Distribution Center', status: 'PARTIAL' },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    name: 'Tourism & Hospitality',
    configured: false,
    statusText: 'RULES NEED REVIEW',
    statusType: 'review',
    coverageNote: 'Profiling available. Statutory fire and municipal bylaws awaiting rule verification.',
    theme: 'blue',
    subsectors: [
      { name: 'Hotel / Resort', status: 'UNVERIFIED' },
      { name: 'Homestay', status: 'UNVERIFIED' },
      { name: 'Restaurant / Food Service', status: 'UNVERIFIED' },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
      </svg>
    ),
  },
  {
    name: 'Textiles & Garments',
    configured: false,
    statusText: 'RULES NEED REVIEW',
    statusType: 'review',
    coverageNote: 'Profiling available. Labour compliance and effluent treatment rules awaiting audit.',
    theme: 'purple',
    subsectors: [
      { name: 'Garment Manufacturing', status: 'UNVERIFIED' },
      { name: 'Spinning / Weaving', status: 'UNVERIFIED' },
      { name: 'Textile Processing / Dyeing', status: 'UNVERIFIED' },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    name: 'Food Processing',
    configured: false,
    statusText: 'RULES NEED REVIEW',
    statusType: 'review',
    coverageNote: 'Profiling available. FSSAI state vs central capacity limits require formal departmental mapping.',
    theme: 'green',
    subsectors: [
      { name: 'Dairy Processing', status: 'UNVERIFIED' },
      { name: 'Fruit & Vegetable Processing', status: 'UNVERIFIED' },
      { name: 'Grain / Flour Processing', status: 'UNVERIFIED' },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" />
        <path d="M12 6v6l4 2" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
      </svg>
    ),
  },
];

export default function Sectors() {
  const [, setSelectedSector] = useState(sectors[0]);
  const navigate = useNavigate();
  const { setPersona } = useAppStore();

  const handleSelectSectorAction = (sector) => {
    setSelectedSector(sector);
    if (sector.configured) {
      setPersona('persona_entrepreneur');
      navigate('/roadmap');
    }
  };

  return (
    <section className="ref-sec-section" id="sectors">
      <div className="ref-sec-container">
        {/* ── Section Header ── */}
        <div className="ref-sec-header">
          <div className="ref-sec-eyebrow">
            <span className="ref-sec-dash">—</span>
            <span>SECTOR COVERAGE</span>
            <span className="ref-sec-dash">—</span>
          </div>
          <h2 className="ref-sec-title">4 Sectors • 12 Sub-sectors</h2>
          <p className="ref-sec-subtitle">
            The prototype supports business profiling across four Maharashtra sector groups.
            Detailed rule coverage is currently configured for the hero pathway.
          </p>
        </div>

        {/* ── 4 Sector Cards Grid ── */}
        <div className="ref-sec-grid">
          {sectors.map((sec) => (
            <TiltCard
              key={sec.name}
              maxTilt={3}
              className={`ref-sec-card ${sec.configured ? 'is-configured' : ''}`}
              onClick={() => handleSelectSectorAction(sec)}
              role="button"
              tabIndex={0}
            >
              <div className="ref-sec-card-top">
                <div className={`ref-sec-icon-box theme-${sec.theme}`}>
                  {sec.icon}
                </div>
                <div>
                  <h3 className="ref-sec-name">{sec.name}</h3>
                  <span className="ref-sec-count">3 Sub-sectors</span>
                </div>
              </div>

              {/* Sub-sectors Bullet List */}
              <ul className="ref-sec-sub-list">
                {sec.subsectors.map((sub) => (
                  <li key={sub.name} className="ref-sec-sub-item">
                    <span className="ref-sec-bullet">—</span>
                    <span className="ref-sec-sub-label">{sub.name}</span>
                    {sub.status === 'HERO_ACTIVE' && (
                      <span className="ref-mini-chip hero">Hero</span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Bottom Status Chip */}
              <div className="ref-sec-footer">
                {sec.configured ? (
                  <div className="ref-status-chip configured">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{sec.statusText}</span>
                  </div>
                ) : (
                  <div className="ref-status-chip review">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{sec.statusText}</span>
                  </div>
                )}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Sector Disclosure Note */}
        <div className="ref-sec-disclosure">
          <div className="ref-disclosure-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="ref-disclosure-text">
            <strong>Demonstration Scope:</strong> Regulatory rule coverage is fully configured for{' '}
            <em>Logistics &amp; Warehousing → Cold Storage / Cold Chain</em>. The remaining sub-sectors are available
            for profiling exploration, but require formal department rule verification before live deployment.
          </div>
        </div>
      </div>
    </section>
  );
}
