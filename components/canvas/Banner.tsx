import type { ReactNode } from 'react';

type BannerVariant = 'info' | 'warning' | 'error';

const styles: Record<BannerVariant, string> = {
  info:    'bg-[var(--canvas-blueberry-100)] border-[var(--canvas-blueberry-400)] text-[var(--canvas-blueberry-500)]',
  warning: 'bg-[var(--canvas-cantaloupe-100)] border-[var(--canvas-cantaloupe-400)] text-[var(--canvas-cantaloupe-500)]',
  error:   'bg-[var(--canvas-cinnamon-100)] border-[var(--canvas-cinnamon-400)] text-[var(--canvas-cinnamon-500)]',
};

interface BannerProps {
  variant?: BannerVariant;
  children: ReactNode;
}

export function Banner({ variant = 'info', children }: BannerProps) {
  return (
    <div className={`border-l-4 rounded-[4px] px-4 py-3 text-sm ${styles[variant]}`}>
      {children}
    </div>
  );
}
