import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DEMO_MODE } from '@/lib/config';
import { globaltechProject } from '@/lib/mock';
import { GlobalNav } from '@/components/portal/GlobalNav';
import { ContextBar } from '@/components/portal/ContextBar';
import { ProjectTabs } from '@/components/portal/ProjectTabs';
import type { ProjectDetail } from '@/lib/types';

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { projectId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const projectIds = (session.user as { projectIds: string[] }).projectIds ?? [];
  if (!projectIds.includes(projectId)) notFound();

  let project: ProjectDetail;
  if (DEMO_MODE) {
    if (projectId !== globaltechProject.id) notFound();
    project = globaltechProject;
  } else {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/workday/projects/${projectId}`, { cache: 'no-store' });
    if (!res.ok) notFound();
    project = await res.json();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalNav />
      <ContextBar project={project} />
      <ProjectTabs projectId={projectId} />
      <main className="flex-1 bg-[var(--canvas-soap-300)] p-6">
        {children}
      </main>
    </div>
  );
}
