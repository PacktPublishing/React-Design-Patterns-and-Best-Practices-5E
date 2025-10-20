export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams.error || "Unknown error"

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Authentication Error</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error === "CredentialsSignin" ? "Invalid email or password" : "An error occurred during authentication"}
          </p>
        </div>
        <div className="mt-8">
          <a
            href="/auth/signin"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </a>
        </div>
      </div>
    </div>
  )
}
