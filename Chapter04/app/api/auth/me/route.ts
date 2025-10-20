// Mock API route for current user
import { NextResponse } from "next/server"
import type { User } from "@/types"

export async function GET() {
  // Mock current user
  const user: User = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  }

  return NextResponse.json(user)
}
