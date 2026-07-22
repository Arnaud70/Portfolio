import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { getIcon } from '@/lib/icons';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'services', key: 'nav.services' },
  { id: 'contact', key: 'nav.contact' },
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const MenuIcon = getIcon('menu');
  const CloseIcon = getIcon('close');
  const DownloadIcon = getIcon('download');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  function handleNavClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/#${id}`);
    }
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-border py-3' : 'bg-transparent py-5',
      )}
    >
      <nav className="section-container flex items-center justify-between" aria-label="Navigation principale">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-text"
          onClick={() => setMobileOpen(false)}
        >
          <span className="text-gradient">ARNAUD</span> A.
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`/#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
              >
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button size="sm" variant="primary" onClick={() => window.open(profile.cvUrl, '_blank')}>
            <DownloadIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {t('nav.downloadCv')}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text"
          >
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass overflow-hidden border-t border-border lg:hidden"
          >
            <ul className="section-container flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-text-muted hover:bg-surface-2 hover:text-text"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center justify-between px-4">
                <LanguageSwitcher />
                <Button size="sm" onClick={() => window.open(profile.cvUrl, '_blank')}>
                  <DownloadIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('nav.downloadCv')}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
