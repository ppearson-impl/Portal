import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Badge } from '@/components/canvas/Badge';
import { StatusIndicator } from '@/components/canvas/StatusIndicator';

interface ProjectListViewProps {
  projects: Project[];
}

function ragVariant(s: string): 'green' | 'amber' | 'red' | 'grey' {
  if (s === 'green') return 'green';
  if (s === 'amber') return 'amber';
  if (s === 'red')   return 'red';
  return 'grey';
}

export function ProjectListView({ projects }: ProjectListViewProps) {
  if (projects.length === 0) {
    return <p className="text-sm text-[var(--canvas-licorice-400)]">No projects assigned to your account.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {projects.map((p) => (
        <Link
          key={p.id}
          href={`/projects/${p.id}/overview`}
          className="block bg-white border border-[var(--canvas-licorice-200)] rounded-[4px] p-6 hover:border-[var(--canvas-blueberry-400)] transition-colors group"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="text-xs text-[var(--canvas-licorice-400)] mb-0.5">{p.client} · {p.region}</div>
              <h2 className="text-base font-semibold text-[var(--canvas-licorice-600)] group-hover:text-[var(--canvas-blueberry-400)]">
                {p.name}
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <Badge label={`Phase ${p.currentPhase}/${p.totalPhases}`} variant="blue" />
              <Badge label={p.contractType} variant="grey" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[var(--canvas-licorice-200)] rounded-full h-1.5 mb-3">
            <div
              className="h-1.5 rounded-full bg-[var(--canvas-blueberry-400)]"
              style={{ width: `${p.overallProgress}%` }}
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <StatusIndicator status={p.health.schedule} label={`Schedule: ${p.health.schedule}`} />
            <StatusIndicator status={p.health.budget}   label={`Budget: ${p.health.budget}`} />
            <StatusIndicator status={p.health.scope}    label={`Scope: ${p.health.scope}`} />
            <StatusIndicator status={p.health.risks}    label={`Risks: ${p.health.risks}`} />
            <span className="ml-auto text-xs text-[var(--canvas-licorice-400)]">
              Go-live: {p.goLiveDate} · {p.weeksRemaining}w remaining
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
