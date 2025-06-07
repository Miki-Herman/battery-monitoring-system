import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
                clientId: process.env.GOOGLE_ID as string,
                clientSecret: process.env.GOOGLE_SECRET as string,
                authorization: {
                    params: {
                        access_type: "offline",
                        response_type: "code"
                    }
                }
            }
        )
    ],
    callbacks: {
        async signIn({ account, profile }) {
            return true;
        },
        async session({ session, user }) {
            if (session?.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    session: {
        strategy: "database",
    }
};

export default NextAuth(authOptions);
