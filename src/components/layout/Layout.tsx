import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function Layout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-dvh flex-col bg-background text-text">
      <a href="#main-content" className="skip-link">
        {t('nav.skipToContent')}
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
