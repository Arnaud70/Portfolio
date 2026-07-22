import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names intelligently, resolving conflicts
 * (e.g. "px-2" vs "px-4") the way shadcn/ui components expect.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between a min and a max value. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Formats an ISO date string as "Mon YYYY" in the given locale. */
export function formatMonthYear(iso: string, locale: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(date);
}

/** Builds an absolute URL for SEO / Open Graph tags. */
export function absoluteUrl(path: string) {
  const base = import.meta.env.VITE_SITE_URL || 'https://afedikou.dev';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
