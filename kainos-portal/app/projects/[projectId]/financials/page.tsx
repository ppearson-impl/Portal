import { DEMO_MODE } from '@/lib/config';
import { globaltechFinancials } from '@/lib/mock';
import { MetricCard } from '@/components/canvas/MetricCard';
import { Card } from '@/components/canvas/Card';
import { Banner } from '@/components/canvas/Banner';
import { BurnChart } from '@/components/portal/BurnChart';
import { WorkstreamBars } from '@/components/portal/WorkstreamBars';
import { RoleHoursTable } from '@/components/portal/RoleHoursTable';
import { EVMetrics } from '@/components/portal/EVMetrics';
import { notFound } from 'next/navigation';

interface FinancialsPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function FinancialsPage({ params }: FinancialsPageProps) {
  const { projectId } = await params;
  if (!DEMO_MODE) notFound();
  if (projectId !== globaltechFinancials.projectId) notFound();

  const fin = globaltechFinancials;
  const ev = fin.ev;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* KPI strip */}
      <div className="grid grid-cols-5 gap-3">
        <MetricCard label="Contract value"       value={`£${(ev.bac / 1000).toFixed(0)}k`} />
        <MetricCard label="Hours consumed"       value={`${ev.hoursConsumed.toLocaleString()}h`} sub={`of ${ev.hoursContracted}h contracted`} />
        <MetricCard label="Earned value"         value={`£${(ev.earnedValue / 1000).toFixed(0)}k`} sub={ev.cpi >= 1 ? 'On track' : 'Below plan'} subVariant={ev.cpi >= 1 ? 'green' : 'amber'} />
        <MetricCard label="Forecast at completion" value={`£${(ev.eac / 1000).toFixed(0)}k`} sub={ev.vac >= 0 ? `£${(ev.vac / 1000).toFixed(0)}k under` : `£${(Math.abs(ev.vac) / 1000).toFixed(0)}k over`} subVariant={ev.vac >= 0 ? 'green' : 'amber'} />
        <MetricCard label="Hours remaining"      value={`${ev.hoursRemaining.toLocaleString()}h`} sub={`Period: ${fin.periodLabel}`} />
      </div>

      {/* Burn chart */}
      <Card title={`Earned value burn — ${fin.periodLabel}`}>
        <BurnChart burnSeries={fin.burnSeries} />
      </Card>

      {/* Two column */}
      <div className="flex gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <Card title="Budget by workstream">
            <WorkstreamBars workstreams={fin.workstreams} />
          </Card>
          <Card title="Hours by role">
            <RoleHoursTable roles={fin.roleHours} />
          </Card>
        </div>
        <div className="w-60 flex flex-col gap-4 flex-shrink-0">
          <Card title="EV metrics">
            <EVMetrics ev={ev} />
          </Card>
          {ev.cpi < 1 && (
            <Banner variant="warning">
              <strong>CPI below 1.0</strong> — project is currently spending more than earned value.
              Forecast at completion is £{(ev.eac / 1000).toFixed(0)}k vs budget £{(ev.bac / 1000).toFixed(0)}k.
              Recommend reviewing scope or increasing pace on integration deliverables.
            </Banner>
          )}
        </div>
      </div>
    </div>
  );
}
