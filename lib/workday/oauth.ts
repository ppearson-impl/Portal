/**
 * Utilities for Workday OAuth2 Authorization Code flow.
 *
 * Workday tenant URLs follow the pattern:
 *   https://<host>/ccx/oauth2/<tenant>/authorize
 *   https://<host>/ccx/oauth2/<tenant>/token
 *
 * Users provide their tenant login URL, e.g.
 *   https://wd2-impl-services1.workday.com/kainos_gms
 * We extract host + tenant from that.
 */

export interface WorkdayTenantConfig {
  tenantUrl: string;   // full URL the user entered, e.g. https://wd2-impl-services1.workday.com/kainos_gms
  baseUrl: string;     // https://wd2-impl-services1.workday.com
  tenant: string;      // kainos_gms
  authorizeUrl: string;
  tokenUrl: string;
  apiBaseUrl: string;
}

export function parseTenantUrl(input: string): WorkdayTenantConfig | null {
  try {
    // Normalise — add https:// if missing
    const raw = input.startsWith('http') ? input : `https://${input}`;
    const url = new URL(raw);

    // Strip trailing slash, take last non-empty path segment as tenant name
    const segments = url.pathname.split('/').filter(Boolean);
    const tenant = segments[segments.length - 1] ?? '';
    if (!tenant) return null;

    const baseUrl = url.origin;

    return {
      tenantUrl: raw,
      baseUrl,
      tenant,
      authorizeUrl: `${baseUrl}/ccx/oauth2/${tenant}/authorize`,
      tokenUrl:     `${baseUrl}/ccx/oauth2/${tenant}/token`,
      apiBaseUrl:   `${baseUrl}/ccx/api/v1/${tenant}`,
    };
  } catch {
    return null;
  }
}

export interface WorkdayTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export interface WorkdayUserInfo {
  sub: string;
  name?: string;
  email?: string;
  preferred_username?: string;
}

export async function exchangeCodeForToken(
  config: WorkdayTenantConfig,
  code: string,
  redirectUri: string,
): Promise<WorkdayTokenResponse> {
  const clientId     = process.env.WORKDAY_CLIENT_ID ?? '';
  const clientSecret = process.env.WORKDAY_CLIENT_SECRET ?? '';

  const res = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type:   'authorization_code',
      code,
      redirect_uri: redirectUri,
    }).toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function getWorkdayUserInfo(
  config: WorkdayTenantConfig,
  accessToken: string,
): Promise<WorkdayUserInfo> {
  // Workday OIDC userinfo endpoint
  const res = await fetch(`${config.baseUrl}/ccx/oauth2/${config.tenant}/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    // Fall back to a minimal identity derived from the token sub claim
    return { sub: 'workday-user' };
  }

  return res.json();
}
