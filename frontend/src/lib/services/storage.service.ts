/**
 * Storage Service Abstraction (Dependency Inversion Principle - DIP).
 * Decouples state persistence from the concrete browser localStorage implementation.
 */

export interface IStorageService {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
}

export class LocalStorageService implements IStorageService {
  private readonly fallbackKeys: Record<string, string>;

  constructor(fallbackKeys: Record<string, string> = {}) {
    this.fallbackKeys = fallbackKeys;
  }

  getItem<T>(key: string): T | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    try {
      let raw = window.localStorage.getItem(key);

      // Check fallback legacy key if primary is absent
      if (!raw && this.fallbackKeys[key]) {
        raw = window.localStorage.getItem(this.fallbackKeys[key]);
      }

      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (err) {
      console.warn(`[LocalStorageService] Failed to read key "${key}":`, err);
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
    } catch (err) {
      console.warn(`[LocalStorageService] Failed to write key "${key}":`, err);
    }
  }

  removeItem(key: string): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.removeItem(key);
      if (this.fallbackKeys[key]) {
        window.localStorage.removeItem(this.fallbackKeys[key]);
      }
    } catch (err) {
      console.warn(`[LocalStorageService] Failed to remove key "${key}":`, err);
    }
  }

  clear(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.clear();
    } catch (err) {
      console.warn('[LocalStorageService] Failed to clear storage:', err);
    }
  }
}

/**
 * Singleton storage instance with Veriqo primary key and BuildX fallback key.
 */
export const appStorage = new LocalStorageService({
  veriqo_state_v1: 'buildx_sih_state_v1',
});
