import type { Milestone } from '@/lib/types';
import { Badge } from '@/components/canvas/Badge';

const statusVariant: Record<Milestone['status'], 'green' | 'blue' | 'amber' | 'red'> = {
  complete: 'green',
  upcoming: 'blue',
  'at-risk': 'amber',
  overdue: 'red',
};

interface MilestoneListProps {
  milestones: Milestone[];
}

export function MilestoneList({ milestones }: MilestoneListProps) {
  return (
    <div className="flex flex-col divide-y divide-[var(--canvas-licorice-200)]">
      {milestones.map((m) => (
        <div key={m.id} className="py-3 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-[var(--canvas-licorice-600)]">{m.name}</div>
            {m.notes && <div className="text-xs text-[var(--canvas-licorice-400)] mt-0.5">{m.notes}</div>}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-[var(--canvas-licorice-400)]">{m.targetDate}</span>
            <Badge label={m.status.replace('-', ' ')} variant={statusVariant[m.status]} />
          </div>
        </div>
      ))}
    </div>
  );
}
