// Mock database utilities for demonstration purposes

type QueryResult<T> = {
  rows: T[]
}

// Simulated database connection pool
class DatabasePool {
  async query<T>(text: string, params?: any[]): Promise<QueryResult<T>> {
    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    console.log("Database query:", text, params)

    // Return mock data
    return {
      rows: [] as T[],
    }
  }
}

let pool: DatabasePool

if (!(global as any).pool) {
  ;(global as any).pool = new DatabasePool()
}

pool = (global as any).pool

export async function query<T>(text: string, params?: any[]): Promise<QueryResult<T>> {
  return pool.query<T>(text, params)
}
