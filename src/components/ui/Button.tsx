import { type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClass: Record<Variant, string> = {
  primary:
    'bg-ink text-white border border-ink hover:bg-[#243044] disabled:opacity-40',
  outline:
    'bg-surface text-ink border border-ink hover:bg-canvas disabled:opacity-40 disabled:border-border-strong disabled:text-ink-muted',
  ghost:
    'bg-transparent text-ink border border-transparent hover:bg-canvas disabled:opacity-40',
};

export function Button({
  variant = 'outline',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-control)] px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
