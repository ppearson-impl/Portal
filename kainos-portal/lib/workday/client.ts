import {
  WORKDAY_CLIENT_ID,
  WORKDAY_CLIENT_SECRET,
  WORKDAY_REFRESH_TOKEN,
  WORKDAY_BASE_URL,
  WORKDAY_TOKEN_URL,
} from '../config';

class WorkdayAPIError extends Error {
  constructor(public status: number, public path: string) {
    super(`Workday API error ${status} on ${path}`);
  }
}

class WorkdayClient {
  private accessToken: string | null = null;
  private tokenExpiresAt = 0;

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiresAt - 60_000) {
      return this.accessToken;
    }
    const res = await fetch(WORKDAY_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${WORKDAY_CLIENT_ID}:${WORKDAY_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${WORKDAY_REFRESH_TOKEN}`,
    });
    if (!res.ok) throw new WorkdayAPIError(res.status, '/token');
    const data = await res.json();
    this.accessToken = data.access_token;
    this.tokenExpiresAt = Date.now() + data.expires_in * 1000;
    return this.accessToken!;
  }

  async get<T>(path: string): Promise<T> {
    const token = await this.getAccessToken();
    const res = await fetch(`${WORKDAY_BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new WorkdayAPIError(res.status, path);
    return res.json();
  }
}

export const workdayClient = new WorkdayClient();
