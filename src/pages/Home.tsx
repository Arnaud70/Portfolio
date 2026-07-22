import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '@/components/common/SEO';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { Certifications } from '@/components/sections/Certifications';
import { GithubStats } from '@/components/sections/GithubStats';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    // Wait a tick so the sections are mounted before we try to scroll to them.
    const timeout = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => window.clearTimeout(timeout);
  }, [hash]);

  return (
    <>
      <SEO path="/" type="profile" />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Certifications />
      <GithubStats />
      <Contact />
    </>
  );
}
