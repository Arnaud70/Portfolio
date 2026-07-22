import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr/common.json';
import en from './locales/en/common.json';

// Architecture extensible : ajouter une langue = ajouter une entrée ici
// + un fichier locales/<code>/common.json + l'option dans LanguageSwitcher.tsx
export const supportedLocales = ['fr', 'en'] as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { common: fr },
      en: { common: en },
    },
    fallbackLng: 'fr',
    supportedLngs: supportedLocales as unknown as string[],
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'afedikou-portfolio-lang',
    },
  });

export default i18n;
