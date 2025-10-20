import DynamicSurveyForm from "@/components/forms/dynamic-survey"
import Link from "next/link"

export default function DynamicSurveyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Link href="/" className="block text-center text-blue-600 hover:underline mb-4">
        ← Back to Examples
      </Link>
      <DynamicSurveyForm />
    </div>
  )
}
