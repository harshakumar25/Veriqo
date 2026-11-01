/**
 * Application Service — Single Responsibility Principle (SRP).
 * Status machine and CRUD operations for the `applications` Supabase table.
 * Enforces valid status transitions — Open/Closed Principle (OCP) via transition map.
 */

import type { Application, ApplicationStatus } from '../types';
import { supabase, isSupabaseConfigured } from '../supabase';

/**
 * Valid status transitions — define extensions here, never in callers (OCP).
 */
const VALID_TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  DRAFT: ['READY_TO_SUBMIT', 'VALIDATION_ERROR'],
  VALIDATION_ERROR: ['DRAFT', 'READY_TO_SUBMIT'],
  READY_TO_SUBMIT: ['SUBMITTED', 'DRAFT'],
  SUBMITTED: ['ASSIGNED'],
  ASSIGNED: ['UNDER_REVIEW'],
  UNDER_REVIEW: ['QUERY_RAISED', 'INSPECTION_SCHEDULED', 'FINAL_REVIEW'],
  QUERY_RAISED: ['QUERY_RESPONDED'],
  QUERY_RESPONDED: ['UNDER_REVIEW', 'INSPECTION_SCHEDULED', 'FINAL_REVIEW'],
  INSPECTION_SCHEDULED: ['INSPECTION_COMPLETED'],
  INSPECTION_COMPLETED: ['FINAL_REVIEW'],
  FINAL_REVIEW: ['APPROVED', 'REJECTED'],
  APPROVED: [],
  REJECTED: ['DRAFT'],
};

export function isValidTransition(from: ApplicationStatus, to: ApplicationStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export const ApplicationService = {
  async getById(id: string): Promise<Application | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('applications').select('*').eq('id', id).single();
    if (error) {
      console.warn('[ApplicationService] getById failed:', error.message);
      return null;
    }
    return mapRowToApplication(data as Record<string, unknown>);
  },

  async getByBusinessId(businessId: string): Promise<Application[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('[ApplicationService] getByBusinessId failed:', error.message);
      return [];
    }
    return (data as Record<string, unknown>[]).map(mapRowToApplication);
  },

  async updateStatus(
    id: string,
    currentStatus: ApplicationStatus,
    nextStatus: ApplicationStatus,
    reason?: string,
  ): Promise<boolean> {
    if (!isValidTransition(currentStatus, nextStatus)) {
      console.warn(`[ApplicationService] Invalid transition: ${currentStatus} → ${nextStatus}`);
      return false;
    }
    if (!isSupabaseConfigured()) return false;
    const now = new Date().toISOString();
    const update: Record<string, unknown> = {
      status: nextStatus,
      updated_at: now,
    };
    if (reason) update.decision_reason = reason;
    if (nextStatus === 'SUBMITTED') update.submitted_at = now;
    if (nextStatus === 'APPROVED' || nextStatus === 'REJECTED') update.decided_at = now;
    const { error } = await supabase.from('applications').update(update).eq('id', id);
    if (error) {
      console.warn('[ApplicationService] updateStatus failed:', error.message);
      return false;
    }
    return true;
  },
};

function mapRowToApplication(row: Record<string, unknown>): Application {
  return {
    id: row.id as string,
    appNumber: row.app_number as string,
    businessId: row.business_id as string,
    approvalCode: row.approval_code as string,
    approvalName: row.approval_name as string,
    department: row.department as string,
    authorityName: row.authority_name as string,
    status: row.status as ApplicationStatus,
    slaDays: row.sla_days as number,
    slaDueDate: row.sla_due_date as string | undefined,
    formData: (row.form_data as Record<string, unknown>) ?? {},
    submittedAt: row.submitted_at as string | undefined,
    decidedAt: row.decided_at as string | undefined,
    decisionReason: row.decision_reason as string | undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
