"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  if (isHome) return null

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
          <span className="mr-2">←</span>
          Back to Home
        </Link>
      </div>
    </nav>
  )
}
