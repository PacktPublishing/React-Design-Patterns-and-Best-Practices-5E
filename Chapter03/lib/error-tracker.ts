export class ErrorTracker {
  static logRecoverableError(error: Error, errorInfo?: any) {
    console.log("📊 Recoverable Error:", {
      message: error.message,
      stack: error.stack,
      errorInfo,
      timestamp: new Date().toISOString(),
      severity: "warning",
    })

    // In production, send to error tracking service
    // Example: Sentry.captureException(error, { level: 'warning', extra: errorInfo });
  }

  static logCriticalError(error: Error, errorInfo?: any) {
    console.error("🚨 Critical Error:", {
      message: error.message,
      stack: error.stack,
      errorInfo,
      timestamp: new Date().toISOString(),
      severity: "error",
    })

    // In production, send to error tracking service
    // Example: Sentry.captureException(error, { level: 'error', extra: errorInfo });
  }
}

export const showGlobalErrorNotification = (error: Error) => {
  // In a real app, this would show a toast notification
  console.error("Global Error Notification:", error.message)
}
