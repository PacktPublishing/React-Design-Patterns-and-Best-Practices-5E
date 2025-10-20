import { mockApi } from "../api/mockApi"

export async function rootLoader() {
  const [user, notifications] = await Promise.all([mockApi.getCurrentUser(), mockApi.getNotifications()])

  return { user, notifications }
}
