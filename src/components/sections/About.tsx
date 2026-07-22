import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { softSkills, languages } from '@/data/profile';

const STATS = [
  { key: 'projects', value: 20, suffix: '+' },
  { key: 'experience', value: 3, suffix: '+' },
  { key: 'technologies', value: 15, suffix: '+' },
  { key: 'satisfaction', value: 100, suffix: '%' },
] as const;

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-extrabold text-gradient">
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow={t('nav.about')} title={t('about.title')} subtitle={t('about.subtitle')} />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection direction="right" className="space-y-5 text-text-muted">
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
            <p>{t('about.paragraph3')}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {softSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-text">{lang.name}</span>
                    <span className="text-text-muted">{lang.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${lang.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.key}
                  className="rounded-2xl border border-border bg-surface p-6 text-center shadow-card"
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-sm text-text-muted">{t(`about.stats.${stat.key}`)}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
