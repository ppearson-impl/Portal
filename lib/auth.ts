import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const DEMO_USERS = [
  {
    id: 'client-1',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@globaltech.com',
    role: 'client' as const,
    projectIds: ['globaltech-hcm-emea'],
    password: process.env.DEMO_CLIENT_PASSWORD ?? 'demo-client-2026',
  },
  {
    id: 'kainos-1',
    name: 'Kate Wilson',
    email: 'kate.wilson@kainos.com',
    role: 'delivery' as const,
    projectIds: ['globaltech-hcm-emea'],
    password: process.env.DEMO_KAINOS_PASSWORD ?? 'demo-kainos-2026',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    // Demo credentials provider
    CredentialsProvider({
      id: 'demo-credentials',
      name: 'Demo credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = DEMO_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password,
        );
        if (!user) return null;
        const { password: _, ...safe } = user;
        return { ...safe, authMethod: 'demo' };
      },
    }),
    // Workday OAuth provider — tokens pre-validated by /api/workday-auth/callback
    CredentialsProvider({
      id: 'workday-oauth',
      name: 'Workday',
      credentials: {
        workdayToken:   { label: 'Workday access token', type: 'text' },
        workdayUser:    { label: 'Workday user JSON',    type: 'text' },
        workdayTenant:  { label: 'Workday tenant',       type: 'text' },
        workdayBaseUrl: { label: 'Workday base URL',     type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.workdayToken || !credentials?.workdayUser) return null;
        try {
          const user = JSON.parse(credentials.workdayUser);
          return {
            id:          user.sub ?? 'workday-user',
            name:        user.name ?? user.preferred_username ?? 'Workday User',
            email:       user.email ?? '',
            role:        'client' as const,
            projectIds:  [] as string[],      // populated from Workday on first project load
            authMethod:  'workday',
            accessToken: credentials.workdayToken,
            tenant:      credentials.workdayTenant,
            apiBaseUrl:  credentials.workdayBaseUrl,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as Record<string, unknown>;
        token.id          = u.id;
        token.role        = u.role;
        token.projectIds  = u.projectIds;
        token.authMethod  = u.authMethod;
        token.accessToken = u.accessToken;
        token.tenant      = u.tenant;
        token.apiBaseUrl  = u.apiBaseUrl;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const u = session.user as Record<string, unknown>;
        u.id          = token.id;
        u.role        = token.role;
        u.projectIds  = token.projectIds;
        u.authMethod  = token.authMethod;
        u.accessToken = token.accessToken;
        u.tenant      = token.tenant;
        u.apiBaseUrl  = token.apiBaseUrl;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
