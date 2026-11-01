import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class RouteErrorBoundary extends React.Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Veriqo Route Error]', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '48px 24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            width: '100%',
          }}
        >
          <div
            style={{
              maxWidth: '540px',
              width: '100%',
              background: '#ffffff',
              border: '1px solid #fee2e2',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#fef2f2',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <AlertCircle size={26} />
            </div>

            <h2
              style={{
                fontSize: '18px',
                fontWeight: 750,
                color: '#0f172a',
                marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}
            >
              {this.props.fallbackTitle || 'Unable to load workspace module'}
            </h2>

            <p
              style={{
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: '#64748b',
                marginBottom: '20px',
              }}
            >
              A transient network or module update occurred while preparing this view.
              You can retry loading or return to the main dashboard.
            </p>

            {this.state.error && (
              <div
                style={{
                  fontSize: '11.5px',
                  fontFamily: 'monospace',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: '#475569',
                  textAlign: 'left',
                  marginBottom: '24px',
                  maxHeight: '100px',
                  overflowY: 'auto',
                  wordBreak: 'break-all',
                }}
              >
                {this.state.error.message}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={this.handleRetry}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                }}
              >
                <RefreshCw size={14} />
                <span>Retry Loading</span>
              </button>

              <Link
                to="/dashboard"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  background: '#f8fafc',
                  color: '#0f172a',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <Home size={14} />
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

