"use client"

import { useDirection } from "../hooks/useDirection"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { isRTL } = useDirection()

  return (
    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <svg
              className={`w-4 h-4 mx-2 text-gray-400 ${isRTL ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <a
            href={item.href}
            className={`hover:text-indigo-600 transition-colors ${
              index === items.length - 1 ? "text-gray-900 font-medium" : "text-gray-500"
            }`}
          >
            {item.label}
          </a>
        </div>
      ))}
    </nav>
  )
}
