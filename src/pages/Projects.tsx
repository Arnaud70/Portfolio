import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/common/SEO';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { cn } from '@/lib/utils';
import { useGithubRepos } from '@/hooks/useGithub';
import { mapRepoToProject } from '@/lib/mapRepoToProject';
import { fallbackProjects } from '@/data/profile';
import type { ProjectCategory } from '@/types';

const CATEGORIES: Array<ProjectCategory | 'all'> = ['all', 'web', 'mobile', 'desktop', 'design'];

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { data: repos, isLoading, isError } = useGithubRepos();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');

  const projects = useMemo(() => {
    const list = repos?.length ? repos.map(mapRepoToProject) : fallbackProjects;
    return activeFilter === 'all' ? list : list.filter((p) => p.category === activeFilter);
  }, [repos, activeFilter]);

  return (
    <>
      <SEO title={t('projects.title')} path="/projects" />
      <section className="py-20 sm:py-28">
        <div className="section-container">
          <AnimatedSection className="mb-10 text-center">
            <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
              <span className="text-gradient">{t('projects.title')}</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-text-muted">{t('projects.subtitle')}</p>
          </AnimatedSection>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  activeFilter === cat
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-surface text-text-muted hover:border-primary/40 hover:text-text',
                )}
              >
                {t(`projects.filters.${cat}`)}
              </button>
            ))}
          </div>

          {isLoading && <p className="text-center text-sm text-text-muted">{t('projects.loading')}</p>}
          {isError && !isLoading && <p className="text-center text-sm text-text-muted">{t('projects.error')}</p>}
          {!isLoading && projects.length === 0 && (
            <p className="text-center text-sm text-text-muted">{t('projects.empty')}</p>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
