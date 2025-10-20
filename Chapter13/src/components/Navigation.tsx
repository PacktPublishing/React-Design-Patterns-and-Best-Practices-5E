"use client"

import { useTranslation } from "react-i18next"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const { t } = useTranslation()
  const pathname = usePathname()

  const navItems = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "blog", path: "/blog" },
    { key: "dashboard", path: "/dashboard" },
  ]

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <ul className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <li key={item.key}>
                <Link
                  href={item.path}
                  className={`inline-block py-4 px-2 border-b-2 transition-colors ${
                    isActive
                      ? "border-indigo-600 text-indigo-600 font-medium"
                      : "border-transparent text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  {t(`navigation.${item.key}`)}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
