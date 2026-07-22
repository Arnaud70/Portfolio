import { AnimatedSection } from '@/components/common/AnimatedSection';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <AnimatedSection
      className={`mb-12 flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="max-w-2xl text-balance text-text-muted">{subtitle}</p>}
    </AnimatedSection>
  );
}
