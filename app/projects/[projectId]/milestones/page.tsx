import { DEMO_MODE } from '@/lib/config';
import { globaltechMilestones, globaltechRisks } from '@/lib/mock';
import { Card } from '@/components/canvas/Card';
import { MilestoneList } from '@/components/portal/MilestoneList';
import { RiskRegister } from '@/components/portal/RiskRegister';
import { notFound } from 'next/navigation';

interface MilestonesPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function MilestonesPage({ params }: MilestonesPageProps) {
  const { projectId } = await params;
  if (!DEMO_MODE) notFound();
  if (projectId !== 'globaltech-hcm-emea') notFound();

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <Card title="Milestones">
        <MilestoneList milestones={globaltechMilestones} />
      </Card>
      <Card title="Risk register">
        <RiskRegister risks={globaltechRisks} />
      </Card>
    </div>
  );
}
