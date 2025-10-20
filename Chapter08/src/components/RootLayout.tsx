import { Outlet, useNavigation, useLoaderData, Link } from "react-router-dom"
import { Suspense } from "react"
import type { User, Notification } from "../types"

interface RootLayoutData {
  user: User | null
  notifications: Notification[]
}

export function RootLayout() {
  const { user, notifications } = useLoaderData() as RootLayoutData
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                My Application
              </Link>
              <nav className="hidden md:flex space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <Link to="/products/1" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
                <Link to="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {notifications.length > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {notifications.length}
                </span>
              )}
              {user ? (
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              ) : (
                <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
                  Sign In
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {isLoading && <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-50" />}
        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
