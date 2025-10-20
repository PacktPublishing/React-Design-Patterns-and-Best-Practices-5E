"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const examples = [
    {
      title: "Counter (useState)",
      description: "Learn how to use the useState Hook with a simple counter example",
      href: "/counter",
      icon: "🔢",
    },
    {
      title: "GitHub Issues (Class vs Hooks)",
      description: "Compare class components with functional components using Hooks",
      href: "/issues",
      icon: "🐙",
    },
    {
      title: "Todo List (memo, useMemo, useCallback)",
      description: "Understand memoization techniques for performance optimization",
      href: "/todo",
      icon: "✅",
    },
    {
      title: "Notes (useReducer)",
      description: "Manage complex state with the useReducer Hook",
      href: "/notes",
      icon: "📝",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">React Hooks Chapter</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore comprehensive examples of React Hooks including useState, useEffect, useMemo, useCallback, memo, and
            useReducer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {examples.map((example) => (
            <Link key={example.href} href={example.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
                <CardHeader>
                  <div className="text-4xl mb-2">{example.icon}</div>
                  <CardTitle className="text-2xl">{example.title}</CardTitle>
                  <CardDescription className="text-base">{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-primary font-semibold">View Example →</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>About This Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                This project contains all the code examples from Chapter 7: React Hooks. Each example demonstrates
                important concepts and best practices for using React Hooks effectively.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Key Topics Covered:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>useState Hook for state management</li>
                  <li>useEffect Hook for side effects and lifecycle</li>
                  <li>Rules of Hooks</li>
                  <li>Migrating class components to functional components</li>
                  <li>Performance optimization with memo, useMemo, and useCallback</li>
                  <li>Complex state management with useReducer</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
