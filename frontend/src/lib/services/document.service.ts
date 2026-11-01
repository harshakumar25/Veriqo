/**
 * Document Service — Single Responsibility Principle (SRP).
 * CRUD and verification status management for the `documents` Supabase table.
 */

import type { VaultDocument } from '../types';
import { supabase, isSupabaseConfigured } from '../supabase';

function mapRowToDocument(row: Record<string, unknown>): VaultDocument {
  return {
    id: row.id as string,
    businessId: row.business_id as string,
    docCode: row.doc_code as string,
    docName: row.doc_name as string,
    category: row.category as VaultDocument['category'],
    fileName: row.file_name as string,
    fileSizeKb: row.file_size_kb as number,
    fileUrl: row.file_url as string | undefined,
    verificationStatus: row.verification_status as VaultDocument['verificationStatus'],
    uploadedAt: row.uploaded_at as string,
  };
}

export const DocumentService = {
  async getByBusinessId(businessId: string): Promise<VaultDocument[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('business_id', businessId)
      .order('uploaded_at', { ascending: false });
    if (error) {
      console.warn('[DocumentService] getByBusinessId failed:', error.message);
      return [];
    }
    return (data as Record<string, unknown>[]).map(mapRowToDocument);
  },

  async insert(doc: VaultDocument): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('documents').insert({
      id: doc.id,
      business_id: doc.businessId,
      doc_code: doc.docCode,
      doc_name: doc.docName,
      category: doc.category,
      file_name: doc.fileName,
      file_size_kb: doc.fileSizeKb,
      file_url: doc.fileUrl ?? null,
      verification_status: doc.verificationStatus,
      uploaded_at: doc.uploadedAt,
    });
    if (error) {
      console.warn('[DocumentService] insert failed:', error.message);
      return false;
    }
    return true;
  },

  async updateVerificationStatus(
    id: string,
    status: VaultDocument['verificationStatus'],
  ): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase
      .from('documents')
      .update({ verification_status: status })
      .eq('id', id);
    if (error) {
      console.warn('[DocumentService] updateVerificationStatus failed:', error.message);
      return false;
    }
    return true;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('documents').delete().eq('id', id);
    if (error) {
      console.warn('[DocumentService] delete failed:', error.message);
      return false;
    }
    return true;
  },
};
