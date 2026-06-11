import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { DEMO_MODE } from '@/lib/config';
import { globaltechTeam } from '@/lib/mock';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const projectIds = (session.user as { projectIds: string[] }).projectIds ?? [];
  if (!projectIds.includes(id)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  if (DEMO_MODE) {
    return NextResponse.json(globaltechTeam);
  }

  const { workdayClient } = await import('@/lib/workday/client');
  const data = await workdayClient.get(`/team/${id}`);
  return NextResponse.json(data);
}
