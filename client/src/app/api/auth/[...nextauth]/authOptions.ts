import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SignJWT, importPKCS8 } from "jose";

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

  secret: process.env.JWT_SECRET_KEY,
  callbacks: {
    async jwt({ token, user }) {
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
        session.accessToken = await generateRS256Token(token); // add signed JWT to session
      }
      return session;
    },
  },
};

async function generateRS256Token(payload: any): Promise<string> {
  const alg = "RS256";
  const pemKey = process.env.JWT_PRIVATE_KEY!;

  const pkcs8Key = await importPKCS8(normalizePem(pemKey), alg);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(pkcs8Key);
}

// converts string with \n into valid PEM string
function normalizePem(pem: string): string {
  return pem.replace(/\\n/g, "\n");
}

export default NextAuth(authOptions);
