import React, { ComponentType, lazy } from 'react';

/**
 * Resilient lazy loading wrapper with automatic retry and reload recovery.
 * Prevents "TypeError: Failed to fetch dynamically imported module" from collapsing the entire app.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
  chunkKey = 'page'
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    const storageKey = `veriqo_chunk_reload_${chunkKey}`;
    const alreadyReloaded = window.sessionStorage.getItem(storageKey) === 'true';

    try {
      const module = await componentImport();
      window.sessionStorage.removeItem(storageKey);
      return module;
    } catch (error) {
      console.warn(`[Veriqo] Dynamic chunk load failed for ${chunkKey}:`, error);

      if (!alreadyReloaded) {
        // Automatically attempt a single clean reload to fetch updated chunks
        window.sessionStorage.setItem(storageKey, 'true');
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }

      // If already reloaded once and failed, throw so RouteErrorBoundary can render graceful recovery UI
      throw error;
    }
  });
}

