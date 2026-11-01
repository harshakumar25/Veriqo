import { useContext } from 'react';
import { AppContext } from '../app-context';
import { BusinessProfile } from '../types';

export interface UseBusinessProfileReturn {
  business: BusinessProfile;
  updateBusiness: (updates: Partial<BusinessProfile>) => void;
}

export function useBusinessProfile(): UseBusinessProfileReturn {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useBusinessProfile must be used within an AppProvider');

  return {
    business: ctx.business,
    updateBusiness: ctx.updateBusiness,
  };
}

