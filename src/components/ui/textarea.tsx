import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-32 w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text',
        'placeholder:text-text-muted transition-colors duration-200 resize-y',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        invalid ? 'border-red-500/60' : 'border-border focus:border-primary/50',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';
