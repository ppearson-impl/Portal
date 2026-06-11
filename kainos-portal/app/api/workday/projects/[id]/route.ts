import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { DEMO_MODE } from '@/lib/config';
import { globaltechProject } from '@/lib/mock';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const projectIds = (session.user as { projectIds: string[] }).projectIds ?? [];
  if (!projectIds.includes(id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  if (DEMO_MODE) {
    if (id !== globaltechProject.id) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(globaltechProject);
  }

  const { workdayClient } = await import('@/lib/workday/client');
  const data = await workdayClient.get(`/projects/${id}`);
  return NextResponse.json(data);
}
