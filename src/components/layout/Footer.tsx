import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SocialLinks } from '@/components/common/SocialLinks';
import { profile } from '@/data/profile';

const QUICK_LINKS = [
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'contact', key: 'nav.contact' },
] as const;

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="section-container grid grid-cols-1 gap-10 py-14 sm:grid-cols-3">
        <div>
          <Link to="/" className="font-display text-lg font-bold text-text">
            <span className="text-gradient">A.</span> Afedikou
          </Link>
          <p className="mt-3 max-w-xs text-sm text-text-muted">{t('footer.tagline')}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
            {t('footer.quickLinks')}
          </h3>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`/#${link.id}`} className="text-sm text-text-muted transition-colors hover:text-primary">
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
            {t('footer.followMe')}
          </h3>
          <SocialLinks />
        </div>
      </div>

      <div className="border-t border-border py-6">
        <p className="section-container text-center text-xs text-text-muted">
          © {year} {profile.fullName}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
