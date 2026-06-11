import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { exchangeCodeForToken, getWorkdayUserInfo } from '@/lib/workday/oauth';
import type { WorkdayTenantConfig } from '@/lib/workday/oauth';

export async function GET(req: Request) {
  const appBaseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
  const { searchParams } = new URL(req.url);

  const code  = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${appBaseUrl}/login?error=workday_denied`);
  }

  if (!code) {
    return NextResponse.redirect(`${appBaseUrl}/login?error=no_code`);
  }

  // Read tenant config from cookie
  const cookieStore = await cookies();
  const raw = cookieStore.get('wd_tenant_config')?.value;
  if (!raw) {
    return NextResponse.redirect(`${appBaseUrl}/login?error=session_expired`);
  }

  let config: WorkdayTenantConfig;
  try {
    config = JSON.parse(raw);
  } catch {
    return NextResponse.redirect(`${appBaseUrl}/login?error=bad_config`);
  }

  const redirectUri = `${appBaseUrl}/api/workday-auth/callback`;

  let tokens;
  try {
    tokens = await exchangeCodeForToken(config, code, redirectUri);
  } catch (e) {
    console.error('Workday token exchange failed:', e);
    return NextResponse.redirect(`${appBaseUrl}/login?error=token_exchange`);
  }

  let userInfo;
  try {
    userInfo = await getWorkdayUserInfo(config, tokens.access_token);
  } catch {
    userInfo = { sub: 'workday-user', name: 'Workday User', email: '' };
  }

  // Clear the tenant cookie
  cookieStore.delete('wd_tenant_config');

  // Pass token + user info to the NextAuth workday-oauth credentials provider
  // via a redirect to a special sign-in relay page
  const params = new URLSearchParams({
    workdayToken:   tokens.access_token,
    workdayUser:    JSON.stringify(userInfo),
    workdayTenant:  config.tenant,
    workdayBaseUrl: config.apiBaseUrl,
  });

  return NextResponse.redirect(`${appBaseUrl}/auth/workday-relay?${params.toString()}`);
}
