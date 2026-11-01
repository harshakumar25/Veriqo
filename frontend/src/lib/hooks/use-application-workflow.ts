import { useContext } from 'react';
import { AppContext } from '../app-context';
import { Application, ApplicationEvent } from '../types';

export interface UseApplicationWorkflowReturn {
  application: Application;
  events: ApplicationEvent[];
  updateApplicationStatus: (status: Application['status'], reason?: string) => void;
  updateApplicationFormData: (data: Record<string, unknown>) => void;
  submitApplication: () => void;
  approveApplication: (referenceNumber?: string) => void;
  rejectApplication: (reason: string) => void;
  isSubmitted: boolean;
  isApproved: boolean;
  isRejected: boolean;
  isDraft: boolean;
}

export function useApplicationWorkflow(): UseApplicationWorkflowReturn {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApplicationWorkflow must be used within an AppProvider');

  const { application } = ctx;

  return {
    application,
    events: ctx.events,
    updateApplicationStatus: ctx.updateApplicationStatus,
    updateApplicationFormData: ctx.updateApplicationFormData,
    submitApplication: ctx.submitApplication,
    approveApplication: ctx.approveApplication,
    rejectApplication: ctx.rejectApplication,
    isSubmitted: application.status !== 'DRAFT',
    isApproved: application.status === 'APPROVED',
    isRejected: application.status === 'REJECTED',
    isDraft: application.status === 'DRAFT',
  };
}

