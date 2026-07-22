import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { getExperienceItems } from '@/data/experience';
import { getIcon } from '@/lib/icons';
import type { Locale } from '@/types';

export function Experience() {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language.split('-')[0] as Locale) || 'fr';
  const experienceItems = getExperienceItems(locale);

  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow={t('nav.experience')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-transparent sm:left-1/2"
          />

          <ol className="space-y-10">
            {experienceItems.map((item, idx) => {
              const TypeIcon = getIcon(item.type);
              const isEven = idx % 2 === 0;
              return (
                <AnimatedSection
                  as="li"
                  key={item.id}
                  direction={isEven ? 'right' : 'left'}
                  delay={idx * 0.08}
                  className={`relative flex flex-col gap-4 pl-14 sm:w-1/2 sm:pl-0 sm:pr-10 ${
                    isEven ? 'sm:ml-0 sm:items-end sm:text-right' : 'sm:ml-auto sm:pl-10 sm:pr-0 sm:items-start sm:text-left'
                  }`}
                >
                  <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-surface text-primary sm:left-1/2 sm:-translate-x-1/2">
                    <TypeIcon className="h-4 w-4" aria-hidden="true" />
                  </span>

                  <div className="w-full rounded-2xl border border-border bg-surface p-5 shadow-card">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="default">{t(`experience.types.${item.type}`)}</Badge>
                      <span className="text-xs text-text-muted">{item.periodKey}</span>
                    </div>
                    <h3 className="font-display text-base font-semibold">{item.titleKey}</h3>
                    <p className="mt-0.5 text-sm font-medium text-primary">{item.organizationKey}</p>
                    <p className="mt-2 text-sm text-text-muted">{item.descriptionKey}</p>
                    {item.tags && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
