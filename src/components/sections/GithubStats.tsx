import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { buttonVariants } from '@/components/ui/button';
import { useGithubStats } from '@/hooks/useGithub';
import { getIcon } from '@/lib/icons';
import { profile } from '@/data/profile';

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  PHP: '#777bb4',
  HTML: '#e34c26',
  CSS: '#264de4',
  Java: '#b07219',
  C: '#555555',
};

export function GithubStats() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGithubStats();
  const GithubIcon = getIcon('github');
  const ExternalIcon = getIcon('externalLink');

  const stats = [
    { key: 'repos', value: data?.publicRepos },
    { key: 'followers', value: data?.followers },
    { key: 'following', value: data?.following },
  ];

  return (
    <section id="github" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow={t('nav.github')} title={t('github.title')} subtitle={t('github.subtitle')} />

        {isLoading && <p className="text-center text-sm text-text-muted">{t('github.loading')}</p>}
        {isError && <p className="text-center text-sm text-text-muted">{t('github.error')}</p>}

        {data && (
          <AnimatedSection className="mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-6 text-center shadow-card"
                >
                  <span className="font-display text-3xl font-extrabold text-gradient">{stat.value ?? '—'}</span>
                  <span className="mt-1 text-xs text-text-muted">{t(`github.${stat.key}`)}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
                {t('github.topLanguages')}
              </h3>
              <div className="space-y-3">
                {data.topLanguages.map((lang) => (
                  <div key={lang.name}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 font-medium text-text">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: LANGUAGE_COLORS[lang.name] ?? '#3B82F6' }}
                          aria-hidden="true"
                        />
                        {lang.name}
                      </span>
                      <span className="text-text-muted">{lang.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${lang.percentage}%`, backgroundColor: LANGUAGE_COLORS[lang.name] ?? '#3B82F6' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection className="mt-10 flex justify-center">
          <a
            href={`https://github.com/${profile.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'md' })}
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
            {t('github.viewProfile')}
            <ExternalIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
