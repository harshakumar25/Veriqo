import React from 'react';
import {
  ShieldCheck,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  GitBranch,
  Info,
} from 'lucide-react';
import type {
  DocumentEvaluation,
  IssueCategory,
  OverallStatus,
  ValidationIssue,
  PrevalidationResult,
} from '@/lib/prevalidation';

export interface PrevalidationDiagnosticsSectionProps {
  result: PrevalidationResult;
  isPreValidating: boolean;
  isSubmitted: boolean;
  validationRun: boolean;
  onRunPreValidation: () => void;
}

const VERDICT_META: Record<OverallStatus, { label: string; fg: string; bg: string; border: string }> = {
  READY_TO_SUBMIT: { label: 'APPLICATION READY TO SUBMIT', fg: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
  BLOCKED: { label: 'SUBMISSION BLOCKED', fg: '#b91c1c', bg: '#fef2f2', border: '#fecaca' },
  REVIEW_REQUIRED: { label: 'MANUAL REVIEW REQUIRED', fg: '#b45309', bg: '#fffbeb', border: '#fde68a' },
  PARTIALLY_VALID: { label: 'PARTIALLY VALID — WARNINGS UNRESOLVED', fg: '#b45309', bg: '#fffbeb', border: '#fde68a' },
};

const CHECK_COUNT_PILLS: { key: IssueCategory; label: string }[] = [
  { key: 'REQUIRED_FIELD', label: 'Required fields' },
  { key: 'REQUIRED_DOCUMENT', label: 'Documents' },
  { key: 'DECLARATION', label: 'Declaration' },
  { key: 'CONSISTENCY', label: 'Consistency' },
];

const severityTagStyle = (severity: ValidationIssue['severity']): React.CSSProperties => {
  const palette: Record<ValidationIssue['severity'], { fg: string; bg: string; border: string }> = {
    BLOCKING: { fg: '#b91c1c', bg: '#fef2f2', border: '#fecaca' },
    REVIEW_REQUIRED: { fg: '#b45309', bg: '#fffbeb', border: '#fde68a' },
    WARNING: { fg: '#a16207', bg: '#fefce8', border: '#fef08a' },
    INFO: { fg: '#475569', bg: '#f1f5f9', border: '#e2e8f0' },
  };
  const c = palette[severity];
  return {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.02em',
    padding: '2px 8px',
    borderRadius: '999px',
    color: c.fg,
    background: c.bg,
    border: `1px solid ${c.border}`,
    whiteSpace: 'nowrap',
  };
};

const IssueGroup: React.FC<{ title: string; issues: ValidationIssue[] }> = ({ title, issues }) => (
  <div style={{ marginBottom: '16px' }}>
    <div
      style={{
        fontSize: '12px',
        fontWeight: 700,
        color: '#334155',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
      }}
    >
      {title}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {issues.map((issue) => (
        <div
          key={issue.id}
          style={{
            padding: '12px 14px',
            borderRadius: '6px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{issue.title}</span>
            <span style={severityTagStyle(issue.severity)}>{issue.severity}</span>
          </div>
          <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>{issue.why}</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
            <strong>Requirement:</strong> {issue.requirement}
          </div>
          <div style={{ fontSize: '11px', color: '#15803d', marginTop: '4px' }}>
            <strong>Fix:</strong> {issue.howToFix}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const PrevalidationDiagnosticsSection: React.FC<PrevalidationDiagnosticsSectionProps> = ({
  result,
  isPreValidating,
  isSubmitted,
  validationRun,
  onRunPreValidation,
}) => {
  const {
    overallStatus,
    blockingIssues,
    reviewItems,
    warnings,
    discrepancyMatrix,
    documentEvaluations,
    dagImpact,
    recovery,
    summary,
    notes,
  } = result;

  const verdict = VERDICT_META[overallStatus];

  return (
    <div
      className="card"
      style={{
        borderLeft: `4px solid ${validationRun ? verdict.fg : '#1d4ed8'}`,
        background: validationRun ? verdict.bg : '#ffffff',
      }}
    >
      <div className="card-header">
        <div>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#1d4ed8" /> 6. Deep Pre-Submission Validation
          </div>
          <div className="card-subtitle">
            Three-level, DAG-aware engine — structural checks, cross-record consistency, and workflow/policy readiness
          </div>
        </div>

        <button
          type="button"
          onClick={onRunPreValidation}
          disabled={isPreValidating || isSubmitted}
          className="btn btn-secondary btn-sm"
        >
          {isPreValidating ? (
            <>
              <Clock size={14} className="spin" /> Running deep validation...
            </>
          ) : (
            <>
              <RotateCcw size={14} /> Run Pre-Submission Check
            </>
          )}
        </button>
      </div>

      {/* Compact check-count strip */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        {CHECK_COUNT_PILLS.map(({ key, label }) => {
          const c = summary.checkCounts[key];
          if (!c) return null;
          const ok = c.passed >= c.total;
          return (
            <span
              key={key}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '999px',
                color: ok ? '#15803d' : '#b45309',
                background: ok ? '#f0fdf4' : '#fffbeb',
                border: `1px solid ${ok ? '#bbf7d0' : '#fde68a'}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {ok ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
              {label}: {c.passed}/{c.total}
            </span>
          );
        })}
      </div>

      {/* Document evaluations */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#334155',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}
        >
          Document evidence ({documentEvaluations.filter((d) => d.acceptable).length}/{documentEvaluations.length} accepted)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {documentEvaluations.map((doc: DocumentEvaluation) => (
            <div
              key={doc.docCode}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '6px',
                background: doc.acceptable ? '#f8fafc' : '#fef2f2',
                border: `1px solid ${doc.acceptable ? '#e2e8f0' : '#fecaca'}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {doc.acceptable ? (
                  <CheckCircle2 size={16} color="#15803d" />
                ) : (
                  <XCircle size={16} color="#b91c1c" />
                )}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: doc.acceptable ? '#0f172a' : '#991b1b' }}>
                    {doc.docName}
                  </div>
                  {doc.reasons.length > 0 && (
                    <div style={{ fontSize: '11px', color: doc.acceptable ? '#64748b' : '#b91c1c' }}>
                      {doc.reasons.join(' ')}
                    </div>
                  )}
                </div>
              </div>
              <span style={severityTagStyle(doc.acceptable ? 'INFO' : 'BLOCKING')}>
                {doc.state}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Blocking issues */}
      {blockingIssues.length > 0 && (
        <IssueGroup title={`Blocking issues (${blockingIssues.length})`} issues={blockingIssues} />
      )}

      {/* Manual-review items */}
      {reviewItems.length > 0 && (
        <IssueGroup title={`Manual review required (${reviewItems.length})`} issues={reviewItems} />
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <IssueGroup title={`Warnings (${warnings.length})`} issues={warnings} />
      )}

      {/* Cross-record discrepancy matrix */}
      {discrepancyMatrix.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#334155',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Cross-record discrepancies ({discrepancyMatrix.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {discrepancyMatrix.map((row) => (
              <div
                key={row.id}
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>{row.attribute}</span>
                  <span style={severityTagStyle(row.severity)}>{row.mismatchType.replace(/_/g, ' ')}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  {row.recordA.label}: <strong>{row.valueA || '—'}</strong> vs {row.recordB.label}: <strong>{row.valueB || '—'}</strong>
                </div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '3px' }}>{row.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approval-graph impact */}
      <div
        style={{
          padding: '12px 14px',
          borderRadius: '6px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <GitBranch size={15} color="#1d4ed8" />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Approval graph impact
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>{dagImpact.explanation}</div>
        {dagImpact.blockedNodes.length > 0 && (
          <div style={{ fontSize: '11px', color: '#b91c1c', marginTop: '4px' }}>
            Blocked: {dagImpact.blockedNodes.join(', ')}
          </div>
        )}
        {dagImpact.lockedNodes.length > 0 && (
          <div style={{ fontSize: '11px', color: '#a16207', marginTop: '2px' }}>
            Locked downstream: {dagImpact.lockedNodes.join(', ')}
          </div>
        )}
        {dagImpact.criticalPath.length > 0 && (
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
            Critical path: {dagImpact.criticalPath.join(' → ')}{' '}
            <strong style={{ color: dagImpact.affectsCriticalPath ? '#b91c1c' : '#15803d' }}>
              [{dagImpact.affectsCriticalPath ? 'IMPACTED' : 'intact'}]
            </strong>
          </div>
        )}
      </div>

      {/* Recovery plan */}
      {recovery.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#334155',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Recovery plan
          </div>
          <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {recovery.map((step) => (
              <li key={step.issueId} style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5 }}>
                {step.action}
                {step.requiresRevalidation && (
                  <span style={{ color: '#64748b' }}> (re-validation required after fixing)</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {notes.map((note, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#64748b' }}>
              <Info size={12} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>{note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
