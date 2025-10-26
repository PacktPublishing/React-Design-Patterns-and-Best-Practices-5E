import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

function handleAuthError(error: unknown) {
  if (error instanceof AuthError) {
    return redirect(`/auth/error?error=${error.type}`)
  }

  throw error
}

export default function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  const callbackUrl = searchParams.callbackUrl || "/dashboard"

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <form
              action={async () => {
                "use server"
                try {
                  await signIn("github", { redirectTo: callbackUrl })
                } catch (error) {
                  return handleAuthError(error)
                }
              }}
            >
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign in with GitHub
              </button>
            </form>

            <form
              action={async () => {
                "use server"
                try {
                  await signIn("google", { redirectTo: callbackUrl })
                } catch (error) {
                  return handleAuthError(error)
                }
              }}
            >
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign in with Google
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <form
              action={async (formData: FormData) => {
                "use server"

                const email = formData.get("email")
                const password = formData.get("password")

                if (typeof email !== "string" || typeof password !== "string") {
                  return redirect("/auth/error?error=InvalidCredentials")
                }

                try {
                  await signIn("credentials", {
                    email,
                    password,
                    redirectTo: callbackUrl,
                  })
                } catch (error) {
                  return handleAuthError(error)
                }
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
