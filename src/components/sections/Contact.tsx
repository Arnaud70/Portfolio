import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getIcon } from '@/lib/icons';
import { profile } from '@/data/profile';
import type { ContactFormErrors, ContactFormValues } from '@/types';

const EMPTY_FORM: ContactFormValues = { name: '', email: '', subject: '', message: '' };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const { t } = useTranslation();
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitState>('idle');
  const [missingConfig, setMissingConfig] = useState(false);

  const MailIcon = getIcon('email');
  const PhoneIcon = getIcon('whatsapp');
  const LinkedinIcon = getIcon('linkedin');
  const GithubIcon = getIcon('github');
  const SendIcon = getIcon('externalLink');
  const SuccessIcon = getIcon('success');
  const ErrorIcon = getIcon('error');

  function validate(v: ContactFormValues): ContactFormErrors {
    const next: ContactFormErrors = {};
    if (!v.name.trim()) next.name = t('contact.form.errors.nameRequired');
    if (!v.email.trim()) next.email = t('contact.form.errors.emailRequired');
    else if (!EMAIL_REGEX.test(v.email)) next.email = t('contact.form.errors.emailInvalid');
    if (!v.subject.trim()) next.subject = t('contact.form.errors.subjectRequired');
    if (!v.message.trim()) next.message = t('contact.form.errors.messageRequired');
    else if (v.message.trim().length < 10) next.message = t('contact.form.errors.messageTooShort');
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    setStatus('submitting');
    try {
      if (!serviceId || !templateId || !publicKey) {
        setMissingConfig(true);
        setStatus('error');
        return;
      }
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: values.message,
          to_email: profile.email,
        },
        { publicKey },
      );
      setStatus('success');
      setValues(EMPTY_FORM);
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setStatus('error');
    }
  }

  function handleChange(field: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function copyEnvExample() {
    const txt = `VITE_EMAILJS_SERVICE_ID=service_5swz71c\nVITE_EMAILJS_TEMPLATE_ID=template_4nkitdm\nVITE_EMAILJS_PUBLIC_KEY=_AoD4g18c0It_6Ndr`;
    void navigator.clipboard?.writeText(txt);
    // small visual feedback could be added
  }

  return (
    <section id="contact" className="bg-surface/30 py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading eyebrow={t('nav.contact')} title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <AnimatedSection direction="right" className="space-y-4">
            <h3 className="font-display text-lg font-semibold">{t('contact.info.title')}</h3>
            {[
              { icon: MailIcon, label: t('contact.info.email'), value: profile.email, href: `mailto:${profile.email}` },
              { icon: PhoneIcon, label: t('contact.info.whatsapp'), value: profile.phone, href: profile.whatsapp },
              { icon: LinkedinIcon, label: t('contact.info.linkedin'), value: 'LinkedIn ↗', href: profile.linkedinUrl },
              {
                icon: GithubIcon,
                label: t('contact.info.github'),
                value: `github.com/${profile.githubUsername}`,
                href: `https://github.com/${profile.githubUsername}`,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/40"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-text-muted">{item.label}</span>
                  <span className="text-sm font-medium text-text">{item.value}</span>
                </span>
              </a>
            ))}
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder={t('contact.form.namePlaceholder')}
                    value={values.name}
                    invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    value={values.email}
                    invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-text">
                  {t('contact.form.subject')}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  value={values.subject}
                  invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  onChange={(e) => handleChange('subject', e.target.value)}
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1.5 text-xs text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t('contact.form.messagePlaceholder')}
                  value={values.message}
                  invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  onChange={(e) => handleChange('message', e.target.value)}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
                {status === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
                {status !== 'submitting' && <SendIcon className="h-3.5 w-3.5" aria-hidden="true" />}
              </Button>

              <div role="status" aria-live="polite">
                {status === 'success' && (
                  <p className="flex items-center gap-2 text-sm text-emerald-400">
                    <SuccessIcon className="h-4 w-4" aria-hidden="true" />
                    {t('contact.form.success')}
                  </p>
                )}
                {status === 'error' && (
                  <div>
                    {missingConfig ? (
                      <div className="flex flex-col gap-2">
                        <p className="flex items-center gap-2 text-sm text-yellow-400">
                          <ErrorIcon className="h-4 w-4" aria-hidden="true" />
                          EmailJS non configuré — ajoute les variables d'environnement `VITE_EMAILJS_*` et redémarre le serveur.
                        </p>
                        <p className="text-sm text-text-muted">Copier les valeurs d'exemple (colle dans un fichier <span className="font-mono">.env</span> à la racine) :</p>
                        <pre className="rounded-md bg-surface-2 p-2 text-xs">VITE_EMAILJS_SERVICE_ID=service_5swz71c
VITE_EMAILJS_TEMPLATE_ID=template_4nkitdm
VITE_EMAILJS_PUBLIC_KEY=_AoD4g18c0It_6Ndr</pre>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={copyEnvExample}>Copier les valeurs</Button>
                        </div>
                      </div>
                    ) : (
                      <p className="flex items-center gap-2 text-sm text-red-400">
                        <ErrorIcon className="h-4 w-4" aria-hidden="true" />
                        {t('contact.form.error')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
