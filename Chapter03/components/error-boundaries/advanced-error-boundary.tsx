"use client"

import { Component, type ReactNode, type ErrorInfo } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  level?: "page" | "section" | "component"
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  errorType?: "network" | "rendering" | "chunk" | "unknown"
}

class AdvancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Categorize error type
    let errorType: State["errorType"] = "unknown"

    if (error.message.includes("fetch") || error.message.includes("network")) {
      errorType = "network"
    } else if (error.message.includes("chunk") || error.message.includes("loading")) {
      errorType = "chunk"
    } else {
      errorType = "rendering"
    }

    return { hasError: true, error, errorType }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Advanced Error Boundary caught:", error, errorInfo)

    this.setState({ errorInfo })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Report to error tracking service
    this.reportError(error, errorInfo)
  }

  reportError(error: Error, errorInfo: ErrorInfo) {
    // Simulate error reporting to service like Sentry
    console.log("Reporting error to tracking service:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      level: this.props.level,
      timestamp: new Date().toISOString(),
    })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleRefresh = () => {
    window.location.reload()
  }

  renderFallback() {
    const { error, errorType } = this.state
    const { level = "component" } = this.props

    const levelStyles = {
      page: "min-h-screen flex items-center justify-center bg-gray-50",
      section: "my-8 p-8",
      component: "p-4",
    }

    return (
      <div className={`${levelStyles[level]} rounded-lg border border-red-200 bg-red-50`}>
        <div className="max-w-md text-center">
          <div className="mb-4 text-4xl">⚠️</div>
          <h3 className="mb-2 text-xl font-semibold text-red-900">
            {errorType === "network" && "Network Error"}
            {errorType === "chunk" && "Loading Error"}
            {errorType === "rendering" && "Rendering Error"}
            {errorType === "unknown" && "Something went wrong"}
          </h3>
          <p className="mb-4 text-sm text-red-700">{error?.message || "An unexpected error occurred"}</p>
          <div className="flex gap-2 justify-center">
            {errorType === "network" && (
              <button
                onClick={this.handleRetry}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Retry
              </button>
            )}
            {errorType === "chunk" && (
              <button
                onClick={this.handleRefresh}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Refresh Page
              </button>
            )}
            {(errorType === "rendering" || errorType === "unknown") && (
              <>
                <button
                  onClick={this.handleRetry}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Try Again
                </button>
                <button
                  onClick={this.handleRefresh}
                  className="rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Refresh
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || this.renderFallback()
    }
    return this.props.children
  }
}

export default AdvancedErrorBoundary
