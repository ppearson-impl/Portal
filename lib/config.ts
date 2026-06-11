export const DEMO_MODE = process.env.DEMO_MODE === 'true';
export const WORKDAY_TENANT = process.env.WORKDAY_TENANT ?? '';
export const WORKDAY_CLIENT_ID = process.env.WORKDAY_CLIENT_ID ?? '';
export const WORKDAY_CLIENT_SECRET = process.env.WORKDAY_CLIENT_SECRET ?? '';
export const WORKDAY_REFRESH_TOKEN = process.env.WORKDAY_REFRESH_TOKEN ?? '';
export const WORKDAY_BASE_URL = process.env.WORKDAY_BASE_URL ?? `https://${WORKDAY_TENANT}.workday.com/ccx/api/v1/${WORKDAY_TENANT}`;
export const WORKDAY_TOKEN_URL = process.env.WORKDAY_TOKEN_URL ?? `https://wd2-impl-services1.workday.com/ccx/oauth2/${WORKDAY_TENANT}/token`;
