import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import AnalyticsProvider from "./analytics/AnalyticsProvider"
import PerformanceMonitor from "@/components/PerformanceMonitor"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modern Store - Quality Products",
  description: "Discover our curated collection of premium products",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AnalyticsProvider>
          <PerformanceMonitor />
          {children}
        </AnalyticsProvider>
        <Analytics />
      </body>
    </html>
  )
}
