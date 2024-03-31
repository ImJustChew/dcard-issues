import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        authorization: {
          params: { scope: 'public_repo' }
        }
      }),
    ],
    callbacks: {
        async session({ session, token }) {
            const newSession = { 
                ...session,
                id: token.sub,
                accessToken: token.accessToken
            };
            return newSession;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          if (account) {
            token.accessToken = account.access_token;
          }
          return token;
        },
      },
    
  }
  
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

