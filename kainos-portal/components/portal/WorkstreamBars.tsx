import type { Workstream } from '@/lib/types';

interface WorkstreamBarsProps {
  workstreams: Workstream[];
}

export function WorkstreamBars({ workstreams }: WorkstreamBarsProps) {
  return (
    <div className="flex flex-col gap-3">
      {workstreams.map((ws) => {
        const pct = Math.round((ws.usedHours / ws.budgetHours) * 100);
        const over = pct > 100;
        return (
          <div key={ws.name}>
            <div className="flex justify-between text-xs text-[var(--canvas-licorice-500)] mb-1">
              <span>{ws.name}</span>
              <span className={over ? 'text-[var(--canvas-cinnamon-500)]' : ''}>
                {ws.usedHours} / {ws.budgetHours}h ({pct}%)
              </span>
            </div>
            <div className="w-full bg-[var(--canvas-licorice-200)] rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${Math.min(pct, 100)}%`,
                  backgroundColor: over ? 'var(--canvas-cinnamon-400)' : ws.colour,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
