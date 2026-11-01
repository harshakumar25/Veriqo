import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// ─── Top-Level Application Error Boundary ───────────────────────────────────────
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleReset = () => {
    localStorage.removeItem('veriqo_state_v1');
    localStorage.removeItem('buildx_sih_state_v1');
    sessionStorage.clear();
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: '#07162b',
            color: '#ffffff',
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              background: '#0b2140',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '36px',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '9999px',
                fontSize: '11px',
                color: '#f87171',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '14px',
              }}
            >
              VERIQO SYSTEM NOTICE
            </div>

            <h1
              style={{
                fontSize: '20px',
                fontWeight: 750,
                color: '#ffffff',
                marginBottom: '10px',
                letterSpacing: '-0.02em',
              }}
            >
              Application encountered a runtime exception
            </h1>

            <p
              style={{
                fontSize: '13.5px',
                lineHeight: 1.6,
                color: '#94a3b8',
                marginBottom: '18px',
              }}
            >
              A client error interrupted the current view. You can reload the page, or reset cached demonstration state to restore verified defaults.
            </p>

            <pre
              style={{
                fontSize: '11.5px',
                background: '#07162b',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '12px 14px',
                overflowX: 'auto',
                color: '#fca5a5',
                marginBottom: '24px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                maxHeight: '140px',
              }}
            >
              {this.state.error?.message}
            </pre>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '10px 22px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  boxShadow: '0 4px 14px rgba(249, 115, 22, 0.35)',
                }}
              >
                Reload Page
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '9999px',
                  padding: '10px 20px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: '13.5px',
                }}
              >
                Reset Demo State
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
// ─────────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
