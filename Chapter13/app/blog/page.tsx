"use client"

import { Header } from "@/src/components/Header"
import { Navigation } from "@/src/components/Navigation"
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher"
import { useTranslation } from "react-i18next"
import { useFormatter } from "@/src/hooks/useFormatter"

export default function BlogPage() {
  const { t } = useTranslation()
  const formatter = useFormatter()

  const posts = [
    {
      id: "1",
      title: "Getting Started with i18n",
      excerpt: "Learn the basics of internationalization in React applications",
      author: "John Doe",
      publishedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Advanced i18n Patterns",
      excerpt: "Explore advanced techniques for building multilingual apps",
      author: "Jane Smith",
      publishedAt: new Date("2024-02-20"),
    },
    {
      id: "3",
      title: "RTL Language Support",
      excerpt: "Implementing right-to-left language support in your application",
      author: "Ahmed Hassan",
      publishedAt: new Date("2024-03-10"),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <Header userName="Carlos" />
      <Navigation />

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t("blog.title")}</h1>

        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{t("blog.author", { name: post.author })}</span>
                <span>•</span>
                <time>{formatter.formatDate(post.publishedAt)}</time>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
