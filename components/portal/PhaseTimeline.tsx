import type { Phase } from '@/lib/types';
import { Badge } from '@/components/canvas/Badge';

function phaseIcon(status: Phase['status']) {
  if (status === 'complete') return '✓';
  if (status === 'active') return '▶';
  return '🔒';
}

interface PhaseTimelineProps {
  phases: Phase[];
}

export function PhaseTimeline({ phases }: PhaseTimelineProps) {
  return (
    <div className="flex flex-col gap-0">
      {phases.map((phase, i) => {
        const isActive = phase.status === 'active';
        const isComplete = phase.status === 'complete';
        return (
          <div key={phase.number} className="flex gap-4">
            {/* connector column */}
            <div className="flex flex-col items-center w-8 flex-shrink-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 ${
                  isComplete ? 'bg-[var(--canvas-sourpatch-400)] text-white' :
                  isActive   ? 'bg-[var(--canvas-blueberry-400)] text-white' :
                               'bg-[var(--canvas-licorice-300)] text-[var(--canvas-licorice-600)]'
                }`}
              >
                {phaseIcon(phase.status)}
              </div>
              {i < phases.length - 1 && (
                <div className="w-0.5 flex-1 bg-[var(--canvas-licorice-200)] my-1" />
              )}
            </div>
            {/* content */}
            <div className={`flex-1 pb-6 ${isActive ? 'border-l-2 border-[var(--canvas-blueberry-400)] pl-3 -ml-0.5' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-medium ${isActive ? 'text-[var(--canvas-blueberry-400)]' : 'text-[var(--canvas-licorice-600)]'}`}>
                  Phase {phase.number} — {phase.name}
                </span>
                <span className="text-xs text-[var(--canvas-licorice-400)]">
                  {phase.startDate.slice(0, 7)} → {phase.endDate.slice(0, 7)}
                </span>
              </div>
              {phase.status !== 'upcoming' && (
                <div className="w-full bg-[var(--canvas-licorice-200)] rounded-full h-1.5 mb-2">
                  <div
                    className={`h-1.5 rounded-full ${isComplete ? 'bg-[var(--canvas-sourpatch-400)]' : 'bg-[var(--canvas-blueberry-400)]'}`}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {phase.tags.map((tag) => (
                  <Badge
                    key={tag}
                    label={tag}
                    variant={
                      phase.statusTag === 'green' ? 'green' :
                      phase.statusTag === 'amber' ? 'amber' :
                      phase.statusTag === 'red'   ? 'red'   :
                      phase.statusTag === 'grey'  ? 'grey'  : 'blue'
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
