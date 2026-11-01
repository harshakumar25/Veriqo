import React, { useState } from 'react';
import { TiltCard } from '@/components/motion/TiltCard';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    title: 'Build Your Profile',
    desc: 'Provide your business, project, activity and Maharashtra location details.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    theme: 'orange',
    actionNote: 'Configures sector-specific regulatory rules based on location, area, and capital parameters.',
  },
  {
    num: '02',
    title: 'Review Requirements',
    desc: 'Configured rules identify relevant, conditional and stage-based requirements.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    theme: 'blue',
    actionNote: 'Eliminates redundant clearances and flags required prior NOCs automatically.',
  },
  {
    num: '03',
    title: 'Follow Your Roadmap',
    desc: 'See the responsible authority, required documents, sequence and next action.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    theme: 'cyan',
    actionNote: 'Visual DAG dependency graph orders approvals so prerequisite steps are submitted in sequence.',
  },
  {
    num: '04',
    title: 'Pre-validate & Submit',
    desc: 'Check required fields, documents and declarations before sending the application.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
    theme: 'purple',
    actionNote: '3-tier deterministic pre-validation catches missing files and parameter discrepancies prior to filing.',
  },
  {
    num: '05',
    title: 'Track & Respond',
    desc: 'View workflow updates, answer queries, prepare for inspections and see the decision.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    theme: 'green',
    actionNote: 'Real-time query manager and site inspection scheduler keep all stakeholders synchronized.',
  },
];

const deptSteps = [
  {
    step: 'STEP A',
    title: 'Review Application',
    desc: 'Officer receives and reviews documents, business info and pre-validation results in a unified dashboard.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    step: 'STEP B',
    title: 'Query & Inspect',
    desc: 'Raise queries, review entrepreneur responses, schedule and complete physical site inspections.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    step: 'STEP C',
    title: 'Decide & Notify',
    desc: 'Approve or reject. Entrepreneur is notified instantly. Roadmap and compliance status auto-updates.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = steps[activeStepIndex];
  const progressPercent = ((activeStepIndex) / (steps.length - 1)) * 100;

  return (
    <section className="ref-hiw-section" id="how-it-works">
      <div className="ref-hiw-container">
        {/* ── Section Header ── */}
        <div className="ref-hiw-header">
          <div className="ref-hiw-eyebrow">
            <span className="ref-hiw-dash">—</span>
            <span>HOW IT WORKS</span>
            <span className="ref-hiw-dash">—</span>
          </div>
          <h2 className="ref-hiw-title">From Profile to Approval in 5 Steps</h2>
          <p className="ref-hiw-subtitle">
            A clear, connected process for preparing an application and following it
            through departmental review.
          </p>
        </div>

        {/* ── 5 Step Horizontal Flow Cards with Active Progress ── */}
        <div className="ref-hiw-steps-track">
          <div className="ref-hiw-connecting-line" aria-hidden="true">
            <div
              className="ref-hiw-connecting-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="ref-hiw-steps-grid">
            {steps.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <TiltCard
                  key={step.num}
                  maxTilt={3}
                  className={`ref-hiw-step-card ${isActive ? 'is-active-step' : ''}`}
                  onClick={() => setActiveStepIndex(idx)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="ref-step-card-top">
                    <div className={`ref-step-icon-wrap theme-${step.theme}`}>
                      {step.icon}
                    </div>
                    <span className="ref-step-num-badge">{step.num}</span>
                  </div>
                  <h3 className="ref-step-title">{step.title}</h3>
                  <p className="ref-step-desc">{step.desc}</p>
                </TiltCard>
              );
            })}
          </div>

          {/* Interactive Context Panel for Selected Step */}
          <div className="ref-step-context-box">
            <div className="ref-context-tag">
              <span>Step {activeStep.num} Intelligence</span>
            </div>
            <div className="ref-context-body">
              <strong>{activeStep.title}:</strong> {activeStep.actionNote}
            </div>
          </div>
        </div>

        {/* ── Department Processing Subsection ── */}
        <div className="ref-dept-section">
          <div className="ref-dept-badge-row">
            <div className="ref-dept-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>DEPARTMENT PROCESSING WORKFLOW</span>
            </div>
          </div>

          <div className="ref-dept-grid">
            {deptSteps.map((ds) => (
              <div key={ds.step} className="ref-dept-card">
                <div className="ref-dept-icon-square">{ds.icon}</div>
                <div className="ref-dept-body">
                  <div className="ref-dept-step-tag">{ds.step}</div>
                  <h4 className="ref-dept-title">{ds.title}</h4>
                  <p className="ref-dept-desc">{ds.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
