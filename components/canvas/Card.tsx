import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  titleRight?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, titleRight, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-[var(--canvas-licorice-200)] rounded-[4px] ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--canvas-licorice-200)]">
          <h2 className="text-base font-medium text-[var(--canvas-licorice-600)]">{title}</h2>
          {titleRight && <div>{titleRight}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
