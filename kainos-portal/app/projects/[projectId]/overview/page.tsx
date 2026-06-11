import { DEMO_MODE } from '@/lib/config';
import { globaltechProject } from '@/lib/mock';
import { PhaseTimeline } from '@/components/portal/PhaseTimeline';
import { Card } from '@/components/canvas/Card';
import { StatusIndicator } from '@/components/canvas/StatusIndicator';
import { Avatar } from '@/components/canvas/Avatar';
import { Badge } from '@/components/canvas/Badge';
import { notFound } from 'next/navigation';

interface OverviewPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function OverviewPage({ params }: OverviewPageProps) {
  const { projectId } = await params;

  if (!DEMO_MODE) notFound();
  if (projectId !== globaltechProject.id) notFound();

  const project = globaltechProject;

  const keyMilestones = [
    { name: 'Integration build complete', date: '2026-01-31', variant: 'amber' as const },
    { name: 'UAT kick-off',               date: '2026-01-15', variant: 'blue' as const },
    { name: 'Go-live',                     date: '2026-03-03', variant: 'blue' as const },
  ];

  return (
    <div className="flex gap-6 max-w-6xl mx-auto">
      {/* Main column */}
      <div className="flex-1 flex flex-col gap-6">
        <Card title="Delivery phases">
          <PhaseTimeline phases={project.phases} />
        </Card>

        <Card title="Health at a glance">
          <div className="grid grid-cols-2 gap-4">
            {(['schedule', 'budget', 'scope', 'risks'] as const).map((dim) => (
              <div key={dim} className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-[var(--canvas-licorice-400)]">{dim}</span>
                <StatusIndicator status={project.health[dim]} label={project.health[dim]} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="w-72 flex flex-col gap-6 flex-shrink-0">
        <Card title="Key milestones">
          <div className="flex flex-col gap-3">
            {keyMilestones.map((m) => (
              <div key={m.name} className="flex items-start justify-between gap-2">
                <span className="text-sm text-[var(--canvas-licorice-600)]">{m.name}</span>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-[var(--canvas-licorice-400)]">{m.date}</span>
                  <Badge label={m.name.includes('risk') ? 'at risk' : 'upcoming'} variant={m.variant} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Latest updates">
          <div className="flex flex-col gap-4">
            {project.recentUpdates.map((u) => (
              <div key={u.id} className="flex gap-2">
                <Avatar initials={u.authorInitials} size="sm" />
                <div>
                  <div className="text-xs font-medium text-[var(--canvas-licorice-600)]">{u.author}</div>
                  <div className="text-xs text-[var(--canvas-licorice-500)] mt-0.5">{u.message}</div>
                  <div className="text-xs text-[var(--canvas-licorice-400)] mt-0.5">
                    {new Date(u.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Delivery team card */}
        <div className="bg-[var(--canvas-blueberry-400)] rounded-[4px] p-4 text-white">
          <div className="text-sm font-medium mb-3">Delivery team</div>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2"><Avatar initials="KW" size="sm" dark /><span>Kate Wilson — PM</span></div>
            <div className="flex items-center gap-2"><Avatar initials="JM" size="sm" dark /><span>James Morton — Architect</span></div>
            <div className="flex items-center gap-2"><Avatar initials="SR" size="sm" dark /><span>Sunita Rao — Consultant</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
