import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DEMO_MODE } from '@/lib/config';
import { mockProjects } from '@/lib/mock';
import { GlobalNav } from '@/components/portal/GlobalNav';
import { ProjectListView } from '@/components/portal/ProjectListView';

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const projectIds = (session.user as { projectIds: string[] }).projectIds ?? [];

  const projects = DEMO_MODE
    ? mockProjects.filter((p) => projectIds.includes(p.id))
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalNav />
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <h1 className="text-xl font-semibold text-[var(--canvas-licorice-600)] mb-6">Your projects</h1>
        <ProjectListView projects={projects} />
      </main>
    </div>
  );
}
