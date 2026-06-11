import type { RAGStatus } from '@/lib/types';

const dotColour: Record<RAGStatus, string> = {
  green: 'bg-[var(--canvas-sourpatch-400)]',
  amber: 'bg-[var(--canvas-cantaloupe-400)]',
  red:   'bg-[var(--canvas-cinnamon-400)]',
  grey:  'bg-[var(--canvas-licorice-300)]',
};

interface StatusIndicatorProps {
  status: RAGStatus;
  label: string;
}

export function StatusIndicator({ status, label }: StatusIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColour[status]}`} />
      <span className="text-sm text-[var(--canvas-licorice-500)]">{label}</span>
    </span>
  );
}
