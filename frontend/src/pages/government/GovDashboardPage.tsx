import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/lib/use-app-store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  Inbox,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  RefreshCw,
  Calendar,
} from 'lucide-react';
import './GovDashboardPage.css';

export default function GovernmentDashboardPage() {
  const {
    application,
    currentPersona,
    inspection,
    queries,
    business,
    events,
    approveApplication,
    addQuery,
    scheduleInspection,
    completeInspection,
    resetDemoData,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'QUERY' | 'INSPECTION' | 'APPROVED'>('ALL');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSimulateQuery = () => {
    addQuery(
      'Process Flow & Ammonia Circuit Clarification',
      'Please furnish a revised Cold Chain Process Flow Diagram clearly annotating the primary ammonia refrigeration loop, safety pressure release valves, and automated temperature logging points for cold chambers 1 through 4.'
    );
    showToast('Simulated: Clarification query raised to applicant');
  };

  const handleSimulateInspection = () => {
    scheduleInspection('2026-09-06', '11:00 AM', 'Plot No. E-45, MIDC Chakan Phase II, Pune');
    showToast('Simulated: Field inspection scheduled for 06-Sep-2026');
  };

  const handleSimulatePassInspection = () => {
    completeInspection('SATISFACTORY', 'Cold chain refrigeration system, ammonia sensors, and dedicated fire water reservoir verified on site. All statutory safety norms met.');
    showToast('Simulated: Field inspection recorded as SATISFACTORY');
  };

  const handleSimulateApprove = () => {
    approveApplication('APR-MH-2026-00124');
    showToast('Simulated: Statutory FSSAI Clearance Approved (Ref: APR-MH-2026-00124)');
  };

  const hasOpenQuery = queries.some((q) => q.status === 'OPEN' || q.status === 'RAISED');
  const isApproved = application.status === 'APPROVED';

  return (
    <div className="page-body gov-dash-container">
      {/* ── Officer Context & Authority Header ── */}
      <div className="gov-dash-header">
        <div className="gov-dash-header-left">
          <div className="gov-dash-badges-row">
            <span className="badge badge-amber">DEMONSTRATION WORKFLOW</span>
            <span className="badge badge-green">SCRUTINY CELL (PUNE REGION)</span>
            <span className="badge badge-blue">OFFICER: {currentPersona.name}</span>
          </div>
          <h1 className="gov-dash-title">
            Single-Window Scrutiny & Approval Desk
          </h1>
          <p className="gov-dash-subtitle">
            Manage assigned industrial applications, review automated document pre-validations, coordinate site verifications, and record statutory outcomes for Maharashtra Single Window.
          </p>
        </div>

        <div className="gov-dash-header-actions">
          <Link to="/government/analytics" className="btn btn-secondary">
            Process Analytics
          </Link>
          <Link to={`/government/applications/${application.id}`} className="btn btn-primary">
            Open Active Dossier <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── Fast-Track Officer Simulation Bar for Hackathon Demonstrations ── */}
      <div className="gov-demo-toolbar">
        <div className="gov-demo-toolbar-left">
          <Sparkles size={16} color="#d97706" />
          <span className="gov-demo-label">Officer Demonstration Simulation:</span>
        </div>

        <div className="gov-demo-actions-row">
          <button
            onClick={handleSimulateQuery}
            className="btn btn-secondary btn-sm"
            type="button"
          >
            1. Raise Clarification Query
          </button>
          <button
            onClick={handleSimulateInspection}
            className="btn btn-secondary btn-sm"
            type="button"
          >
            2. Schedule Inspection
          </button>
          <button
            onClick={handleSimulatePassInspection}
            className="btn btn-secondary btn-sm"
            type="button"
          >
            3. Sign Inspection (Satisfactory)
          </button>
          <button
            onClick={handleSimulateApprove}
            className="btn btn-primary btn-sm"
            style={{ background: '#15803d' }}
            type="button"
          >
            4. Issue Final Approval
          </button>
          <button
            onClick={() => {
              resetDemoData('DRAFT');
              showToast('Demo state reset to DRAFT');
            }}
            className="btn btn-secondary btn-sm"
            title="Reset to clean initial state"
            type="button"
          >
            <RefreshCw size={12} />
            Reset
          </button>
        </div>
      </div>

      {toastMsg && (
        <div style={{ padding: '10px 16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', color: '#1e40af', fontSize: '12.5px', fontWeight: '600' }}>
          ✓ {toastMsg}
        </div>
      )}

      {/* ── Officer Scrutiny KPIs ── */}
      <div className="gov-kpi-grid">
        <div className="gov-kpi-card">
          <div className="gov-kpi-icon-wrap blue">
            <Inbox size={20} />
          </div>
          <div className="gov-kpi-content">
            <span className="gov-kpi-val">1</span>
            <span className="gov-kpi-lbl">Assigned Queue</span>
            <span className="gov-kpi-sub">FreshChain Cold Logistics</span>
          </div>
        </div>

        <div className="gov-kpi-card">
          <div className="gov-kpi-icon-wrap amber">
            <AlertTriangle size={20} />
          </div>
          <div className="gov-kpi-content">
            <span className="gov-kpi-val" style={{ color: hasOpenQuery ? '#d97706' : '#0f172a' }}>
              {hasOpenQuery ? '1' : '0'}
            </span>
            <span className="gov-kpi-lbl">Pending Queries</span>
            <span className="gov-kpi-sub">{hasOpenQuery ? 'Awaiting applicant' : 'All queries resolved'}</span>
          </div>
        </div>

        <div className="gov-kpi-card">
          <div className="gov-kpi-icon-wrap slate">
            <Clock size={20} />
          </div>
          <div className="gov-kpi-content">
            <span className="gov-kpi-val" style={{ fontSize: '18px' }}>
              {inspection?.status === 'COMPLETED' ? 'Completed' : '06-Sep'}
            </span>
            <span className="gov-kpi-lbl">Site Verification</span>
            <span className="gov-kpi-sub">MIDC Chakan Phase II</span>
          </div>
        </div>

        <div className="gov-kpi-card">
          <div className="gov-kpi-icon-wrap green">
            <CheckCircle2 size={20} />
          </div>
          <div className="gov-kpi-content">
            <span className="gov-kpi-val">100%</span>
            <span className="gov-kpi-lbl">SLA Compliance</span>
            <span className="gov-kpi-sub">Target 30-day window</span>
          </div>
        </div>
      </div>

      {/* ── Main Scrutiny Queue Table ── */}
      <div className="gov-table-card">
        <div className="gov-table-header">
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
              Assigned Industrial Application Scrutiny Queue
            </div>
            <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
              Showing applications assigned to your desk under Maharashtra Food Safety Scrutiny Unit
            </div>
          </div>

          <div className="gov-table-tabs">
            <button
              className={`gov-tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveTab('ALL')}
            >
              All (1)
            </button>
            <button
              className={`gov-tab-btn ${activeTab === 'PENDING' ? 'active' : ''}`}
              onClick={() => setActiveTab('PENDING')}
            >
              Under Scrutiny
            </button>
            <button
              className={`gov-tab-btn ${activeTab === 'QUERY' ? 'active' : ''}`}
              onClick={() => setActiveTab('QUERY')}
            >
              Queries ({hasOpenQuery ? '1' : '0'})
            </button>
            <button
              className={`gov-tab-btn ${activeTab === 'APPROVED' ? 'active' : ''}`}
              onClick={() => setActiveTab('APPROVED')}
            >
              Approved ({isApproved ? '1' : '0'})
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="gov-queue-table">
            <thead>
              <tr>
                <th>Application No.</th>
                <th>Enterprise / Unit</th>
                <th>Approval Type</th>
                <th>Location</th>
                <th>Risk & Pre-val</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span style={{ fontWeight: '700', color: '#1d4ed8' }}>
                    {application.appNumber}
                  </span>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                    Submitted 02-Sep-2026
                  </div>
                </td>
                <td>
                  <div className="gov-applicant-title">{business.name}</div>
                  <div className="gov-applicant-sub">
                    {business.subSector} • {business.storageCapacityMt?.toLocaleString()} MT
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: '600', color: '#334155' }}>
                    {application.approvalName}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Authority: {application.authorityName}
                  </div>
                </td>
                <td>
                  <div style={{ color: '#0f172a', fontWeight: '500' }}>
                    {business.industrialArea}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Plot: {business.plotNumber}, {business.district}
                  </div>
                </td>
                <td>
                  <span className="gov-risk-pill">
                    <ShieldCheck size={12} /> Low Risk (92%)
                  </span>
                  <div style={{ fontSize: '10.5px', color: '#15803d', marginTop: '3px' }}>
                    Pre-validation Passed
                  </div>
                </td>
                <td>
                  <StatusBadge status={application.status} />
                </td>
                <td>
                  <Link
                    to={`/government/applications/${application.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Scrutinize <ArrowRight size={12} />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom Section: Inspection Schedule & Live Audit Trail ── */}
      <div className="gov-bottom-grid">
        {/* Physical Inspection Desk Card */}
        <div className="gov-sub-card">
          <div className="gov-sub-card-header">
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                Field Verification & Site Inspection Desk
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                Physical inspection schedule for cold storage facility
              </div>
            </div>
            <span className={`badge ${inspection?.outcome === 'SATISFACTORY' ? 'badge-green' : 'badge-amber'}`}>
              {inspection?.outcome || 'SCHEDULED'}
            </span>
          </div>

          <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Target Site:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>
                <MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> Plot No. E-45, MIDC Chakan Phase II, Pune
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Inspection Window:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>
                <Calendar size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> {inspection?.scheduledDate || '06-Sep-2026'} at {inspection?.scheduledTime || '11:00 AM'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Assigned Officer:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{inspection?.officerName || 'S. K. Kulkarni'}</span>
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
              Statutory Verification Checklist:
            </div>
            <div className="gov-checklist-box">
              <div className="gov-checklist-item">
                <CheckCircle2 size={14} color="#15803d" />
                <span>Cold Chamber Temperature Data Loggers (-18°C / +4°C)</span>
              </div>
              <div className="gov-checklist-item">
                <CheckCircle2 size={14} color="#15803d" />
                <span>Ammonia Gas Leak Sensor & Automatic Alarm Circuit</span>
              </div>
              <div className="gov-checklist-item">
                <CheckCircle2 size={14} color="#15803d" />
                <span>100 kL Dedicated Fire Water Reservoir & Pump Station</span>
              </div>
              <div className="gov-checklist-item">
                <CheckCircle2 size={14} color="#15803d" />
                <span>Hygienic Loading Bay Ante-Room & Air Curtains</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Scrutiny Audit Log */}
        <div className="gov-sub-card">
          <div className="gov-sub-card-header">
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                Departmental Scrutiny Trail
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                Real-time chronological log of statutory scrutiny events
              </div>
            </div>
            <span className="badge badge-neutral">{events.length} LOGGED</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {events.slice(0, 4).map((evt) => (
              <div
                key={evt.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '9px 12px',
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: evt.actorRole === 'GOVERNMENT' ? '#f0fdf4' : '#eff6ff',
                    color: evt.actorRole === 'GOVERNMENT' ? '#15803d' : '#1d4ed8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '700',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {evt.actorRole === 'GOVERNMENT' ? 'IO' : 'EM'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{evt.title}</span>
                    <span style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                      {evt.createdAt ? evt.createdAt.slice(0, 10) : ''}
                    </span>
                  </div>
                  {evt.description && (
                    <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '2px', lineHeight: '1.4' }}>
                      {evt.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
