import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/common/SEO';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="section-container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <SEO title={t('notFound.title')} noIndex />
      <p className="font-display text-8xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">{t('notFound.title')}</h1>
      <p className="mt-2 max-w-md text-text-muted">{t('notFound.text')}</p>
      <Link to="/" className={buttonVariants({ variant: 'primary', size: 'lg', className: 'mt-8' })}>
        {t('notFound.cta')}
      </Link>
    </section>
  );
}
