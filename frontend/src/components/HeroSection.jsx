import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/use-app-store';
import GatewayOfIndia from './GatewayOfIndia';
import { TiltCard } from '@/components/motion/TiltCard';
import { translations } from '@/lib/i18n';
import './HeroSection.css';

const stats = [
  {
    value: '4',
    suffix: '',
    label: 'SECTORS',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    value: '12',
    suffix: '',
    label: 'SUB-SECTORS',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    value: '18',
    suffix: '+',
    label: 'MODULES',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    value: '9',
    suffix: '+',
    label: 'APPROVAL TYPES',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
  },
  {
    value: '1',
    suffix: '',
    label: 'SINGLE WINDOW',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="8" x2="22" y2="8" />
        <circle cx="5" cy="5.5" r="0.7" fill="#f59e0b" />
        <circle cx="8" cy="5.5" r="0.7" fill="#f59e0b" />
        <circle cx="11" cy="5.5" r="0.7" fill="#f59e0b" />
      </svg>
    ),
  },
];

export default function HeroSection({ onOpenAuth, currentLang = 'en' }) {
  const navigate = useNavigate();
  const { setPersona } = useAppStore();

  const t = translations[currentLang]?.hero || translations.en.hero;

  const handleStartJourney = (e) => {
    e.preventDefault();
    if (onOpenAuth) {
      onOpenAuth('ENTREPRENEUR');
    } else {
      setPersona('persona_entrepreneur');
      navigate('/dashboard');
    }
  };

  const handleViewDemo = (e) => {
    e.preventDefault();
    setPersona('persona_entrepreneur');
    navigate('/dashboard');
  };

  const handleQuickAction = (route, personaType, isAuthAction = false) => {
    if (isAuthAction && onOpenAuth) {
      onOpenAuth('ENTREPRENEUR');
      return;
    }
    if (personaType) {
      setPersona(personaType);
    }
    navigate(route);
  };

  return (
    <section className="ref-hero-section" id="hero">
      {/* ── Background Gateway Silhouette with Twilight Lighting ── */}
      <div className="ref-hero-backdrop" aria-hidden="true">
        <div className="ref-hero-gateway-pos">
          <GatewayOfIndia opacity={0.38} glow={true} width="660px" height="460px" />
        </div>
        <div className="ref-hero-sky-glow" />

        {/* Ethereal Dotted Terrain Mesh on Ground */}
        <div className="ref-hero-mesh-terrain">
          <svg viewBox="0 0 1440 320" fill="none" className="ref-mesh-svg" preserveAspectRatio="none">
            {Array.from({ length: 8 }, (_, row) => {
              const yBase = 160 + row * 20;
              return (
                <path
                  key={`mesh-line-${row}`}
                  d={`M0,${yBase + 40} Q360,${yBase - 30 + (row % 2) * 15} 720,${yBase + 20} T1440,${yBase - 10}`}
                  stroke="rgba(245, 158, 11, 0.16)"
                  strokeWidth="1.2"
                  strokeDasharray="2 12"
                  fill="none"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── Main Two-Column Container ── */}
      <div className="ref-hero-container">
        <div className="ref-hero-grid">
          {/* Left Column: Heading, Subtitle, CTAs, Trust Signals */}
          <div className="ref-hero-left">
            <div className="ref-hero-badge-kicker">
              <span className="ref-kicker-bar" />
              <span className="ref-kicker-text">{t.prototypeTag.toUpperCase()}</span>
            </div>

            <h1 className="ref-hero-title">
              {currentLang === 'en' ? (
                <>
                  One Platform for<br />
                  Every Business Approval,<br />
                  <span className="ref-hl-orange">Pre-validation</span> and<br />
                  <span className="ref-hl-amber">Simplified.</span>
                </>
              ) : (
                <>
                  {t.titlePart1}<br />
                  {t.titlePart2}<br />
                  <span className="ref-hl-orange">{t.highlightOrange}</span>{' '}
                  <span className="ref-hl-amber">{t.highlightAmber}</span>
                </>
              )}
            </h1>

            <p className="ref-hero-subtitle">
              {t.subtitle}
            </p>

            {/* CTAs */}
            <div className="ref-hero-cta-group">
              <button
                onClick={handleStartJourney}
                className="ref-hero-btn-primary"
                id="hero-start-btn"
                type="button"
              >
                <span>{t.ctaPrimary}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={handleViewDemo}
                className="ref-hero-btn-demo"
                id="hero-demo-btn"
                type="button"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>{t.ctaDemo}</span>
              </button>
            </div>

            {/* Accurate Trust Badges Row */}
            <div className="ref-hero-trust-row">
              <div className="ref-trust-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 11.5 14.5 15.5 9.5" />
                </svg>
                <span>{t.trust1}</span>
              </div>
              <span className="ref-trust-sep">|</span>
              <div className="ref-trust-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 11.5 14.5 15.5 9.5" />
                </svg>
                <span>{t.trust2}</span>
              </div>
              <span className="ref-trust-sep">|</span>
              <div className="ref-trust-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 11.5 14.5 15.5 9.5" />
                </svg>
                <span>{t.trust3}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Isometric / Angled Multi-Layer Dashboard Composition */}
          <div className="ref-hero-right">
            <div className="ref-perspective-stage">
              {/* Layer 0: Stacked Glass Panes behind main dashboard */}
              <div className="ref-glass-sheet-back-2" aria-hidden="true" />
              <div className="ref-glass-sheet-back-1" aria-hidden="true" />

              {/* Layer 1: Main Dashboard Chassis with TiltCard */}
              <TiltCard maxTilt={3.5} className="ref-mockup-frame">
                {/* Mockup Top Header Bar */}
                <div className="ref-mockup-header">
                  <div className="ref-mockup-identity">
                    <div className="ref-mockup-logo-dot" />
                    <span className="ref-mockup-title">Veriqo</span>
                    <span className="ref-mockup-page-label">Demonstration Canvas</span>
                  </div>
                  <div className="ref-mockup-status-badge">
                    <span className="ref-mockup-status-dot" />
                    <span>Application in Progress</span>
                  </div>
                </div>

                {/* Mockup Content Grid */}
                <div className="ref-mockup-body">
                  {/* Left Mini Sidebar with Orange Home Tile */}
                  <div className="ref-mockup-sidebar">
                    <div className="ref-sidebar-home-tile" title="Home">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div className="ref-sidebar-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                      </svg>
                    </div>
                    <div className="ref-sidebar-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className="ref-sidebar-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <div className="ref-sidebar-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </div>
                  </div>

                  <div className="ref-mockup-main">
                    {/* Top Stat Pills inside mockup */}
                    <div className="ref-mockup-stats-row">
                      <div className="ref-mockup-stat-card">
                        <div className="ref-mini-kpi-icon green">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                          </svg>
                        </div>
                        <div className="ref-mini-kpi-info">
                          <span className="ref-stat-mini-num">9</span>
                          <span className="ref-stat-mini-text">APPROVALS</span>
                        </div>
                      </div>

                      <div className="ref-mockup-stat-card">
                        <div className="ref-mini-kpi-icon orange">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        </div>
                        <div className="ref-mini-kpi-info">
                          <span className="ref-stat-mini-num text-orange">1</span>
                          <span className="ref-stat-mini-text">ACTION</span>
                        </div>
                      </div>

                      <div className="ref-mockup-stat-card">
                        <div className="ref-mini-kpi-icon blue">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <div className="ref-mini-kpi-info">
                          <span className="ref-stat-mini-num text-blue">1</span>
                          <span className="ref-stat-mini-text">ACTIVE</span>
                        </div>
                      </div>
                    </div>

                    {/* Luminous Area Wave Chart with glowing end dot */}
                    <div className="ref-mockup-chart-box">
                      <svg viewBox="0 0 340 100" fill="none" className="ref-wave-svg" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="heroGreenWave" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                            <stop offset="60%" stopColor="#10b981" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,80 C40,78 70,72 105,74 C140,76 170,55 210,48 C250,42 280,48 315,30 C325,25 335,22 340,20 L340,100 L0,100 Z"
                          fill="url(#heroGreenWave)"
                        />
                        <path
                          d="M0,80 C40,78 70,72 105,74 C140,76 170,55 210,48 C250,42 280,48 315,30 C325,25 335,22 340,20"
                          stroke="#10b981"
                          strokeWidth="2.5"
                          fill="none"
                        />
                        {/* Glowing End Pulse Dot */}
                        <circle cx="338" cy="20" r="4" fill="#10b981" />
                        <circle cx="338" cy="20" r="7" fill="#10b981" fillOpacity="0.35" />
                      </svg>
                    </div>

                    {/* Mini Task Bar */}
                    <div
                      className="ref-mockup-task-item"
                      onClick={() => handleQuickAction('/query/hero-query-01', 'persona_entrepreneur')}
                    >
                      <div className="ref-task-bullet" />
                      <span className="ref-task-label">Respond to Process Flow query — FSSAI</span>
                      <svg className="ref-task-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Layer 2: Foreground Floating "Quick Access" Card */}
              <TiltCard maxTilt={5} className="ref-quick-access-card">
                <div className="ref-qa-header">
                  <h3 className="ref-qa-title">{t.quickAccess}</h3>
                </div>

                <div className="ref-qa-list">
                  {/* Item 1: Start as Entrepreneur */}
                  <div
                    className="ref-qa-item"
                    onClick={() => handleQuickAction('/business-profile', 'persona_entrepreneur', true)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ref-qa-icon-wrap user-theme">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="ref-qa-item-name">Start as Entrepreneur</span>
                    <svg className="ref-qa-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>

                  {/* Item 2: Entrepreneur Dashboard */}
                  <div
                    className="ref-qa-item"
                    onClick={() => handleQuickAction('/dashboard', 'persona_entrepreneur')}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ref-qa-icon-wrap dash-theme">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                      </svg>
                    </div>
                    <span className="ref-qa-item-name">Entrepreneur Dashboard</span>
                    <svg className="ref-qa-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>

                  {/* Item 3: Track Application */}
                  <div
                    className="ref-qa-item"
                    onClick={() => handleQuickAction('/application/hero-fssai-01', 'persona_entrepreneur')}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ref-qa-icon-wrap track-theme">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    </div>
                    <span className="ref-qa-item-name">Track Application</span>
                    <svg className="ref-qa-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>

                  {/* Item 4: Demonstration Profile / Cold Storage */}
                  <div
                    className="ref-qa-item active-demo"
                    onClick={() => handleQuickAction('/roadmap', 'persona_entrepreneur')}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ref-qa-icon-wrap profile-theme">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="ref-qa-stacked-text">
                      <span className="ref-qa-main-lbl">Demonstration Profile</span>
                      <span className="ref-qa-sub-lbl">Cold Storage / Cold Chain</span>
                    </div>
                    <svg className="ref-qa-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </TiltCard>

              {/* Layer 3: Foreground Floating "Pre-validation" Card */}
              <div className="ref-preval-floating-card">
                <div className="ref-preval-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="ref-preval-text-box">
                  <span className="ref-preval-title">Pre-validation</span>
                  <span className="ref-preval-desc">Document checks passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Saffron & Emerald Flowing Accent Waves ── */}
        <div className="ref-hero-bottom-curve" aria-hidden="true">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="ref-curve-svg">
            <path
              d="M0,60 C320,110 500,20 800,80 C1100,140 1280,40 1440,90 L1440,120 L0,120 Z"
              fill="rgba(249, 115, 22, 0.22)"
            />
            <path
              d="M0,80 C360,130 650,40 960,95 C1200,140 1350,70 1440,105 L1440,120 L0,120 Z"
              fill="rgba(16, 185, 129, 0.2)"
            />
          </svg>
        </div>

        {/* ── Translucent Metrics Ticker Bar (Overlapping Bottom) ── */}
        <div className="ref-stats-bar-wrapper">
          <div className="ref-stats-bar">
            {stats.map((s, idx) => (
              <div key={s.label} className="ref-stat-col">
                <div className="ref-stat-icon-wrap">{s.icon}</div>
                <div className="ref-stat-content">
                  <div className="ref-stat-number">
                    {s.value}
                    {s.suffix && <span className="ref-stat-suffix">{s.suffix}</span>}
                  </div>
                  <div className="ref-stat-label">{s.label}</div>
                </div>
                {idx < stats.length - 1 && <div className="ref-stat-divider" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
