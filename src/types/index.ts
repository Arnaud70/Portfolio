export type Theme = 'dark' | 'light';
export type Locale = 'fr' | 'en';

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string; // key resolved to a react-icons component in SocialLinks.tsx
}

export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'design';

export type ProjectStatus = 'live' | 'in-progress' | 'archived' | 'concept';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured?: boolean;
  stars?: number;
  updatedAt?: string;
}

export interface SkillItem {
  name: string;
  icon: string;
  level?: number; // 0-100, optional proficiency indicator
}

export interface SkillCategory {
  id: string;
  titleKey: string;
  icon: string;
  skills: SkillItem[];
}

export type ExperienceType = 'education' | 'project' | 'freelance' | 'internship';

export interface ExperienceItem {
  id: string;
  type: ExperienceType;
  titleKey: string;
  organizationKey: string;
  periodKey: string;
  descriptionKey: string;
  tags?: string[];
}

export interface ServiceItem {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

export interface GithubProfileStats {
  publicRepos: number;
  followers: number;
  following: number;
  topLanguages: { name: string; percentage: number }[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
