import { useQuery } from '@tanstack/react-query';
import { fetchGithubRepos, fetchGithubStats } from '@/lib/github';
import { profile } from '@/data/profile';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || profile.githubUsername || 'afedikou';
const ONE_HOUR = 1000 * 60 * 60;

/** Latest, non-fork, non-archived repositories — used to populate the Projects section. */
export function useGithubRepos() {
  return useQuery({
    queryKey: ['github', 'repos', GITHUB_USERNAME],
    queryFn: () => fetchGithubRepos(GITHUB_USERNAME),
    staleTime: ONE_HOUR,
    retry: 1,
  });
}

/** Aggregate profile statistics (repo count, followers, top languages). */
export function useGithubStats() {
  return useQuery({
    queryKey: ['github', 'stats', GITHUB_USERNAME],
    queryFn: () => fetchGithubStats(GITHUB_USERNAME),
    staleTime: ONE_HOUR,
    retry: 1,
  });
}
