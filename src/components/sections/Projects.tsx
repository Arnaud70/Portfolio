import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { buttonVariants } from '@/components/ui/button';
import { useGithubRepos } from '@/hooks/useGithub';
import { mapRepoToProject } from '@/lib/mapRepoToProject';
import { fallbackProjects } from '@/data/profile';

const MAX_FEATURED = 6;

export function Projects() {
  const { t } = useTranslation();
  const { data: repos, isLoading, isError } = useGithubRepos();

  const projects = repos?.length
    ? repos
        .slice()
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, MAX_FEATURED)
        .map(mapRepoToProject)
    : fallbackProjects;

  return (
    <section id="projects" className="bg-surface/30 py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow={t('nav.projects')} title={t('projects.title')} subtitle={t('projects.subtitle')} />

        {isLoading && (
          <p className="text-center text-sm text-text-muted">{t('projects.loading')}</p>
        )}
        {isError && !isLoading && (
          <p className="text-center text-sm text-text-muted">{t('projects.error')}</p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        <AnimatedSection className="mt-12 flex justify-center">
          <Link to="/projects" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
            {t('projects.viewAll')}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
