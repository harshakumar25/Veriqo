import { useContext } from 'react';
import { AppContext } from '../app-context';
import { QueryRecord } from '../types';

export interface UseQueriesReturn {
  queries: QueryRecord[];
  addQuery: (title: string, text: string) => void;
  respondToQuery: (queryId: string, responseText: string, docId?: string) => void;
  resolveQuery: (queryId: string) => void;
  hasOpenQueries: boolean;
  unresolvedCount: number;
}

export function useQueries(): UseQueriesReturn {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useQueries must be used within an AppProvider');

  const unresolvedCount = ctx.queries.filter(
    (q) => q.status === 'RAISED' || q.status === 'RESPONDED',
  ).length;

  return {
    queries: ctx.queries,
    addQuery: ctx.addQuery,
    respondToQuery: ctx.respondToQuery,
    resolveQuery: ctx.resolveQuery,
    hasOpenQueries: unresolvedCount > 0,
    unresolvedCount,
  };
}

