import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/use-app-store';
import { translations } from '@/lib/i18n';
import './Navbar.css';

export default function Navbar({ onOpenAuth, currentLang = 'en', onLanguageChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { setPersona } = useAppStore();

  const t = translations[currentLang]?.nav || translations.en.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (onOpenAuth) {
      onOpenAuth('ENTREPRENEUR');
    } else {
      setPersona('persona_entrepreneur');
      navigate('/dashboard');
    }
  };

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (onOpenAuth) {
      onOpenAuth('ENTREPRENEUR');
    } else {
      setPersona('persona_entrepreneur');
      navigate('/business-profile');
    }
  };

  const handleNavClick = (anchorId) => {
    setMobileOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = (lang) => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <header className={`ref-navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="ref-navbar" role="navigation" aria-label="Main Navigation">
        <div className="ref-navbar-container">
          {/* ── Brand / Identity (Left) ── */}
          <Link to="/" className="ref-brand" aria-label="Veriqo — Single Window Intelligence">
            {/* Ashoka Chakra gold emblem */}
            <div className="ref-emblem" aria-hidden="true">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="14" stroke="#f59e0b" strokeWidth="1.6" fill="rgba(245, 158, 11, 0.08)" />
                <circle cx="18" cy="18" r="12.2" stroke="#d97706" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
                <circle cx="18" cy="18" r="3.2" fill="#f59e0b" />
                <circle cx="18" cy="18" r="1.4" fill="#071426" />
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
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Veriqo + Prototype Attribution */}
            <div className="ref-identity">
              <span className="ref-brand-title">
                Veriq<span className="ref-brand-accent">o</span>
              </span>
              <span className="ref-brand-sub">MAHARASHTRA APPROVAL PROTOTYPE</span>
            </div>
          </Link>

          {/* ── Center Nav Links ── */}
          <div className="ref-nav-links">
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('how-it-works');
              }}
              className="ref-nav-link"
            >
              {t.howItWorks}
            </a>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('features');
              }}
              className="ref-nav-link"
            >
              {t.features}
            </a>
            <a
              href="#sectors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('sectors');
              }}
              className="ref-nav-link"
            >
              {t.sectors}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className="ref-nav-link"
            >
              {t.about}
            </a>
          </div>

          {/* ── Right Actions & Utilities ── */}
          <div className="ref-nav-actions">
            {/* Functional Language Switcher */}
            <div className="ref-lang-switcher" aria-label="Language selection">
              <button
                type="button"
                className={`ref-lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                onClick={() => toggleLanguage('en')}
                lang="en"
              >
                EN
              </button>
              <span className="ref-lang-divider">|</span>
              <button
                type="button"
                className={`ref-lang-btn ${currentLang === 'hi' ? 'active' : ''}`}
                onClick={() => toggleLanguage('hi')}
                lang="hi"
              >
                हिंदी
              </button>
              <span className="ref-lang-divider">|</span>
              <button
                type="button"
                className={`ref-lang-btn ${currentLang === 'mr' ? 'active' : ''}`}
                onClick={() => toggleLanguage('mr')}
                lang="mr"
              >
                मराठी
              </button>
            </div>

            {/* Prototype Active Badge (Truth in Advertising) */}
            <div className="ref-live-badge" title="Demonstration Prototype — Not official government portal">
              <span className="ref-live-pulse-dot" />
              <span className="ref-live-text">{t.modeBadge}</span>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              className="ref-btn-signin"
              id="nav-login-btn"
              type="button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>{t.signIn}</span>
            </button>

            {/* Get Started CTA Button */}
            <button
              onClick={handleGetStarted}
              className="ref-btn-getstarted"
              id="nav-register-btn"
              type="button"
            >
              <span>{t.getStarted}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`ref-hamburger ${mobileOpen ? 'is-active' : ''}`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
            >
              <span className="ref-hb-bar" />
              <span className="ref-hb-bar" />
              <span className="ref-hb-bar" />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Dropdown ── */}
        {mobileOpen && (
          <div className="ref-mobile-drawer">
            <div className="ref-mobile-links">
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('how-it-works');
                }}
                className="ref-mobile-link"
              >
                {t.howItWorks}
              </a>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('features');
                }}
                className="ref-mobile-link"
              >
                {t.features}
              </a>
              <a
                href="#sectors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('sectors');
                }}
                className="ref-mobile-link"
              >
                {t.sectors}
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
                className="ref-mobile-link"
              >
                {t.about}
              </a>
            </div>

            <div className="ref-mobile-actions">
              <button
                onClick={(e) => {
                  setMobileOpen(false);
                  handleSignIn(e);
                }}
                className="ref-btn-signin w-full"
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                {t.signIn}
              </button>
              <button
                onClick={(e) => {
                  setMobileOpen(false);
                  handleGetStarted(e);
                }}
                className="ref-btn-getstarted w-full"
                type="button"
              >
                {t.getStarted}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
