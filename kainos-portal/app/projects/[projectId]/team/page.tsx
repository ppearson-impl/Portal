import { DEMO_MODE } from '@/lib/config';
import { globaltechTeam } from '@/lib/mock';
import { TeamCard } from '@/components/portal/TeamCard';
import { notFound } from 'next/navigation';

interface TeamPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { projectId } = await params;
  if (!DEMO_MODE) notFound();
  if (projectId !== 'globaltech-hcm-emea') notFound();

  const kainosTeam = globaltechTeam.filter((m) => m.isKainos);
  const clientTeam = globaltechTeam.filter((m) => !m.isKainos);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <section>
        <h2 className="text-sm font-semibold text-[var(--canvas-licorice-400)] uppercase tracking-wide mb-4">Kainos delivery team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {kainosTeam.map((m) => <TeamCard key={m.id} member={m} />)}
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold text-[var(--canvas-licorice-400)] uppercase tracking-wide mb-4">Client team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {clientTeam.map((m) => <TeamCard key={m.id} member={m} />)}
        </div>
      </section>
    </div>
  );
}
