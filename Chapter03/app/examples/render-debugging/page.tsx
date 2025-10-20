"use client"

import { useState } from "react"
import Link from "next/link"
import { useRenderDebugger } from "@/hooks/use-render-debugger"

function DebuggedComponent({ count, message }: { count: number; message: string }) {
  useRenderDebugger("DebuggedComponent", { count, message })

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">Debugged Component</h3>
      <p className="text-sm text-gray-600">Count: {count}</p>
      <p className="text-sm text-gray-600">Message: {message}</p>
      <p className="mt-2 text-xs text-gray-500">Check the browser console to see render debugging information</p>
    </div>
  )
}

export default function RenderDebuggingPage() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("Hello")
  const [unrelatedState, setUnrelatedState] = useState(0)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">Render Debugging</h1>
        <p className="mb-8 text-gray-600">
          Demonstrates the useRenderDebugger hook for tracking component renders and prop changes.
        </p>

        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Increment Count (causes re-render)
            </button>
            <button
              onClick={() => setMessage((m) => m + "!")}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Update Message (causes re-render)
            </button>
          </div>
          <button
            onClick={() => setUnrelatedState((s) => s + 1)}
            className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Update Unrelated State (causes re-render without prop changes)
          </button>
        </div>

        <DebuggedComponent count={count} message={message} />

        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">useRenderDebugger Hook Code</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
            {`export const useRenderDebugger = (componentName: string, props: any) => {
  const prevProps = useRef(props);
  const renderCount = useRef(0);
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      renderCount.current += 1;
      console.log(\`[\${componentName}] Render #\${renderCount.current}\`);
      
      if (prevProps.current) {
        const changedProps = Object.keys(props).filter(
          key => props[key] !== prevProps.current[key]
        );
        if (changedProps.length) {
          console.log(\`[\${componentName}] Props changed:\`, 
            changedProps.join(', '));
        }
      }
      prevProps.current = props;
    }
  });
};`}
          </pre>
        </div>

        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">What to Look For</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-blue-800">
            <li>Render count increases with each re-render</li>
            <li>Changed props are logged when they differ from previous render</li>
            <li>Re-renders without prop changes indicate parent re-renders or context changes</li>
            <li>Use this information to identify unnecessary re-renders</li>
            <li>Consider using React.memo, useMemo, or useCallback for optimization</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
