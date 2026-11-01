import { useContext } from 'react';
import { AppContext } from '../app-context';
import { VaultDocument } from '../types';

export interface UseVaultReturn {
  documents: VaultDocument[];
  addDocument: (doc: Omit<VaultDocument, 'id' | 'uploadedAt'>) => VaultDocument;
  updateDocumentStatus: (docId: string, status: VaultDocument['verificationStatus']) => void;
  getDocumentsByCategory: (category: VaultDocument['category']) => VaultDocument[];
}

export function useVault(): UseVaultReturn {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useVault must be used within an AppProvider');

  const getDocumentsByCategory = (category: VaultDocument['category']) =>
    ctx.documents.filter((d) => d.category === category);

  return {
    documents: ctx.documents,
    addDocument: ctx.addDocument,
    updateDocumentStatus: ctx.updateDocumentStatus,
    getDocumentsByCategory,
  };
}
