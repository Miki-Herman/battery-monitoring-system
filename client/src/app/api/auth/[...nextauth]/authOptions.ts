import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { fetchToken } from "@/helper/apiService";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt", // use JWT-based session strategy
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && account.id_token) {
        token.id_token = account.id_token;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async signIn({ account, profile }) {
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.accessToken = await fetchToken(token.id_token as string);
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
