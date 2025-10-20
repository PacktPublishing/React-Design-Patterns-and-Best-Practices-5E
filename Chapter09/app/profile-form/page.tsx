import { ProfileForm } from "@/components/forms/profile-form"
import Link from "next/link"

export default function ProfileFormPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Link href="/" className="block text-center text-blue-600 hover:underline mb-4">
        ← Back to Examples
      </Link>
      <ProfileForm />
    </div>
  )
}
