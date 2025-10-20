import { mockApi } from "../api/mockApi"

export async function analyticsLoader() {
  const data = await mockApi.getAnalytics()
  return data
}
