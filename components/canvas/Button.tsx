import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

const styles: Record<ButtonVariant, string> = {
  primary:   'bg-[var(--canvas-blueberry-400)] text-white hover:bg-[var(--canvas-blueberry-500)] rounded-full px-5 py-2 text-sm font-medium',
  secondary: 'bg-transparent text-[var(--canvas-blueberry-400)] border border-[var(--canvas-blueberry-400)] hover:bg-[var(--canvas-blueberry-100)] rounded-[4px] px-4 py-2 text-sm font-medium',
  tertiary:  'bg-transparent text-[var(--canvas-blueberry-400)] hover:underline px-2 py-1 text-sm',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`inline-flex items-center justify-center transition-colors cursor-pointer ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
