import { useContext } from 'react';
import { AppContext } from '../app-context';
import { NotificationItem } from '../types';

export interface UseNotificationsReturn {
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  unreadCount: number;
}

export function useNotifications(): UseNotificationsReturn {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useNotifications must be used within an AppProvider');

  const unreadCount = ctx.notifications.filter((n) => !n.isRead).length;

  return {
    notifications: ctx.notifications,
    markNotificationRead: ctx.markNotificationRead,
    unreadCount,
  };
}
