import type { ReactNode } from 'react';

type BadgeVariant = 'green' | 'amber' | 'red' | 'blue' | 'grey';

const variantStyles: Record<BadgeVariant, string> = {
  green: 'bg-[var(--canvas-sourpatch-100)] text-[var(--canvas-sourpatch-500)] border-[var(--canvas-sourpatch-400)]',
  amber: 'bg-[var(--canvas-cantaloupe-100)] text-[var(--canvas-cantaloupe-500)] border-[var(--canvas-cantaloupe-400)]',
  red:   'bg-[var(--canvas-cinnamon-100)] text-[var(--canvas-cinnamon-500)] border-[var(--canvas-cinnamon-400)]',
  blue:  'bg-[var(--canvas-blueberry-100)] text-[var(--canvas-blueberry-500)] border-[var(--canvas-blueberry-400)]',
  grey:  'bg-[var(--canvas-licorice-200)] text-[var(--canvas-licorice-500)] border-[var(--canvas-licorice-300)]',
};

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
  icon?: ReactNode;
}

export function Badge({ label, variant, icon }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium border rounded-full ${variantStyles[variant]}`}>
      {icon}
      {label}
    </span>
  );
}
