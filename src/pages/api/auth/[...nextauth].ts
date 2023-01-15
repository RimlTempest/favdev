import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AppProviders } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from 'server/prisma';

let useMockProvider = process.env.NODE_ENV === 'test';
const { GITHUB_CLIENT_ID, GITHUB_SECRET, NODE_ENV, APP_ENV, NEXTAUTH_SECRET } =
  process.env;
if (
  (NODE_ENV !== 'production' || APP_ENV === 'test') &&
  (!GITHUB_CLIENT_ID || !GITHUB_SECRET)
) {
  console.log('⚠️ Using mocked GitHub auth correct credentials were not added');
  useMockProvider = true;
}
const providers: AppProviders = [];
if (useMockProvider) {
  // テスト用モック分岐
  providers.push(
    CredentialsProvider({
      id: 'github',
      name: 'Mocked GitHub',
      async authorize(credentials) {
        if (credentials) {
          const user = {
            id: credentials.name,
            name: credentials.name,
            email: credentials.name,
          };
          return user;
        }
        return null;
      },
      credentials: {
        name: { type: 'test' },
      },
    }),
  );
} else {
  // 認証分岐
  if (!GITHUB_CLIENT_ID || !GITHUB_SECRET) {
    throw new Error('GITHUB_CLIENT_ID and GITHUB_SECRET must be set');
  }
  providers.push(
    GithubProvider({
      clientId: GITHUB_CLIENT_ID || '',
      clientSecret: GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  );
}
export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers,
  secret: NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
});
