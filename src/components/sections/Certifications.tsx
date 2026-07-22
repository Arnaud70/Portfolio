import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { certificationItems } from '@/data/profile';
import { getIcon } from '@/lib/icons';
import { formatMonthYear } from '@/lib/utils';

export function Certifications() {
  const { t, i18n } = useTranslation();
  const CertIcon = getIcon('star');
  const ExternalIcon = getIcon('externalLink');

  return (
    <section id="certifications" className="bg-surface/30 py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow={t('nav.certifications')}
          title={t('certifications.title')}
          subtitle={t('certifications.subtitle')}
        />

        {certificationItems.length === 0 ? (
          <AnimatedSection className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="text-text-muted">{t('certifications.empty')}</p>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificationItems.map((cert, idx) => (
              <AnimatedSection
                key={cert.id}
                delay={idx * 0.08}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <CertIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base font-semibold">{cert.title}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{cert.issuer}</p>
                <p className="mt-1 text-xs text-text-muted">{formatMonthYear(cert.date, i18n.language)}</p>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary"
                  >
                    <ExternalIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('projects.viewDemo')}
                  </a>
                )}
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
