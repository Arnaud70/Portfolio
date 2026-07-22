# Portfolio — Arnaud Akoèno AFEDIKOU

Portfolio professionnel premium construit avec **React 19**, **Vite**, **TypeScript**, **TailwindCSS v4**, **Framer Motion**, **React Router**, **TanStack Query**, **react-i18next** et **EmailJS**.

## ⚠️ À lire avant de démarrer

Ce projet a été généré dans un environnement **sans accès réseau** : les dépendances n'ont donc **pas pu être installées ni le projet compilé/testé** ici. Le code a été écrit avec le plus grand soin en suivant les API actuelles de chaque bibliothèque, mais il est fortement recommandé de lancer `npm install` puis `npm run dev` chez vous et de corriger les éventuelles erreurs de type mineures avant mise en production.

## 1. Installation

```bash
npm install
cp .env.example .env
```

Renseignez ensuite `.env` :

| Variable | Description |
|---|---|
| `VITE_GITHUB_USERNAME` | Votre pseudo GitHub (alimente les sections Projets & GitHub) |
| `VITE_EMAILJS_SERVICE_ID` | Créé sur [emailjs.com](https://www.emailjs.com) |
| `VITE_EMAILJS_TEMPLATE_ID` | Template EmailJS (variables attendues : `from_name`, `from_email`, `subject`, `message`, `to_email`) |
| `VITE_EMAILJS_PUBLIC_KEY` | Clé publique EmailJS |
| `VITE_SITE_URL` | URL finale du site (pour les balises SEO/Open Graph) |

## 2. Lancer en développement

```bash
npm run dev
```

## 3. Build de production

```bash
npm run build
npm run preview   # pour tester le build localement
```

## 4. Personnaliser le contenu

Tout le contenu texte/données est centralisé — **aucun besoin de fouiller dans les composants** :

- `src/data/profile.ts` — coordonnées, réseaux sociaux, compétences, services, certifications, projets de secours
- `src/data/experience.ts` — timeline d'expérience, en français **et** en anglais
- `src/i18n/locales/fr/common.json` et `src/i18n/locales/en/common.json` — tous les textes de l'interface
- `public/images/avatar.jpg` — votre photo (déjà en place)
- `public/cv/Arnaud-AFEDIKOU-CV.pdf` — CV téléchargeable (déjà généré depuis vos données ; régénérable via `python3 scripts/gen_cv.py`)
- `public/images/projects/*.jpg` — ajoutez vos captures d'écran de projets ici (les images manquantes retombent automatiquement sur `placeholder.jpg`)

## 5. Ajouter une langue

1. Dupliquez `src/i18n/locales/en/common.json` vers `src/i18n/locales/<code>/common.json` et traduisez.
2. Importez-le et ajoutez-le à `resources` dans `src/i18n/index.ts`.
3. Ajoutez `<code>` à `supportedLocales`.
4. Ajoutez le drapeau/libellé dans `LOCALE_LABELS` (`src/components/layout/LanguageSwitcher.tsx`).

## 6. Section Projets — synchronisation GitHub

La section Projets et la page `/projects` interrogent l'API GitHub publique (`api.github.com/users/<username>/repos`) via TanStack Query. Si l'appel échoue ou si la limite de 60 requêtes/heure (non authentifiées) est atteinte, le site retombe automatiquement sur `fallbackProjects` (`src/data/profile.ts`) — pensez à le garder à jour.

## 7. Déploiement

Le projet est un site statique standard Vite : il se déploie tel quel sur **Vercel**, **Netlify**, **Cloudflare Pages** ou tout hébergeur statique. Pensez à renseigner les variables d'environnement `VITE_*` dans les paramètres de votre plateforme d'hébergement.

## 8. Stack technique

| Domaine | Choix |
|---|---|
| UI | React 19, TypeScript strict, TailwindCSS v4 |
| Animations | Framer Motion |
| Routage | React Router v6 |
| Données serveur | TanStack Query (API GitHub) |
| Formulaire de contact | EmailJS |
| i18n | react-i18next (FR par défaut, EN inclus) |
| SEO | react-helmet-async, JSON-LD Person, Open Graph, Twitter Cards |
| Composants UI | Primitives façon shadcn/ui (Button, Card, Input, Textarea, Badge) |
| Icônes | react-icons |

## 9. Accessibilité & performance

- Navigation clavier complète, focus visible, lien d'évitement (« skip to content »)
- Respect de `prefers-reduced-motion`
- Contrastes conformes WCAG sur la palette fournie
- `React.lazy` sur les routes, images en `loading="lazy"`, découpage des bundles (vendor/motion/query)

---

Bon développement ! 🚀
"# Portfolio" 
