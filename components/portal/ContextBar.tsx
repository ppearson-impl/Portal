import Link from 'next/link';
import type { ProjectDetail } from '@/lib/types';
import { Badge } from '@/components/canvas/Badge';

function ragToVariant(s: string): 'green' | 'amber' | 'red' | 'grey' {
  if (s === 'green') return 'green';
  if (s === 'amber') return 'amber';
  if (s === 'red') return 'red';
  return 'grey';
}

interface ContextBarProps {
  project: ProjectDetail;
}

export function ContextBar({ project }: ContextBarProps) {
  const worstRag = (['red', 'amber', 'green', 'grey'] as const).find(
    (r) => Object.values(project.health).includes(r),
  ) ?? 'grey';

  return (
    <div className="bg-white border-b border-[var(--canvas-licorice-200)] px-6 py-3 flex items-center gap-3 flex-wrap">
      <nav className="text-sm text-[var(--canvas-licorice-400)] flex items-center gap-1">
        <Link href="/projects" className="hover:text-[var(--canvas-blueberry-400)]">Projects</Link>
        <span>/</span>
        <span className="text-[var(--canvas-licorice-500)]">{project.client}</span>
        <span>/</span>
        <span className="text-[var(--canvas-licorice-600)] font-medium">{project.name}</span>
      </nav>
      <div className="ml-auto flex items-center gap-2 flex-wrap">
        <Badge label={`Phase ${project.currentPhase} of ${project.totalPhases}`} variant="blue" />
        <Badge label={`Overall: ${ragToVariant(worstRag).charAt(0).toUpperCase() + ragToVariant(worstRag).slice(1)}`} variant={ragToVariant(worstRag)} />
        {project.openRisks > 0 && (
          <Badge label={`${project.openRisks} open risk${project.openRisks > 1 ? 's' : ''}`} variant="amber" />
        )}
        <Badge label={`${project.weeksRemaining}w to go-live`} variant="grey" />
      </div>
    </div>
  );
}
