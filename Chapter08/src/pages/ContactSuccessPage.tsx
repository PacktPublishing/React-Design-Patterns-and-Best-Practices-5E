import { Link } from "react-router-dom"

export function ContactSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-50 font-medium"
          >
            Send Another Message
          </Link>
        </div>
      </div>
    </div>
  )
}
