"use client"

import { useLoaderData, Form, useActionData, useNavigation } from "react-router-dom"
import { useState } from "react"
import type { Department } from "../types"

interface LoaderData {
  departments: Department[]
  settings: {
    enableNotifications: boolean
    responseTime: string
  }
}

interface ActionData {
  success?: boolean
  errors?: Record<string, string>
  values?: Record<string, string>
}

export function ContactPage() {
  const { departments, settings } = useLoaderData() as LoaderData
  const actionData = useActionData() as ActionData
  const navigation = useNavigation()
  const [characterCount, setCharacterCount] = useState(0)

  const isSubmitting = navigation.state === "submitting"

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-2 text-gray-600">
            Get in touch with our team. We typically respond within {settings.responseTime}.
          </p>
        </div>

        <Form method="post" className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={actionData?.values?.name || ""}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  actionData?.errors?.name ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="John Doe"
                required
              />
              {actionData?.errors?.name && <p className="mt-1 text-sm text-red-600">{actionData.errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={actionData?.values?.email || ""}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  actionData?.errors?.email ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="john@example.com"
                required
              />
              {actionData?.errors?.email && <p className="mt-1 text-sm text-red-600">{actionData.errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <select
              id="department"
              name="department"
              defaultValue={actionData?.values?.department || ""}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                actionData?.errors?.department ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              required
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {actionData?.errors?.department && (
              <p className="mt-1 text-sm text-red-600">{actionData.errors.department}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              defaultValue={actionData?.values?.subject || ""}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                actionData?.errors?.subject ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Brief description of your inquiry"
              required
            />
            {actionData?.errors?.subject && <p className="mt-1 text-sm text-red-600">{actionData.errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *<span className="text-sm text-gray-500 ml-2">({characterCount}/500 characters)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              maxLength={500}
              defaultValue={actionData?.values?.message || ""}
              onChange={(e) => setCharacterCount(e.target.value.length)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                actionData?.errors?.message ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Please provide details about your inquiry..."
              required
            />
            {actionData?.errors?.message && <p className="mt-1 text-sm text-red-600">{actionData.errors.message}</p>}
          </div>

          {actionData?.errors?.general && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{actionData.errors.general}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">* Required fields</p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                isSubmitting
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}
