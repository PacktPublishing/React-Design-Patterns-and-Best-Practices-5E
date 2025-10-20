"use client"

import { useTranslation } from "react-i18next"

interface ActionPanelProps {
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  isLoading?: boolean
}

export function ActionPanel({ onSave, onCancel, onDelete, isLoading }: ActionPanelProps) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-end space-x-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
      <button
        onClick={onDelete}
        disabled={isLoading}
        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      >
        {t("actions.delete")}
      </button>
      <button
        onClick={onCancel}
        disabled={isLoading}
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
      >
        {t("actions.cancel")}
      </button>
      <button
        onClick={onSave}
        disabled={isLoading}
        className="px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50"
      >
        {isLoading ? t("messages.loading") : t("actions.save")}
      </button>
    </div>
  )
}
