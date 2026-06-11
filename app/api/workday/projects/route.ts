import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { DEMO_MODE } from '@/lib/config';
import { mockProjects } from '@/lib/mock';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const projectIds = (session.user as { projectIds: string[] }).projectIds ?? [];

  if (DEMO_MODE) {
    const projects = mockProjects.filter((p) => projectIds.includes(p.id));
    return NextResponse.json(projects);
  }

  // Production: fetch from Workday
  const { workdayClient } = await import('@/lib/workday/client');
  const data = await workdayClient.get<{ projects: unknown[] }>('/projects');
  return NextResponse.json(data.projects);
}
