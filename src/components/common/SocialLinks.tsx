import { socialLinks } from '@/data/profile';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {socialLinks.map((link) => {
        const Icon = getIcon(link.icon);
        return (
          <a
            key={link.id}
            href={link.url}
            target={link.id === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface',
              'text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-glow',
              iconClassName,
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
