"use client"

import Link from "next/link"
import { UserMenu } from "@/components/user-menu"

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              AuthApp
            </Link>
            <div className="flex gap-4">
              <Link href="/dashboard" className="text-sm text-gray-700 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/projects" className="text-sm text-gray-700 hover:text-gray-900">
                Projects
              </Link>
            </div>
          </div>
          <UserMenu />
        </div>
      </div>
    </nav>
  )
}
