import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/lib/store';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { lazyWithRetry } from '@/lib/lazy-with-retry';
import { RouteErrorBoundary } from '@/components/ui/RouteErrorBoundary';

// Code-split pages with resilient retry mechanism and unified lowercase paths
const LandingPage = lazyWithRetry(() => import('@/pages/LandingPage'), 'landing');
const DashboardPage = lazyWithRetry(() => import('@/pages/entrepreneur/DashboardPage'), 'dashboard');
const BusinessProfilePage = lazyWithRetry(() => import('@/pages/entrepreneur/BusinessProfilePage'), 'profile');
const IntelligencePage = lazyWithRetry(() => import('@/pages/entrepreneur/IntelligencePage'), 'intelligence');
const RoadmapPage = lazyWithRetry(() => import('@/pages/entrepreneur/RoadmapPage'), 'roadmap');
const ApplicationPage = lazyWithRetry(() => import('@/pages/entrepreneur/ApplicationPage'), 'application');
const VaultPage = lazyWithRetry(() => import('@/pages/entrepreneur/VaultPage'), 'vault');
const QueryPage = lazyWithRetry(() => import('@/pages/entrepreneur/QueryPage'), 'query');
const IncentivesPage = lazyWithRetry(() => import('@/pages/entrepreneur/IncentivesPage'), 'incentives');
const GovDashboardPage = lazyWithRetry(() => import('@/pages/government/GovDashboardPage'), 'gov-dashboard');
const ApplicationsPage = lazyWithRetry(() => import('@/pages/government/ApplicationsPage'), 'gov-applications');
const ApplicationDetailPage = lazyWithRetry(() => import('@/pages/government/ApplicationDetailPage'), 'gov-app-detail');
const AnalyticsPage = lazyWithRetry(() => import('@/pages/government/AnalyticsPage'), 'gov-analytics');

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '340px', color: '#64748b' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500 }}>
        <div
          style={{
            width: '18px',
            height: '18px',
            border: '2.5px solid #cbd5e1',
            borderTopColor: '#f97316',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
        <span>Loading workspace module...</span>
      </div>
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container" style={{ flexDirection: 'column' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 85px)' }}>
        <Sidebar />
        <main className="main-content">
          <RouteErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              {children}
            </Suspense>
          </RouteErrorBoundary>
        </main>
      </div>
    </div>
  );
}

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteErrorBoundary fallbackTitle="Unable to load landing page">
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </RouteErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Standalone Landing Page */}
          <Route
            path="/"
            element={
              <LandingLayout>
                <LandingPage />
              </LandingLayout>
            }
          />

          {/* Internal Entrepreneur Routes */}
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            }
          />
          <Route
            path="/business-profile"
            element={
              <AppLayout>
                <BusinessProfilePage />
              </AppLayout>
            }
          />
          <Route
            path="/intelligence"
            element={
              <AppLayout>
                <IntelligencePage />
              </AppLayout>
            }
          />
          <Route
            path="/roadmap"
            element={
              <AppLayout>
                <RoadmapPage />
              </AppLayout>
            }
          />
          <Route
            path="/application/:id"
            element={
              <AppLayout>
                <ApplicationPage />
              </AppLayout>
            }
          />
          <Route
            path="/vault"
            element={
              <AppLayout>
                <VaultPage />
              </AppLayout>
            }
          />
          <Route
            path="/query/:id"
            element={
              <AppLayout>
                <QueryPage />
              </AppLayout>
            }
          />
          <Route
            path="/incentives"
            element={
              <AppLayout>
                <IncentivesPage />
              </AppLayout>
            }
          />

          {/* Internal Government Officer Routes */}
          <Route
            path="/government/dashboard"
            element={
              <AppLayout>
                <GovDashboardPage />
              </AppLayout>
            }
          />
          <Route
            path="/government/applications"
            element={
              <AppLayout>
                <ApplicationsPage />
              </AppLayout>
            }
          />
          <Route
            path="/government/applications/:id"
            element={
              <AppLayout>
                <ApplicationDetailPage />
              </AppLayout>
            }
          />
          <Route
            path="/government/analytics"
            element={
              <AppLayout>
                <AnalyticsPage />
              </AppLayout>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <LandingLayout>
                <LandingPage />
              </LandingLayout>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
