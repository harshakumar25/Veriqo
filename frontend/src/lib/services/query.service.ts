/**
 * Query Service — Single Responsibility Principle (SRP).
 * CRUD for `queries` and `query_responses` Supabase tables.
 */

import type { QueryRecord } from '../types';
import { supabase, isSupabaseConfigured } from '../supabase';

function mapRowToQuery(row: Record<string, unknown>, response?: Record<string, unknown>): QueryRecord {
  return {
    id: row.id as string,
    applicationId: row.application_id as string,
    officerName: row.officer_name as string,
    title: row.title as string,
    queryText: row.query_text as string,
    status: row.status as QueryRecord['status'],
    createdAt: row.created_at as string,
    response: response
      ? {
          id: response.id as string,
          queryId: row.id as string,
          responseText: response.response_text as string,
          documentId: response.document_id as string | undefined,
          submittedAt: response.submitted_at as string,
        }
      : undefined,
  };
}

export const QueryService = {
  async getByApplicationId(applicationId: string): Promise<QueryRecord[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('queries')
      .select('*, query_responses(*)')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('[QueryService] getByApplicationId failed:', error.message);
      return [];
    }
    return (data as Record<string, unknown>[]).map((row) => {
      const responses = row.query_responses as Record<string, unknown>[] | null;
      return mapRowToQuery(row, responses?.[0]);
    });
  },

  async insert(query: QueryRecord): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('queries').insert({
      id: query.id,
      application_id: query.applicationId,
      officer_name: query.officerName,
      title: query.title,
      query_text: query.queryText,
      status: query.status,
    });
    if (error) {
      console.warn('[QueryService] insert failed:', error.message);
      return false;
    }
    return true;
  },

  async insertResponse(
    queryId: string,
    responseId: string,
    responseText: string,
    documentId?: string,
    submittedAt?: string,
  ): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('query_responses').insert({
      id: responseId,
      query_id: queryId,
      response_text: responseText,
      document_id: documentId ?? null,
      submitted_at: submittedAt ?? new Date().toISOString(),
    });
    if (error) {
      console.warn('[QueryService] insertResponse failed:', error.message);
      return false;
    }
    return true;
  },

  async updateStatus(id: string, status: QueryRecord['status']): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('queries').update({ status }).eq('id', id);
    if (error) {
      console.warn('[QueryService] updateStatus failed:', error.message);
      return false;
    }
    return true;
  },
};
