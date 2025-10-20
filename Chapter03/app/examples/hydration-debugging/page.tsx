"use client"

import Link from "next/link"
import ClientOnly from "@/components/hydration/client-only"

// Component that would cause hydration mismatch without ClientOnly
function TimestampComponent() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">Current Timestamp</h3>
      <p className="text-2xl font-mono text-blue-600">{new Date().toLocaleTimeString()}</p>
      <p className="mt-2 text-xs text-gray-500">This timestamp is generated on the client only</p>
    </div>
  )
}

// Component that uses browser APIs
function BrowserInfoComponent() {
  if (typeof window === "undefined") return null

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">Browser Information</h3>
      <div className="space-y-1 text-sm text-gray-700">
        <p>
          <strong>User Agent:</strong> {navigator.userAgent.substring(0, 50)}...
        </p>
        <p>
          <strong>Window Width:</strong> {window.innerWidth}px
        </p>
        <p>
          <strong>Window Height:</strong> {window.innerHeight}px
        </p>
      </div>
      <p className="mt-2 text-xs text-gray-500">This information is only available in the browser</p>
    </div>
  )
}

export default function HydrationDebuggingPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
          ← Back to Home
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">Hydration Debugging</h1>
        <p className="mb-8 text-gray-600">Demonstrates the ClientOnly component for preventing hydration mismatches.</p>

        <div className="mb-6 space-y-6">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">Client-Only Timestamp</h2>
            <ClientOnly>
              <TimestampComponent />
            </ClientOnly>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">Client-Only Browser Info</h2>
            <ClientOnly>
              <BrowserInfoComponent />
            </ClientOnly>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">ClientOnly Component Code</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
            {`const ClientOnly: React.FC<{ children: React.ReactNode }> = 
  ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return <>{children}</>;
};`}
          </pre>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">Common Hydration Issues & Solutions</h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div>
              <strong>Timestamp Mismatches:</strong> Use ClientOnly or useEffect to set timestamps only on the client
            </div>
            <div>
              <strong>Random Values:</strong> Generate random values only on the client side or use a stable seed
            </div>
            <div>
              <strong>Browser APIs:</strong> Check for client environment before accessing window/document
            </div>
            <div>
              <strong>Local Storage:</strong> Handle storage access safely with ClientOnly wrapper
            </div>
            <div>
              <strong>Third-Party Libraries:</strong> Use dynamic imports with ssr: false for libraries that don't
              support SSR
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
