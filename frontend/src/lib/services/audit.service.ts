/**
 * Audit & Event Generation Service (Single Responsibility Principle - SRP).
 * Responsible solely for constructing immutable, standardized application events.
 */

import { ApplicationEvent, PersonaRole } from '../types';

export interface CreateEventParams {
  applicationId: string;
  actorRole: PersonaRole;
  actorName: string;
  eventType: ApplicationEvent['eventType'];
  title: string;
  description?: string;
}

export function createApplicationEvent(params: CreateEventParams): ApplicationEvent {
  const uniqueId = `evt-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  return {
    id: uniqueId,
    applicationId: params.applicationId,
    actorRole: params.actorRole,
    actorName: params.actorName,
    eventType: params.eventType,
    title: params.title,
    description: params.description || '',
    createdAt: new Date().toISOString(),
  };
}
