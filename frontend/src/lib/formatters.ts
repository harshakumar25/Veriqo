/**
 * Centralized formatting utilities following DRY principles.
 * Eliminates ad-hoc string concatenation and duplicated date/currency formatting across components.
 */

/**
 * Format currency amount in Indian Rupees (INR).
 * Defaults to Crore representation for industrial scale investments (>= 1,00,00,000).
 */
export function formatCurrencyINR(amount: number, options: { inCrores?: boolean; decimals?: number } = {}): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';

  const { inCrores = true, decimals = 2 } = options;

  if (inCrores && Math.abs(amount) >= 10_000_000) {
    const crores = amount / 10_000_000;
    return `₹${crores.toFixed(decimals)} Crores`;
  }

  if (Math.abs(amount) >= 100_000) {
    const lakhs = amount / 100_000;
    return `₹${lakhs.toFixed(decimals)} Lakhs`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Format ISO date string into human-readable date.
 */
export function formatDate(dateInput?: string | Date | null, fallback = '—'): string {
  if (!dateInput) return fallback;
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return fallback;
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return fallback;
  }
}

/**
 * Format ISO date string into human-readable date and time.
 */
export function formatDateTime(dateInput?: string | Date | null, fallback = '—'): string {
  if (!dateInput) return fallback;
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return fallback;
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return fallback;
  }
}

/**
 * Format file size in KB or MB.
 */
export function formatFileSize(kb: number): string {
  if (!kb || isNaN(kb)) return '0 KB';
  if (kb >= 1024) {
    return `${(kb / 1024).toFixed(2)} MB`;
  }
  return `${Math.round(kb)} KB`;
}
