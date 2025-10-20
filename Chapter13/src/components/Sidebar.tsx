"use client"

import type React from "react"

import { useTranslation } from "react-i18next"
import { useDirection } from "../hooks/useDirection"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
  const { t } = useTranslation()
  const { isRTL } = useDirection()

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />}

      <aside
        className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{t("navigation.menu")}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={t("actions.close")}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4">{children}</nav>
      </aside>
    </>
  )
}
