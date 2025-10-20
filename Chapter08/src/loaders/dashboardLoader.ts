import { mockApi } from "../api/mockApi"

export async function dashboardLoader() {
  const stats = await mockApi.getDashboardStats()
  return { stats }
}
