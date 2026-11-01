import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/use-app-store';
import { TiltCard } from '@/components/motion/TiltCard';
import './Features.css';

const featureList = [
  {
    id: 'dashboard',
    title: 'Entrepreneur Dashboard',
    desc: 'Single-window command center for applications, inspections and queries.',
    route: '/dashboard',
    actionText: 'Open Live Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'roadmap',
    title: 'Personalized Roadmap',
    desc: 'An ordered, dynamic approval pathway across all departments in real-time.',
    route: '/roadmap',
    actionText: 'Explore Approval DAG',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: 'validation',
    title: 'Document Pre-validation',
    desc: 'Catches missing documents and format errors before submission.',
    route: '/application/hero-fssai-01',
    actionText: 'Run Diagnostics Engine',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <polyline points="9 15 12 18 15 15" />
      </svg>
    ),
  },
  {
    id: 'query',
    title: 'Query & Inspection',
    desc: 'Respond to officer queries and schedule physical site inspections online.',
    route: '/query/hero-query-01',
    actionText: 'Manage Officer Queries',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState('dashboard');
  const navigate = useNavigate();
  const { setPersona } = useAppStore();

  const handleOpenActive = (route) => {
    setPersona('persona_entrepreneur');
    navigate(route);
  };

  const selectedFeature = featureList.find((f) => f.id === activeFeature) || featureList[0];

  return (
    <section className="ref-feat-section" id="features">
      <div className="ref-feat-container">
        {/* ── Section Header ── */}
        <div className="ref-feat-header">
          <h2 className="ref-feat-title">Everything you need, in one connected system</h2>
          <p className="ref-feat-subtitle">
            From intelligence to approval — Veriqo connects every step for entrepreneurs
            and reviewers alike.
          </p>
        </div>

        {/* ── Two-Column Interactive Layout ── */}
        <div className="ref-feat-grid">
          {/* Left Column: 4 Selectable Feature Cards */}
          <div className="ref-feat-selector-list">
            {featureList.map((f) => {
              const isActive = activeFeature === f.id;
              return (
                <div
                  key={f.id}
                  className={`ref-feat-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveFeature(f.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="ref-feat-card-inner">
                    <div className="ref-feat-icon-box">{f.icon}</div>
                    <div className="ref-feat-text-box">
                      <h3 className="ref-feat-card-title">{f.title}</h3>
                      <p className="ref-feat-card-desc">{f.desc}</p>
                    </div>
                    {isActive && (
                      <div
                        className="ref-feat-arrow-circle"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenActive(f.route);
                        }}
                        title={`Open ${f.title}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="ref-feat-action-banner">
              <span>Selected Capability:</span>
              <button
                type="button"
                onClick={() => handleOpenActive(selectedFeature.route)}
                className="ref-feat-launch-btn"
              >
                <span>{selectedFeature.actionText}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Realistic Dashboard UI Mockup Frame */}
          <div className="ref-feat-preview-wrap">
            <TiltCard maxTilt={3} className="ref-feat-browser-card">
              {/* Mini Left Sidebar */}
              <div className="ref-feat-mini-sidebar">
                <div className="ref-feat-side-brand">
                  <div className="ref-feat-side-logo">
                    <svg viewBox="0 0 24 24" fill="#f59e0b" width="18" height="18">
                      <circle cx="12" cy="12" r="9" stroke="#f59e0b" strokeWidth="2" fill="none" />
                      <circle cx="12" cy="12" r="3" fill="#f59e0b" />
                    </svg>
                  </div>
                  <span className="ref-feat-side-name">Veriqo</span>
                </div>

                <div className="ref-feat-nav-list">
                  <div
                    className={`ref-feat-nav-item ${activeFeature === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveFeature('dashboard')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    <span>Dashboard</span>
                  </div>
                  <div
                    className={`ref-feat-nav-item ${activeFeature === 'roadmap' ? 'active' : ''}`}
                    onClick={() => setActiveFeature('roadmap')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                    <span>Roadmap</span>
                  </div>
                  <div
                    className={`ref-feat-nav-item ${activeFeature === 'validation' ? 'active' : ''}`}
                    onClick={() => setActiveFeature('validation')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span>Documents</span>
                  </div>
                  <div
                    className={`ref-feat-nav-item ${activeFeature === 'query' ? 'active' : ''}`}
                    onClick={() => setActiveFeature('query')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span>Queries</span>
                  </div>
                </div>
              </div>

              {/* Main Preview Content Canvas */}
              <div className="ref-feat-canvas">
                {/* Canvas Top Bar */}
                <div className="ref-canvas-topbar">
                  <div>
                    <h4 className="ref-canvas-title">
                      {activeFeature === 'dashboard' && 'Entrepreneur Command Center'}
                      {activeFeature === 'roadmap' && 'Regulatory Roadmap Pathway'}
                      {activeFeature === 'validation' && 'Pre-validation Diagnostics'}
                      {activeFeature === 'query' && 'Officer Query & Inspection Desk'}
                    </h4>
                    <p className="ref-canvas-sub">FreshChain Cold Logistics Pvt. Ltd. • Chakan Phase II, Pune</p>
                  </div>
                  <div className="ref-canvas-user-row">
                    <div className="ref-canvas-bell">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                      <span className="ref-bell-dot" />
                    </div>
                    <div className="ref-canvas-avatar">FL</div>
                  </div>
                </div>

                {/* ── View 1: Entrepreneur Dashboard ── */}
                {activeFeature === 'dashboard' && (
                  <>
                    <div className="ref-canvas-kpis">
                      <div className="ref-kpi-card green-kpi">
                        <div className="ref-kpi-icon-wrap">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div className="ref-kpi-info">
                          <span className="ref-kpi-val">9</span>
                          <span className="ref-kpi-lbl">Approvals Identified</span>
                        </div>
                      </div>

                      <div className="ref-kpi-card orange-kpi">
                        <div className="ref-kpi-icon-wrap">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        </div>
                        <div className="ref-kpi-info">
                          <span className="ref-kpi-val">1</span>
                          <span className="ref-kpi-lbl">Action Required</span>
                        </div>
                      </div>

                      <div className="ref-kpi-card blue-kpi">
                        <div className="ref-kpi-icon-wrap">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                        </div>
                        <div className="ref-kpi-info">
                          <span className="ref-kpi-val">1</span>
                          <span className="ref-kpi-lbl">Application in Progress</span>
                        </div>
                      </div>
                    </div>

                    <div className="ref-canvas-split">
                      <div className="ref-priorities-box">
                        <div className="ref-box-heading">Current Priorities</div>
                        <div className="ref-priority-items">
                          <div className="ref-priority-row" onClick={() => handleOpenActive('/query/hero-query-01')}>
                            <div className="ref-pri-icon orange">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                            </div>
                            <div className="ref-pri-text">
                              <div className="ref-pri-title">Respond to Process Flow query</div>
                              <div className="ref-pri-sub">FSSAI · Action required</div>
                            </div>
                            <svg className="ref-pri-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="9 18 15 12 9 6"/></svg>
                          </div>

                          <div className="ref-priority-row" onClick={() => handleOpenActive('/dashboard')}>
                            <div className="ref-pri-icon blue">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </div>
                            <div className="ref-pri-text">
                              <div className="ref-pri-title">Inspection scheduled</div>
                              <div className="ref-pri-sub">05 Sep 2026 · 11:00 AM</div>
                            </div>
                            <svg className="ref-pri-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="9 18 15 12 9 6"/></svg>
                          </div>

                          <div className="ref-priority-row" onClick={() => handleOpenActive('/application/hero-fssai-01')}>
                            <div className="ref-pri-icon green">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            </div>
                            <div className="ref-pri-text">
                              <div className="ref-pri-title">FSSAI application</div>
                              <div className="ref-pri-sub">Under departmental review</div>
                            </div>
                            <svg className="ref-pri-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="9 18 15 12 9 6"/></svg>
                          </div>
                        </div>
                      </div>

                      <div className="ref-insights-box">
                        <div className="ref-box-heading">Approval Insights</div>
                        <div className="ref-doughnut-wrap">
                          <div className="ref-doughnut-circle">
                            <svg viewBox="0 0 100 100" className="ref-doughnut-svg">
                              <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="9" fill="none" />
                              <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="9" fill="none" strokeDasharray="238.7" strokeDashoffset="75" strokeLinecap="round" transform="rotate(-90 50 50)" />
                              <circle cx="50" cy="50" r="38" stroke="#0284c7" strokeWidth="9" fill="none" strokeDasharray="238.7" strokeDashoffset="180" strokeLinecap="round" transform="rotate(60 50 50)" />
                            </svg>
                            <div className="ref-doughnut-center">
                              <span className="ref-pct-num">72%</span>
                              <span className="ref-pct-lbl">Progress</span>
                            </div>
                          </div>

                          <div className="ref-insights-legend">
                            <div className="ref-legend-row"><span className="ref-leg-dot leg-green" /><span className="ref-leg-name">Completed</span><span className="ref-leg-val">5</span></div>
                            <div className="ref-legend-row"><span className="ref-leg-dot leg-blue" /><span className="ref-leg-name">In-Progress</span><span className="ref-leg-val">2</span></div>
                            <div className="ref-legend-row"><span className="ref-leg-dot leg-orange" /><span className="ref-leg-name">Action Required</span><span className="ref-leg-val">1</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ── View 2: Personalized Roadmap Preview ── */}
                {activeFeature === 'roadmap' && (
                  <div className="ref-feature-screen-box">
                    <div className="ref-roadmap-preview-list">
                      <div className="ref-rm-item done">
                        <span className="ref-rm-step">01</span>
                        <div className="ref-rm-text">
                          <strong>MIDC Building Plan Approval + Provisional Fire NOC</strong>
                          <span>MIDC Engineering & Fire Department · Clearance Active</span>
                        </div>
                        <span className="badge badge-green">Approved</span>
                      </div>
                      <div className="ref-rm-item in-progress">
                        <span className="ref-rm-step">02</span>
                        <div className="ref-rm-text">
                          <strong>FSSAI Central Food Warehouse Licence</strong>
                          <span>Food Safety & Standards Authority · Scrutiny Active</span>
                        </div>
                        <span className="badge badge-orange">Action Required</span>
                      </div>
                      <div className="ref-rm-item pending">
                        <span className="ref-rm-step">03</span>
                        <div className="ref-rm-text">
                          <strong>MPCB Consent to Establish (CTE)</strong>
                          <span>Maharashtra Pollution Control Board · Orange Category</span>
                        </div>
                        <span className="badge badge-gray">Pending</span>
                      </div>
                      <div className="ref-rm-item pending">
                        <span className="ref-rm-step">04</span>
                        <div className="ref-rm-text">
                          <strong>MSEDCL 750 kW Industrial Power Connection</strong>
                          <span>Electricity Distribution · Dependent on Building Plan</span>
                        </div>
                        <span className="badge badge-gray">Prerequisite Met</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── View 3: Document Pre-validation Preview ── */}
                {activeFeature === 'validation' && (
                  <div className="ref-feature-screen-box">
                    <div className="ref-val-status-header">
                      <div className="ref-val-tag blocked">PRE-SUBMISSION CHECK: 1 BLOCKING ISSUE</div>
                      <span className="ref-val-meta">Deterministic Rule Engine v2.4</span>
                    </div>

                    <div className="ref-val-list">
                      <div className="ref-val-item pass">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>Entity Name & PAN Card identity verified (MCA match)</span>
                      </div>
                      <div className="ref-val-item pass">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>Plot No. E-45 MIDC Allotment Letter attached & valid</span>
                      </div>
                      <div className="ref-val-item block">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <div className="ref-val-block-desc">
                          <strong>Process Flow Diagram missing:</strong> Mandatory requirement for FSSAI Cold Storage application.
                        </div>
                      </div>
                    </div>

                    <div className="ref-val-footer">
                      <span>DAG critical path intact. Parallel track blocked until v2 upload.</span>
                      <button
                        type="button"
                        onClick={() => handleOpenActive('/application/hero-fssai-01')}
                        className="ref-val-fix-btn"
                      >
                        Resolve in Vault
                      </button>
                    </div>
                  </div>
                )}

                {/* ── View 4: Query & Inspection Preview ── */}
                {activeFeature === 'query' && (
                  <div className="ref-feature-screen-box">
                    <div className="ref-query-desk-card">
                      <div className="ref-query-officer-banner">
                        <div className="ref-officer-avatar">RK</div>
                        <div>
                          <strong>Officer Rajesh Kumar (IO-MH-402)</strong>
                          <span>Designated Officer · FSSAI / MIDC Scrutiny Cell</span>
                        </div>
                        <span className="badge badge-orange">Query Open</span>
                      </div>

                      <div className="ref-query-quote">
                        "Please provide the detailed Process Flow Diagram reflecting cold-room temperature zoning (-25°C to +10°C) as declared in profile."
                      </div>

                      <div className="ref-query-inspect-row">
                        <div className="ref-insp-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#0f172a' }}>Site Inspection Scheduled</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>Date: 05 Sep 2026 at 11:00 AM • MIDC Chakan Facility</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
