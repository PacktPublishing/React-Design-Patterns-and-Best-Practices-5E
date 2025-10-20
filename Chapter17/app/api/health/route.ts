import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const checks = {
    timestamp: new Date().toISOString(),
    status: "healthy",
    environment: process.env.NODE_ENV,
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "unknown",
    uptime: process.uptime(),
    database: "not-configured",
  }

  // Check database connection if applicable
  try {
    // await prisma.$queryRaw`SELECT 1`;
    // checks.database = 'connected';
  } catch (error) {
    // checks.database = 'disconnected';
    // checks.status = 'degraded';
  }

  const status = checks.status === "healthy" ? 200 : 503

  return NextResponse.json(checks, { status })
}
