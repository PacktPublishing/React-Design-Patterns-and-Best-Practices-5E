import NextAuth from "next-auth"
import type { DefaultSession } from "next-auth"
import { authConfig } from "@/auth.config"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
  interface User {
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
  }
}

const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

export { auth, signIn, signOut }
export const GET = handlers.GET
export const POST = handlers.POST
