import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icons';
import type { Project } from '@/types';

const STATUS_VARIANT: Record<Project['status'], 'success' | 'warning' | 'outline' | 'secondary'> = {
  live: 'success',
  'in-progress': 'warning',
  archived: 'outline',
  concept: 'secondary',
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t } = useTranslation();
  const GithubIcon = getIcon('github');
  const ExternalIcon = getIcon('externalLink');
  const StarIcon = getIcon('star');

  return (
    <AnimatedSection
      delay={index * 0.06}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
    >
      <Link to={`/projects/${project.slug}`} className="block aspect-video overflow-hidden bg-surface-2">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/projects/placeholder.jpg';
          }}
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Badge variant={STATUS_VARIANT[project.status]}>{t(`projects.status.${project.status}`)}</Badge>
          {typeof project.stars === 'number' && project.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <StarIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {project.stars}
            </span>
          )}
        </div>

        <h3 className="font-display text-lg font-semibold">
          <Link to={`/projects/${project.slug}`} className="hover:text-primary">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary"
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
              className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
            >
              <ExternalIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {t('projects.viewDemo')}
            </a>
          )}
          <Link
            to={`/projects/${project.slug}`}
            className="ml-auto text-sm font-medium text-primary hover:underline"
          >
            {t('projects.viewMore')}
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
