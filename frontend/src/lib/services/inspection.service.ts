/**
 * Inspection Service — Single Responsibility Principle (SRP).
 * CRUD for the `inspections` Supabase table.
 */

import type { InspectionRecord, InspectionChecklistItem } from '../types';
import { supabase, isSupabaseConfigured } from '../supabase';

function mapRowToInspection(row: Record<string, unknown>): InspectionRecord {
  return {
    id: row.id as string,
    applicationId: row.application_id as string,
    officerName: row.officer_name as string,
    scheduledDate: row.scheduled_date as string,
    scheduledTime: row.scheduled_time as string,
    location: row.location as string,
    status: row.status as InspectionRecord['status'],
    outcome: row.outcome as InspectionRecord['outcome'],
    remarks: row.remarks as string | undefined,
    checklist: (row.checklist as InspectionChecklistItem[] | null) ?? undefined,
    completedAt: row.completed_at as string | undefined,
    createdAt: row.created_at as string,
  };
}

export const InspectionService = {
  async getByApplicationId(applicationId: string): Promise<InspectionRecord | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from('inspections')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.warn('[InspectionService] getByApplicationId failed:', error.message);
      return null;
    }
    return data ? mapRowToInspection(data as Record<string, unknown>) : null;
  },

  async insert(insp: InspectionRecord): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('inspections').insert({
      id: insp.id,
      application_id: insp.applicationId,
      officer_name: insp.officerName,
      scheduled_date: insp.scheduledDate,
      scheduled_time: insp.scheduledTime,
      location: insp.location,
      status: insp.status,
      outcome: insp.outcome,
    });
    if (error) {
      console.warn('[InspectionService] insert failed:', error.message);
      return false;
    }
    return true;
  },

  async complete(
    id: string,
    outcome: 'SATISFACTORY' | 'UNSATISFACTORY' | 'FOLLOW_UP_REQUIRED',
    remarks: string,
    checklist?: InspectionChecklistItem[],
    completedAt?: string,
  ): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('inspections').update({
      status: 'COMPLETED',
      outcome,
      remarks,
      checklist: checklist ?? null,
      completed_at: completedAt ?? new Date().toISOString(),
    }).eq('id', id);
    if (error) {
      console.warn('[InspectionService] complete failed:', error.message);
      return false;
    }
    return true;
  },
};
