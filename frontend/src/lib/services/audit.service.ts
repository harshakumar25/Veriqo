/**
 * Audit & Event Generation Service — Single Responsibility Principle (SRP).
 * Solely responsible for constructing immutable, standardised application events.
 * Writes to Supabase application_events table when configured; otherwise operates locally.
 */

import type { ApplicationEvent, PersonaRole } from '../types';

export interface CreateEventParams {
  applicationId: string;
  actorRole: PersonaRole;
  actorName?: string;
  eventType: string;
  title: string;
  description?: string;
}

/**
 * Constructs a new ApplicationEvent object with a collision-resistant ID.
 * Does NOT perform any side effects — caller is responsible for state updates.
 */
export function createApplicationEvent(params: CreateEventParams): ApplicationEvent {
  return {
    id: `evt-${crypto.randomUUID()}`,
    applicationId: params.applicationId,
    actorRole: params.actorRole,
    actorName: params.actorName ?? 'System',
    eventType: params.eventType,
    title: params.title,
    description: params.description ?? '',
    createdAt: new Date().toISOString(),
  };
}
