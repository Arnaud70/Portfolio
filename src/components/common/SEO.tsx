import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { absoluteUrl } from '@/lib/utils';
import { profile } from '@/data/profile';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
}

export function SEO({
  title,
  description,
  path = '/',
  image = '/images/og-cover.jpg',
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const { t, i18n } = useTranslation();
  const finalTitle = title ? `${title} | ${profile.fullName}` : t('meta.title');
  const finalDescription = description ?? t('meta.description');
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.fullName,
    jobTitle: profile.titles.join(', '),
    url: absoluteUrl('/'),
    image: absoluteUrl(profile.avatarUrl),
    email: profile.email,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    sameAs: [`https://github.com/${profile.githubUsername}`, profile.linkedinUrl],
  };

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={i18n.language === 'fr' ? 'fr_FR' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
}
