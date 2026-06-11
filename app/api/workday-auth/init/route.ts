import { NextResponse } from 'next/server';
import { parseTenantUrl } from '@/lib/workday/oauth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { tenantUrl } = await req.json();
  if (!tenantUrl) {
    return NextResponse.json({ error: 'tenantUrl is required' }, { status: 400 });
  }

  const config = parseTenantUrl(tenantUrl);
  if (!config) {
    return NextResponse.json({ error: 'Invalid Workday tenant URL' }, { status: 400 });
  }

  const clientId   = process.env.WORKDAY_CLIENT_ID ?? '';
  const appBaseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
  const redirectUri = `${appBaseUrl}/api/workday-auth/callback`;

  // Store tenant config in a short-lived cookie for the callback to read
  const cookieStore = await cookies();
  cookieStore.set('wd_tenant_config', JSON.stringify(config), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutes — enough for the OAuth round-trip
    path: '/',
  });

  // Build Workday authorization URL
  const params = new URLSearchParams({
    response_type: 'code',
    client_id:     clientId,
    redirect_uri:  redirectUri,
    scope:         'openid profile email',
  });

  const authorizeUrl = `${config.authorizeUrl}?${params.toString()}`;

  return NextResponse.json({ authorizeUrl });
}
