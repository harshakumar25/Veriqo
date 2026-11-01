import { useContext } from 'react';
import { AppContext } from '../app-context';
import { Persona } from '../types';

export interface UseCurrentPersonaReturn {
  currentPersona: Persona;
  setPersona: (personaId: string) => void;
  isOfficer: boolean;
  isEntrepreneur: boolean;
}

export function useCurrentPersona(): UseCurrentPersonaReturn {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useCurrentPersona must be used within an AppProvider');

  return {
    currentPersona: ctx.currentPersona,
    setPersona: ctx.setPersona,
    isOfficer: ctx.currentPersona.role === 'GOVERNMENT_OFFICER',
    isEntrepreneur: ctx.currentPersona.role === 'ENTREPRENEUR',
  };
}
