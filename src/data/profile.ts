import type { SocialLink, SkillCategory, ServiceItem, CertificationItem, Project } from '@/types';

/**
 * Centralised profile data — extracted from Arnaud's CV.
 * Update the values below with fresher information as your career evolves;
 * nothing else in the codebase needs to change.
 */
export const profile = {
  fullName: 'Arnaud Akoèno AFEDIKOU',
  firstName: 'Arnaud',
  titles: ['Full Stack Developer', 'Graphic Designer', 'UI/UX Designer'],
  email: 'arnaudakoenoafedikou@gmail.com',
  phone: '+228 96 15 92 57',
  phoneSecondary: '+228 91 21 87 02',
  whatsapp: 'https://wa.me/22896159257',
  location: 'Lomé — Djidjolé, Togo',
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'Arnaud70',
  linkedinUrl: 'https://www.linkedin.com/in/afedikou',
  cvUrl: '/cv/Arnaud-AFEDIKOU-CV.pdf',
  avatarUrl: '/images/avatar.jpg',
};

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', url: `https://github.com/${profile.githubUsername}`, icon: 'github' },
  { id: 'linkedin', label: 'LinkedIn', url: profile.linkedinUrl, icon: 'linkedin' },
  { id: 'whatsapp', label: 'WhatsApp', url: profile.whatsapp, icon: 'whatsapp' },
  { id: 'email', label: 'Email', url: `mailto:${profile.email}`, icon: 'email' },
];

export const languages = [
  { name: 'Français', level: 95 },
  { name: 'Anglais', level: 40 },
  { name: 'Ewe', level: 90 },
];

export const softSkills = [
  'Gestion du temps',
  "Capacité d'organisation",
  'Communication',
  'Leadership',
  "Capacité d'adaptation",
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    titleKey: 'skills.categories.frontend',
    icon: 'code',
    skills: [
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react' },
      { name: 'React Native', icon: 'react' },
      { name: 'Bootstrap', icon: 'bootstrap' },
      { name: 'TailwindCSS', icon: 'tailwind' },
    ],
  },
  {
    id: 'backend',
    titleKey: 'skills.categories.backend',
    icon: 'server',
    skills: [
      { name: 'PHP', icon: 'php' },
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Django', icon: 'django' },
      { name: 'Java', icon: 'code' },
      { name: 'C', icon: 'code' },
      { name: 'Python', icon: 'python' },
      { name: 'Design Patterns', icon: 'layers' },
    ],
  },
  {
    id: 'database',
    titleKey: 'skills.categories.database',
    icon: 'database',
    skills: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Oracle (notions)', icon: 'database' },
    ],
  },
  {
    id: 'tools',
    titleKey: 'skills.categories.tools',
    icon: 'tools',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Photoshop', icon: 'photoshop' },
      { name: 'Canva', icon: 'canva' },
      { name: 'CapCut', icon: 'image' },
      { name: 'Postman', icon: 'postman' },
    ],
  },
];

export const serviceItems: ServiceItem[] = [
  { id: 'webDev', icon: 'globe', titleKey: 'services.items.webDev.title', descriptionKey: 'services.items.webDev.description' },
  { id: 'fullstack', icon: 'layers', titleKey: 'services.items.fullstack.title', descriptionKey: 'services.items.fullstack.description' },
  { id: 'django', icon: 'server', titleKey: 'services.items.django.title', descriptionKey: 'services.items.django.description' },
  { id: 'api', icon: 'api', titleKey: 'services.items.api.title', descriptionKey: 'services.items.api.description' },
  { id: 'uiux', icon: 'penTool', titleKey: 'services.items.uiux.title', descriptionKey: 'services.items.uiux.description' },
  { id: 'logo', icon: 'shape', titleKey: 'services.items.logo.title', descriptionKey: 'services.items.logo.description' },
  { id: 'affiches', icon: 'image', titleKey: 'services.items.affiches.title', descriptionKey: 'services.items.affiches.description' },
  { id: 'identity', icon: 'palette', titleKey: 'services.items.identity.title', descriptionKey: 'services.items.identity.description' },
];

// Populated with the real certification listed on the CV. Add new entries
// here as they are obtained — the section is designed to also handle zero
// entries gracefully (see Certifications.tsx).
export const certificationItems: CertificationItem[] = [
  {
    id: 'pix-2026',
    title: 'Certification PIX — Maîtrise du vocabulaire numérique',
    issuer: 'PIX',
    date: '2026-01',
    url: 'https://pix.fr',
  },
];

/**
 * Fallback projects, shown if the GitHub API request fails or is rate
 * limited (unauthenticated requests are capped at 60/hour/IP). Keep this
 * list in sync with your best repositories.
 */
export const fallbackProjects: Project[] = [
  {
    id: 'edoteam',
    slug: 'edoteam',
    title: 'EDOTEAM',
    description:
      'Plateforme web de mise en relation géo-indexée entre clients et prestataires de services informels au Togo.',
    image: '/images/projects/edoteam.jpg',
    technologies: ['React', 'NestJS', 'PostgreSQL', 'TypeScript'],
    githubUrl: `https://github.com/${profile.githubUsername}/EDOTEAM-BACK`,
    category: 'web',
    status: 'in-progress',
    featured: true,
  },
  {
    id: 'car-rental',
    slug: 'location-de-voiture',
    title: 'Plateforme de location de voitures',
    description:
      'Site web de location de voitures : recherche de véhicules, réservation en ligne et back-office de gestion de flotte.',
    image: '/images/projects/car-rental.jpg',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    category: 'web',
    status: 'live',
    demoUrl: 'https://edoteam.vercel.app/', 
    featured: true,
  },
  {
    id: 'crypto-exchange',
    slug: 'echange-cryptomonnaies',
    title: 'Plateforme d\u2019échange de cryptomonnaies',
    description:
      'Application web permettant l\u2019échange de cryptomonnaies pour une clientèle locale, avec suivi des transactions.',
    image: '/images/projects/crypto.jpg',
    technologies: ['JavaScript', 'PHP', 'MySQL'],
    category: 'web',
    status: 'live',
  },
  {
    id: 'ecommerce-boutique',
    slug: 'boutique-en-ligne',
    title: 'Boutique en ligne',
    description: 'Site e-commerce complet pour une boutique en ligne : catalogue produits, panier et commandes.',
    image: '/images/projects/ecommerce.jpg',
    technologies: ['HTML5', 'CSS3', 'PHP', 'MySQL'],
    category: 'web',
    status: 'live',
  },
  {
    id: 'portfolio',
    slug: 'portfolio',
    title: 'Portfolio personnel',
    description: 'Portfolio professionnel premium construit avec React 19, Vite, TypeScript et Framer Motion.',
    image: '/images/projects/portfolio.jpg',
    technologies: ['React', 'Vite', 'TailwindCSS', 'Framer Motion'],
    githubUrl: `https://github.com/${profile.githubUsername}/portfolio`,
    category: 'web',
    status: 'live',
    featured: true,
  },
];
