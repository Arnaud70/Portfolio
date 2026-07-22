import type { GithubRepo } from '@/lib/github';
import type { Project, ProjectCategory } from '@/types';

const MOBILE_HINTS = ['react-native', 'flutter', 'android', 'ios', 'expo'];
const DESKTOP_HINTS = ['electron', 'tauri', 'desktop'];
const DESIGN_HINTS = ['figma', 'design', 'ui-kit', 'branding'];

function inferCategory(repo: GithubRepo): ProjectCategory {
  const haystack = `${repo.name} ${repo.description ?? ''} ${repo.topics.join(' ')}`.toLowerCase();
  if (MOBILE_HINTS.some((h) => haystack.includes(h))) return 'mobile';
  if (DESKTOP_HINTS.some((h) => haystack.includes(h))) return 'desktop';
  if (DESIGN_HINTS.some((h) => haystack.includes(h))) return 'design';
  return 'web';
}

function humanizeName(name: string) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function mapRepoToProject(repo: GithubRepo): Project {
  return {
    id: String(repo.id),
    slug: repo.name,
    title: humanizeName(repo.name),
    description: repo.description ?? '—',
    image: `/images/projects/${repo.name}.jpg`,
    technologies: [repo.language, ...repo.topics].filter((v): v is string => Boolean(v)).slice(0, 6),
    githubUrl: repo.html_url,
    demoUrl: repo.homepage || undefined,
    category: inferCategory(repo),
    status: repo.homepage ? 'live' : 'in-progress',
    stars: repo.stargazers_count,
    updatedAt: repo.pushed_at,
  };
}
