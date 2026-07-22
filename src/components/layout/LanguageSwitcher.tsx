import { useState, useRef, useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { supportedLocales } from '@/i18n';
import { cn } from '@/lib/utils';

const LOCALE_LABELS: Record<string, { flag: string; label: string }> = {
  fr: { flag: '🇫🇷', label: 'FR' },
  en: { flag: '🇺🇸', label: 'EN' },
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALE_LABELS[i18n.language.split('-')[0]] ?? LOCALE_LABELS.fr;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Changer de langue"
        className="flex h-10 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-text-muted transition-colors hover:border-primary/50 hover:text-primary"
      >
        <FaGlobe className="h-4 w-4" aria-hidden="true" />
        <span>{current.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-border bg-surface shadow-card"
          >
            {supportedLocales.map((locale) => (
              <li key={locale}>
                <button
                  type="button"
                  role="option"
                  aria-selected={i18n.language.startsWith(locale)}
                  onClick={() => {
                    void i18n.changeLanguage(locale);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-surface-2',
                    i18n.language.startsWith(locale) ? 'text-primary' : 'text-text-muted',
                  )}
                >
                  <span aria-hidden="true">{LOCALE_LABELS[locale].flag}</span>
                  {LOCALE_LABELS[locale].label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
