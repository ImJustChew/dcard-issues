import {AuthOptions} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        authorization: {
          params: { scope: 'public_repo,issues:write' }
        }
      }),
    ],
    callbacks: {
        async session({ session, token }) {
            return { 
              ...session,
              id: token.sub,
              login: token.login,
              accessToken: token.accessToken
          };
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          if (account) {
            token.login = account.login;
            token.accessToken = account.access_token;
          }
          return token;
        },
      },
    
  }
  