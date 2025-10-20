"use client"

import { useState } from "react"
import Link from "next/link"

export default function RootErrorHandlersPage() {
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  const simulateCaughtError = () => {
    try {
      throw new Error("This error will be caught by try-catch")
    } catch (error) {
      addLog("Caught Error: " + (error as Error).message)
    }
  }

  const simulateUncaughtError = () => {
    addLog("Triggering uncaught error...")
    setTimeout(() => {
      throw new Error("This is an uncaught error!")
    }, 100)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">Root Error Handlers</h1>
        <p className="mb-8 text-gray-600">
          Demonstrates onCaughtError and onUncaughtError configuration at the root level.
        </p>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Error Handler Configuration</h2>
          <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
            {`import { createRoot } from 'react-dom/client';
import { ErrorTracker } from './lib/error-tracker';

const root = createRoot(container!, {
  onCaughtError: (error, errorInfo) => {
    console.log('Caught error:', error);
    ErrorTracker.logRecoverableError(error, errorInfo);
  },
  onUncaughtError: (error, errorInfo) => {
    console.error('Uncaught error:', error);
    ErrorTracker.logCriticalError(error, errorInfo);
    showGlobalErrorNotification(error);
  },
});`}
          </pre>
        </div>

        <div className="mb-6 space-y-4">
          <button
            onClick={simulateCaughtError}
            className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Simulate Caught Error (Check Console)
          </button>
          <button
            onClick={simulateUncaughtError}
            className="w-full rounded-md bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700"
          >
            Simulate Uncaught Error (Check Console)
          </button>
        </div>

        {logs.length > 0 && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Event Log</h3>
              <button onClick={() => setLogs([])} className="text-sm text-blue-600 hover:text-blue-700">
                Clear
              </button>
            </div>
            <div className="space-y-1 font-mono text-xs text-gray-700">
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">Key Differences</h3>
          <div className="space-y-4 text-sm text-blue-800">
            <div>
              <strong>onCaughtError:</strong>
              <ul className="mt-1 list-disc pl-5">
                <li>Called for errors caught by React's error handling system</li>
                <li>Includes errors caught by error boundaries</li>
                <li>Typically represents recoverable errors</li>
                <li>Can be batched and reported progressively</li>
              </ul>
            </div>
            <div>
              <strong>onUncaughtError:</strong>
              <ul className="mt-1 list-disc pl-5">
                <li>Called for errors that slip through React's error handling</li>
                <li>Represents unexpected, critical failures</li>
                <li>Should be reported immediately</li>
                <li>May require user notification or page refresh</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
