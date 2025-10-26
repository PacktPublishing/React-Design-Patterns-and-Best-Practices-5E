import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Unwrap the params Promise
  const { id } = await params;

  // Simulate database query
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = {
    id,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    createdAt: new Date("2023-06-20").toISOString(),
  };

  return NextResponse.json(user);
}
