import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">React 19 Error Handling & Debugging</h1>
          <p className="text-lg text-gray-600">
            Comprehensive examples from Chapter 3: Advanced Error Handling and Debugging
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/examples/basic-error-boundary"
            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
              Basic Error Boundary →
            </h2>
            <p className="text-sm text-gray-600">Simple error boundary implementation with fallback UI</p>
          </Link>

          <Link
            href="/examples/advanced-error-boundary"
            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
              Advanced Error Boundary →
            </h2>
            <p className="text-sm text-gray-600">Error categorization, retry mechanisms, and contextual fallbacks</p>
          </Link>

          <Link
            href="/examples/root-error-handlers"
            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
              Root Error Handlers →
            </h2>
            <p className="text-sm text-gray-600">onCaughtError and onUncaughtError implementation</p>
          </Link>

          <Link
            href="/examples/hydration-debugging"
            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
              Hydration Debugging →
            </h2>
            <p className="text-sm text-gray-600">ClientOnly component and hydration mismatch solutions</p>
          </Link>

          <Link
            href="/examples/render-debugging"
            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">Render Debugging →</h2>
            <p className="text-sm text-gray-600">useRenderDebugger hook for tracking component renders</p>
          </Link>

          <Link
            href="/examples/error-scenarios"
            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">Error Scenarios →</h2>
            <p className="text-sm text-gray-600">Common error types and recovery strategies</p>
          </Link>
        </div>

        <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">📚 About This Project</h3>
          <p className="text-sm text-blue-800">
            This project demonstrates all the error handling and debugging concepts from Chapter 3, including error
            boundaries, root-level error handlers, hydration debugging, and performance profiling techniques for React
            19 applications.
          </p>
        </div>
      </div>
    </main>
  )
}
