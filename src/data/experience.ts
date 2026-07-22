import type { ExperienceItem, Locale } from '@/types';

const fr: ExperienceItem[] = [
  {
    id: 'edu-1',
    type: 'education',
    titleKey: 'Licence Professionnelle — Génie Logiciel',
    organizationKey: 'IAEC — Institut Africain d\u2019Administration et d\u2019Étude Commercial',
    periodKey: 'Octobre 2023 — aujourd\u2019hui',
    descriptionKey:
      'Formation intensive en développement d\u2019applications, architecture logicielle, bases de données et génie logiciel.',
    tags: ['NestJS', 'PostgreSQL', 'UML'],
  },
  {
    id: 'exp-car-rental',
    type: 'project',
    titleKey: 'Développement d\u2019un site de location de voiture',
    organizationKey: 'Projet personnel',
    periodKey: 'Janvier 2026',
    descriptionKey: 'Conception et développement complet d\u2019une plateforme web de location de véhicules.',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
  },
  {
    id: 'exp-graphiste',
    type: 'freelance',
    titleKey: 'Développeur & Designer Graphiste',
    organizationKey: 'Freelance',
    periodKey: 'Janvier 2026',
    descriptionKey:
      'Développement de sites web au sein d\u2019une équipe backend/frontend ; responsable du design UI/UX ; réalisation de montages photo et vidéo.',
    tags: ['UI/UX', 'Photoshop', 'CapCut'],
  },
  {
    id: 'exp-sites-2025',
    type: 'freelance',
    titleKey: 'Développement de sites web',
    organizationKey: 'Clients indépendants',
    periodKey: 'Avril 2025',
    descriptionKey:
      'Développement d\u2019un site web pour une boutique en ligne et d\u2019un autre pour l\u2019échange de cryptomonnaies.',
    tags: ['PHP', 'JavaScript', 'MySQL'],
  },
  {
    id: 'formation-reseau',
    type: 'internship',
    titleKey: 'Initiation en maintenance informatique et réseaux Wi-Fi',
    organizationKey: 'Formation complémentaire',
    periodKey: 'Août — Septembre 2024',
    descriptionKey: 'Maintenance informatique et initiation à l\u2019installation des technologies de réseau sans fil Wi-Fi.',
    tags: ['Maintenance', 'Réseaux'],
  },
  {
    id: 'bac',
    type: 'education',
    titleKey: 'Baccalauréat Deuxième Partie (BAC II), série D',
    organizationKey: 'Lycée Agbonou',
    periodKey: '2022 — 2023',
    descriptionKey: 'Série scientifique D.',
    tags: [],
  },
];

const en: ExperienceItem[] = [
  {
    id: 'edu-1',
    type: 'education',
    titleKey: 'Professional Bachelor\u2019s Degree — Software Engineering',
    organizationKey: 'IAEC — African Institute of Administration and Business Studies',
    periodKey: 'October 2023 — present',
    descriptionKey:
      'Intensive training in application development, software architecture, databases and software engineering.',
    tags: ['NestJS', 'PostgreSQL', 'UML'],
  },
  {
    id: 'exp-car-rental',
    type: 'project',
    titleKey: 'Car rental website development',
    organizationKey: 'Personal project',
    periodKey: 'January 2026',
    descriptionKey: 'End-to-end design and development of a car rental web platform.',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
  },
  {
    id: 'exp-graphiste',
    type: 'freelance',
    titleKey: 'Developer & Graphic Designer',
    organizationKey: 'Freelance',
    periodKey: 'January 2026',
    descriptionKey:
      'Website development within a backend/frontend team; in charge of UI/UX design; photo and video editing.',
    tags: ['UI/UX', 'Photoshop', 'CapCut'],
  },
  {
    id: 'exp-sites-2025',
    type: 'freelance',
    titleKey: 'Website development',
    organizationKey: 'Independent clients',
    periodKey: 'April 2025',
    descriptionKey: 'Built a website for an online shop and another for cryptocurrency exchange.',
    tags: ['PHP', 'JavaScript', 'MySQL'],
  },
  {
    id: 'formation-reseau',
    type: 'internship',
    titleKey: 'IT maintenance and Wi-Fi networking training',
    organizationKey: 'Complementary training',
    periodKey: 'August — September 2024',
    descriptionKey: 'Computer maintenance and introduction to wireless (Wi-Fi) network technology installation.',
    tags: ['Maintenance', 'Networking'],
  },
  {
    id: 'bac',
    type: 'education',
    titleKey: 'High School Diploma (Baccalauréat), science track',
    organizationKey: 'Lycée Agbonou',
    periodKey: '2022 — 2023',
    descriptionKey: 'Science track (série D).',
    tags: [],
  },
];

export function getExperienceItems(locale: Locale): ExperienceItem[] {
  return locale === 'en' ? en : fr;
}
