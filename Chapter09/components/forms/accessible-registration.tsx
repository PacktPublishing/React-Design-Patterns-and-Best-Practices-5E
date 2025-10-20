"use client"

import type React from "react"

import { useState, useId } from "react"

interface FormData {
  name: string
  email: string
  phone: string
  subscribe: boolean
}

export default function AccessibleRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subscribe: false,
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    phone: false,
    subscribe: false,
  })

  const baseId = useId()
  const fid = (k: keyof FormData) => `${baseId}-${k}`

  const FIELDS = [
    { key: "name" as keyof FormData, label: "Full Name", type: "text", req: true },
    { key: "email" as keyof FormData, label: "Email", type: "email", req: true },
    { key: "phone" as keyof FormData, label: "Phone", type: "tel", req: true },
  ] as const

  const validate = (k: keyof FormData, v: any) => {
    let err: string | undefined

    switch (k) {
      case "name":
        if (!v || v.length < 2) err = "Name must be at least 2 characters"
        break
      case "email":
        if (!v || !String(v).includes("@")) err = "Please enter a valid email"
        break
      case "phone":
        if (!v || String(v).replace(/\D/g, "").length < 10) err = "Enter a 10-digit phone"
        break
    }

    setErrors((prev) => ({ ...prev, [k]: err }))
    return !err
  }

  const onChange = (k: keyof FormData, v: any) => {
    setFormData((prev) => ({ ...prev, [k]: v }))
    if (touched[k]) validate(k, v)
  }

  const onBlur = (k: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [k]: true }))
    validate(k, formData[k])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationResults = FIELDS.map((f) => validate(f.key, formData[f.key]))
    const isValid = validationResults.every(Boolean)

    if (isValid) {
      console.log("Form submitted:", formData)
      alert("Form submitted successfully!")
    } else {
      const firstErrorField = FIELDS.find((f) => errors[f.key])
      if (firstErrorField) {
        const element = document.getElementById(fid(firstErrorField.key))
        element?.focus()
      }
    }
  }

  const hasErrors = Object.values(errors).some((error) => error !== undefined)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-5">
        <h1 className="text-2xl font-bold text-gray-900">Accessible Registration Form</h1>

        <p className="text-gray-600">Fields marked with * are required</p>

        {hasErrors && (
          <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 font-medium">Please correct the errors below</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {FIELDS.map((field) => (
            <div key={field.key} className="space-y-1">
              <label htmlFor={fid(field.key)} className="block text-sm font-medium text-gray-700">
                {field.label}{" "}
                <span aria-label="required" className="text-red-500">
                  *
                </span>
              </label>

              <input
                id={fid(field.key)}
                type={field.type}
                value={formData[field.key] as string}
                onChange={(e) => onChange(field.key, e.target.value)}
                onBlur={() => onBlur(field.key)}
                aria-required="true"
                aria-invalid={!!errors[field.key]}
                aria-describedby={errors[field.key] ? `${fid(field.key)}-err` : undefined}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                  errors[field.key]
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />

              {errors[field.key] && (
                <p id={`${fid(field.key)}-err`} role="alert" className="text-sm text-red-600">
                  {errors[field.key]}
                </p>
              )}
            </div>
          ))}

          <div className="space-y-2">
            <label htmlFor={fid("subscribe")} className="flex items-center gap-3 cursor-pointer">
              <input
                id={fid("subscribe")}
                type="checkbox"
                checked={formData.subscribe}
                onChange={(e) => onChange("subscribe", e.target.checked)}
                onBlur={() => onBlur("subscribe")}
                aria-describedby={`${fid("subscribe")}-hint`}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Subscribe to newsletter</span>
            </label>

            <p id={`${fid("subscribe")}-hint`} className="text-xs text-gray-500 ml-7">
              Get updates about new features and promotions (optional)
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}
