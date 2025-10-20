import { AddressForm } from "@/components/forms/address-form"
import Link from "next/link"

export default function AddressFormPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Link href="/" className="block text-center text-blue-600 hover:underline mb-4">
        ← Back to Examples
      </Link>
      <AddressForm />
    </div>
  )
}
