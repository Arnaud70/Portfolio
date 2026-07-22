import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { buttonVariants } from '@/components/ui/button';
import { serviceItems } from '@/data/profile';
import { getIcon } from '@/lib/icons';

export function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow={t('nav.services')} title={t('services.title')} subtitle={t('services.subtitle')} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((service, idx) => {
            const Icon = getIcon(service.icon);
            return (
              <AnimatedSection
                key={service.id}
                delay={idx * 0.06}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all duration-300 group-hover:bg-primary/20"
                />
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="relative font-display text-base font-semibold">{t(service.titleKey)}</h3>
                <p className="relative mt-2 text-sm text-text-muted">{t(service.descriptionKey)}</p>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-14 flex justify-center">
          <a href="#contact" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
            {t('services.cta')}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
