"use client"

import { Component, type ReactNode, type ErrorInfo } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
    // Report to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-wrapper rounded-lg border border-red-200 bg-red-50 p-6">
            <h3 className="error-title text-lg font-semibold text-red-900">Something went wrong</h3>
            <p className="error-text mt-2 text-sm text-red-700">Please try refreshing the page.</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
