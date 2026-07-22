import type { GithubProfileStats } from '@/types';

const GITHUB_API = 'https://api.github.com';

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  updated_at: string;
  pushed_at: string;
}

interface GithubUser {
  public_repos: number;
  followers: number;
  following: number;
}

async function githubFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status} on ${path}`);
  }
  return res.json() as Promise<T>;
}

/** Fetches the public repositories for a given username, most recently updated first. */
export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  const repos = await githubFetch<GithubRepo[]>(
    `/users/${username}/repos?sort=updated&per_page=100&type=owner`,
  );
  // Only return non-fork, non-archived, non-private repositories (public repos)
  return repos.filter((r) => !r.fork && !r.archived && !r.private);
}

/** Fetches public profile info + computes the top languages used across repos. */
export async function fetchGithubStats(username: string): Promise<GithubProfileStats> {
  const [user, repos] = await Promise.all([
    githubFetch<GithubUser>(`/users/${username}`),
    fetchGithubRepos(username),
  ]);

  const languageCounts = new Map<string, number>();
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }
  });

  const total = Array.from(languageCounts.values()).reduce((a, b) => a + b, 0) || 1;
  const topLanguages = Array.from(languageCounts.entries())
    .map(([name, count]) => ({ name, percentage: Math.round((count / total) * 100) }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    topLanguages,
  };
}
