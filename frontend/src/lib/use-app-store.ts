import { useContext } from 'react';
import { AppContext } from './app-context';

export * from './hooks/use-current-persona';
export * from './hooks/use-business-profile';
export * from './hooks/use-vault';
export * from './hooks/use-application-workflow';
export * from './hooks/use-queries';
export * from './hooks/use-inspection';
export * from './hooks/use-notifications';

/**
 * Facade hook exposing the entire app store context.
 * For specialized components, prefer using domain-scoped hooks (ISP):
 * - useCurrentPersona()
 * - useBusinessProfile()
 * - useVault()
 * - useApplicationWorkflow()
 * - useQueries()
 * - useInspection()
 * - useNotifications()
 */
export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within an AppProvider');
  return context;
};
