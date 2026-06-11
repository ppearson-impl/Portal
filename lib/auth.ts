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
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = DEMO_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password,
        );
        if (!user) return null;
        const { password: _, ...safe } = user;
        return safe;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as typeof DEMO_USERS[0]).id;
        token.role = (user as typeof DEMO_USERS[0]).role;
        token.projectIds = (user as typeof DEMO_USERS[0]).projectIds;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = token.id;
        (session.user as Record<string, unknown>).role = token.role;
        (session.user as Record<string, unknown>).projectIds = token.projectIds;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
