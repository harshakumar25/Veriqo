import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/use-app-store';
import './Footer.css';

export default function Footer({ onOpenAuth }) {
  const navigate = useNavigate();
  const { setPersona } = useAppStore();

  const handleOfficerLogin = (e) => {
    e.preventDefault();
    if (onOpenAuth) {
      onOpenAuth('OFFICER');
    } else {
      setPersona('persona_officer');
      navigate('/government/dashboard');
    }
  };

  const handleEntrepreneurAction = (path, e) => {
    e.preventDefault();
    setPersona('persona_entrepreneur');
    navigate(path);
  };

  const handleGovAction = (path, e) => {
    e.preventDefault();
    setPersona('persona_officer');
    navigate(path);
  };

  return (
    <footer className="ref-footer">
      <div className="ref-footer-container">
        <div className="ref-footer-grid">
          {/* Brand Identity */}
          <div className="ref-footer-brand-col">
            <div className="ref-footer-brand-logo">
              <div className="ref-footer-emblem" aria-hidden="true">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                  <circle cx="18" cy="18" r="14" stroke="#f59e0b" strokeWidth="1.8" />
                  <circle cx="18" cy="18" r="3.2" fill="#f59e0b" />
                  {Array.from({ length: 24 }, (_, i) => {
                    const angle = (i * 15 - 90) * (Math.PI / 180);
                    return (
                      <line
                        key={i}
                        x1={18 + 3.4 * Math.cos(angle)}
                        y1={18 + 3.4 * Math.sin(angle)}
                        x2={18 + 12.0 * Math.cos(angle)}
                        y2={18 + 12.0 * Math.sin(angle)}
                        stroke="#f59e0b"
                        strokeWidth="1.1"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="ref-footer-brand-text">
                <span className="ref-footer-brand-name">
                  Veriq<span className="ref-brand-accent">o</span>
                </span>
                <span className="ref-footer-gov-label">GOVERNMENT OF MAHARASHTRA</span>
              </div>
            </div>

            <p className="ref-footer-desc">
              Intelligent Approval &amp; Compliance Management Platform for Maharashtra businesses.
              One profile. Every approval. No more fragmented visits.
            </p>

            <div className="ref-footer-pills">
              <span className="ref-footer-pill">Smart India Hackathon</span>
              <span className="ref-footer-pill">Problem #26130</span>
              <span className="ref-footer-pill">Maharashtra Prototype</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="ref-footer-links-col">
            <h4 className="ref-footer-col-title">Platform</h4>
            <div className="ref-footer-links">
              <a href="#how-it-works">How It Works</a>
              <a href="#features">Features</a>
              <a href="#sectors">Sector Coverage</a>
              <a href="#about">About Prototype</a>
            </div>
          </div>

          {/* Entrepreneurs Column */}
          <div className="ref-footer-links-col">
            <h4 className="ref-footer-col-title">Entrepreneurs</h4>
            <div className="ref-footer-links">
              <span onClick={(e) => handleEntrepreneurAction('/business-profile', e)}>Create Business Profile</span>
              <span onClick={(e) => handleEntrepreneurAction('/dashboard', e)}>Entrepreneur Dashboard</span>
              <span onClick={(e) => handleEntrepreneurAction('/roadmap', e)}>Personalized Roadmap</span>
              <span onClick={(e) => handleEntrepreneurAction('/vault', e)}>Document Vault</span>
            </div>
          </div>

          {/* Government Column */}
          <div className="ref-footer-links-col">
            <h4 className="ref-footer-col-title">Government</h4>
            <div className="ref-footer-links">
              <span onClick={handleOfficerLogin}>Officer Login</span>
              <span onClick={(e) => handleGovAction('/government/applications', e)}>Application Scrutiny</span>
              <span onClick={(e) => handleGovAction('/government/analytics', e)}>Analytics &amp; SLA Alerts</span>
              <span onClick={(e) => handleGovAction('/government/dashboard', e)}>Single Window Portal</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="ref-footer-bottom">
          <div className="ref-footer-bottom-left">
            <span className="ref-footer-copy">
              © 2026 Veriqo · Government of Maharashtra Single Window Prototype
            </span>
            <span className="ref-footer-disclaimer">
              Built for Smart India Hackathon 2026 (Problem Statement 26130).
            </span>
          </div>
          <div className="ref-footer-live">
            <span className="ref-live-pulse-dot" />
            <span>Operational · Live Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
