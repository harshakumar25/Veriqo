/**
 * Notification Service — Single Responsibility Principle (SRP).
 * Manages notification records — persisted to Supabase when configured,
 * otherwise operates with the local in-memory/localStorage state only.
 */

import type { NotificationItem } from '../types';
import { supabase, isSupabaseConfigured } from '../supabase';

function mapRowToNotification(row: Record<string, unknown>): NotificationItem {
  return {
    id: row.id as string,
    title: row.title as string,
    message: row.message as string,
    type: row.type as NotificationItem['type'],
    linkUrl: row.link_url as string | undefined,
    isRead: row.is_read as boolean,
    createdAt: row.created_at as string,
  };
}

export const NotificationService = {
  async getAll(userId?: string): Promise<NotificationItem[]> {
    if (!isSupabaseConfigured()) return [];
    let query = supabase.from('notifications').select('*').order('created_at', { ascending: false });
    if (userId) query = query.eq('user_id', userId);
    const { data, error } = await query;
    if (error) {
      console.warn('[NotificationService] getAll failed:', error.message);
      return [];
    }
    return (data as Record<string, unknown>[]).map(mapRowToNotification);
  },

  async markRead(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    if (error) {
      console.warn('[NotificationService] markRead failed:', error.message);
      return false;
    }
    return true;
  },

  async insert(notif: NotificationItem, userId?: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('notifications').insert({
      id: notif.id,
      user_id: userId ?? null,
      title: notif.title,
      message: notif.message,
      type: notif.type,
      link_url: notif.linkUrl ?? null,
      is_read: notif.isRead,
      created_at: notif.createdAt,
    });
    if (error) {
      console.warn('[NotificationService] insert failed:', error.message);
      return false;
    }
    return true;
  },
};
