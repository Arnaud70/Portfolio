import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/common/SocialLinks';
import { profile } from '@/data/profile';

const ROLE_DISPLAY_MS = 2400;

export function Hero() {
  const { t } = useTranslation();
  const roles = t('hero.roles', { returnObjects: true }) as string[];
  const [roleIndex, setRoleIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const id = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      ROLE_DISPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [roles.length]);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100dvh-6rem)] items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Decorative gradient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-0 h-[28rem] w-[28rem] rounded-full bg-secondary/20 blur-[120px]"
      />

      <div className="section-container grid grid-cols-1 items-center gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-medium text-text-muted"
          >
            {t('hero.greeting')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">{t('hero.name')}</span>
          </motion.h1>

          <div className="mt-4 h-10 sm:h-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={prefersReducedMotion ? 'static' : roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="font-display text-2xl font-semibold text-primary sm:text-3xl"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl text-balance text-base text-text-muted sm:text-lg"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.ctaProjects')}
            </Button>
            <Button size="lg" variant="secondary" onClick={() => window.open(profile.cvUrl, '_blank')}>
              {t('hero.ctaCv')}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10"
          >
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-sm"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 animate-[float_6s_ease-in-out_infinite] rounded-[2rem] bg-gradient-to-tr from-primary via-secondary to-accent opacity-30 blur-2xl"
          />
          <div className="h-full w-full overflow-hidden rounded-[2rem] border border-border bg-surface shadow-glow">
            <picture>
              <source srcSet={`${profile.avatarUrl.replace(/\.jpg$/, '.webp')}`} type="image/webp" />
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
                width={480}
                height={480}
              />
            </picture>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
