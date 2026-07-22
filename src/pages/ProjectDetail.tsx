import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SEO } from '@/components/common/SEO';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { useGithubRepos } from '@/hooks/useGithub';
import { mapRepoToProject } from '@/lib/mapRepoToProject';
import { fallbackProjects } from '@/data/profile';
import { getIcon } from '@/lib/icons';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { data: repos } = useGithubRepos();
  const ArrowLeft = getIcon('externalLink');
  const GithubIcon = getIcon('github');
  const ExternalIcon = getIcon('externalLink');

  const project = useMemo(() => {
    const list = repos?.length ? repos.map(mapRepoToProject) : fallbackProjects;
    return list.find((p) => p.slug === slug);
  }, [repos, slug]);

  if (!project) {
    return (
      <section className="section-container flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
        <SEO title={t('projects.notFoundTitle')} noIndex />
        <h1 className="font-display text-3xl font-bold">{t('projects.notFoundTitle')}</h1>
        <p className="mt-3 text-text-muted">{t('projects.notFoundText')}</p>
        <Link to="/projects" className={buttonVariants({ variant: 'primary', size: 'md', className: 'mt-8' })}>
          {t('projects.backToProjects')}
        </Link>
      </section>
    );
  }

  return (
    <>
      <SEO title={project.title} description={project.description} path={`/projects/${project.slug}`} type="article" />
      <article className="py-16 sm:py-24">
        <div className="section-container max-w-4xl">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
            {t('projects.backToProjects')}
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 aspect-video overflow-hidden rounded-2xl border border-border bg-surface-2">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/projects/placeholder.jpg';
                }}
              />
            </div>

            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{project.title}</h1>
            <p className="mt-4 text-lg text-text-muted">{project.longDescription ?? project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  {t('projects.viewCode')}
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: 'primary' })}
                >
                  <ExternalIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('projects.viewDemo')}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
}
