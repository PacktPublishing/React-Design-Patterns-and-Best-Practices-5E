// Mock API route for login
import { NextResponse } from "next/server"
import type { User } from "@/types"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Mock authentication
  if (email && password) {
    const user: User = {
      id: "1",
      name: "John Doe",
      email,
      role: "user",
    }

    return NextResponse.json(user)
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}
