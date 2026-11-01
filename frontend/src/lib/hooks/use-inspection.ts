import { useContext } from 'react';
import { AppContext } from '../app-context';
import { InspectionChecklistItem, InspectionRecord } from '../types';

export interface UseInspectionReturn {
  inspection: InspectionRecord | null;
  scheduleInspection: (date: string, time: string, location: string) => void;
  startInspection: () => void;
  completeInspection: (
    outcome: 'SATISFACTORY' | 'UNSATISFACTORY' | 'FOLLOW_UP_REQUIRED',
    remarks: string,
    checklist?: InspectionChecklistItem[],
  ) => void;
  isCompleted: boolean;
  isSatisfactory: boolean;
}

export function useInspection(): UseInspectionReturn {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useInspection must be used within an AppProvider');

  const { inspection } = ctx;

  return {
    inspection,
    scheduleInspection: ctx.scheduleInspection,
    startInspection: ctx.startInspection,
    completeInspection: ctx.completeInspection,
    isCompleted: inspection?.status === 'COMPLETED',
    isSatisfactory: inspection?.outcome === 'SATISFACTORY',
  };
}
