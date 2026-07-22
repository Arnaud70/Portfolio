import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { skillCategories } from '@/data/profile';
import { getIcon } from '@/lib/icons';

export function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="bg-surface/30 py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow={t('nav.skills')} title={t('skills.title')} subtitle={t('skills.subtitle')} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, idx) => {
            const CategoryIcon = getIcon(category.icon);
            return (
              <AnimatedSection
                key={category.id}
                delay={idx * 0.08}
                className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <CategoryIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-4 font-display text-lg font-semibold">{t(category.titleKey)}</h3>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const SkillIcon = getIcon(skill.icon);
                    return (
                      <li
                        key={skill.name}
                        className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-xs font-medium text-text-muted"
                      >
                        <SkillIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {skill.name}
                      </li>
                    );
                  })}
                </ul>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
