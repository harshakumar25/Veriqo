import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/use-app-store';
import GatewayOfIndia from './GatewayOfIndia';
import './CTASection.css';

const prototypeMetrics = [
  { value: '4', label: 'SECTOR GROUPS' },
  { value: '12', label: 'SUB-SECTORS' },
  { value: '1', label: 'CONFIGURED HERO PATHWAY' },
];

export default function CTASection({ onOpenAuth }) {
  const navigate = useNavigate();
  const { setPersona } = useAppStore();

  const handleStartEntrepreneur = (e) => {
    e.preventDefault();
    if (onOpenAuth) {
      onOpenAuth('ENTREPRENEUR');
    } else {
      setPersona('persona_entrepreneur');
      navigate('/dashboard');
    }
  };

  const handleOfficerLogin = (e) => {
    e.preventDefault();
    if (onOpenAuth) {
      onOpenAuth('OFFICER');
    } else {
      setPersona('persona_officer');
      navigate('/government/dashboard');
    }
  };

  return (
    <section className="ref-cta-section" id="about">
      <div className="ref-cta-container">
        {/* ── Dark Navy Card Banner ── */}
        <div className="ref-cta-card">
          {/* Gateway of India Backdrop Silhouette on the Right */}
          <div className="ref-cta-gateway-wrap" aria-hidden="true">
            <GatewayOfIndia opacity={0.5} glow={true} width="460px" height="320px" />
          </div>

          <div className="ref-cta-grid">
            {/* Left Content Area */}
            <div className="ref-cta-left">
              <div className="ref-cta-eyebrow">MAHARASHTRA PROTOTYPE WORKFLOW</div>
              <h2 className="ref-cta-title">
                Prepare and follow your approval journey in one place.
              </h2>
              <p className="ref-cta-subtitle">
                Explore the demonstration to see how a business profile, roadmap,
                documents and departmental workflow stay connected.
              </p>

              {/* Action Buttons */}
              <div className="ref-cta-actions">
                <button
                  onClick={handleStartEntrepreneur}
                  className="ref-cta-btn-primary"
                  id="cta-entrepreneur-btn"
                  type="button"
                >
                  <span>Start as Entrepreneur</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={handleOfficerLogin}
                  className="ref-cta-btn-secondary"
                  id="cta-officer-btn"
                  type="button"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Government Officer Login</span>
                </button>
              </div>
            </div>

            {/* Right/Center Stats Glass Box */}
            <div className="ref-cta-right">
              <div className="ref-cta-stats-panel">
                <div className="ref-cta-stats-header">Prototype Coverage</div>
                <div className="ref-cta-stats-list">
                  {prototypeMetrics.map((m) => (
                    <div key={m.label} className="ref-cta-stat-item">
                      <div className="ref-cta-stat-num">{m.value}</div>
                      <div className="ref-cta-stat-name">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Saffron-Gold Flowing Wave */}
          <div className="ref-cta-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 45" fill="none" preserveAspectRatio="none">
              <path
                d="M0,25 C300,45 600,0 900,30 C1050,42 1150,20 1200,28 L1200,45 L0,45 Z"
                fill="url(#ctaGoldWave)"
              />
              <defs>
                <linearGradient id="ctaGoldWave" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
