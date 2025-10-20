"use client"

import { Header } from "@/src/components/Header"
import { Navigation } from "@/src/components/Navigation"
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher"
import { Breadcrumbs } from "@/src/components/Breadcrumbs"
import { useTranslation } from "react-i18next"

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <Header userName="Carlos" />
      <Navigation />

      <main className="container mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: t("navigation.home"), href: "/" },
            { label: t("navigation.about"), href: "/about" },
          ]}
        />

        <div className="mt-8 bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("navigation.about")}</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed">
              This is a demonstration of internationalization (i18n) and localization (l10n) in React applications. The
              application supports multiple languages and demonstrates various i18n features including:
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>Dynamic language switching</li>
              <li>RTL (Right-to-Left) language support</li>
              <li>Number and currency formatting</li>
              <li>Date and time localization</li>
              <li>Relative time formatting</li>
              <li>Translation interpolation</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
