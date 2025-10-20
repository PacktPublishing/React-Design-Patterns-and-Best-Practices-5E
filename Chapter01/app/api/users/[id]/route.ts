import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Simulate database query
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = {
    id: params.id,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    createdAt: new Date("2023-06-20").toISOString(),
  }

  return NextResponse.json(user)
}
