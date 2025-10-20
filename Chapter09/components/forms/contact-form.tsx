"use client"

import type React from "react"
import { useFormStatus } from "react-dom"
import { sendMessage } from "@/app/actions/contact-actions"

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-3 rounded-lg font-medium transition ${
        pending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export function ContactForm() {
  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Form (useFormStatus)</h2>
      <form action={sendMessage} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" required placeholder="Your email" className="w-full p-3 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea name="message" required placeholder="Your message" className="w-full p-3 border rounded-lg h-32" />
        </div>

        <SubmitButton>Send Message</SubmitButton>
      </form>
    </div>
  )
}
