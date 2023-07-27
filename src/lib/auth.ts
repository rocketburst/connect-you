import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {
  type NextAuthOptions,
  type DefaultSession,
  getServerSession,
} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/env.mjs"
import { db } from "@/lib/db"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string
    }
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}
