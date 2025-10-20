"use server"

import { refresh } from "next/cache"
import { db } from "@/lib/db"

export async function markNotificationAsRead(notificationId: string) {
  // Mark the notification as read
  await db.notification.update({
    where: { id: notificationId },
    data: { read: true },
  })

  // Refresh the unread count shown in the navigation
  // This data isn't cached, but it's displayed on the current page
  refresh()

  return { success: true }
}

export async function updateDashboardMetrics(userId: string) {
  // Simulate processing user activity
  console.log("Processing analytics for user:", userId)

  // Refresh live dashboard metrics without touching cached content
  refresh()

  return { success: true }
}
