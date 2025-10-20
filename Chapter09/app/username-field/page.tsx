import { UsernameField } from "@/components/forms/username-field"
import Link from "next/link"

export default function UsernameFieldPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Link href="/" className="block text-center text-blue-600 hover:underline mb-4">
        ← Back to Examples
      </Link>
      <UsernameField />
    </div>
  )
}
