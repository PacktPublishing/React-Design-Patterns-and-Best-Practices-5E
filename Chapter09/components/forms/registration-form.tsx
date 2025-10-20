"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"

const RegistrationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .regex(/^[a-zA-Z\s]+$/, "Only letters allowed"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .regex(/^[a-zA-Z\s]+$/, "Only letters allowed"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[a-z]/, "Must contain lowercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^A-Za-z0-9]/, "Must contain special character"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type RegistrationData = z.infer<typeof RegistrationSchema>
type FieldErrors = Partial<Record<keyof RegistrationData, string>>

export function RegistrationForm() {
  const [errors, setErrors] = useState<FieldErrors>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      terms: formData.get("terms") === "on",
    }

    try {
      const validated = RegistrationSchema.parse(data)
      console.log("Valid data:", validated)
      alert("Registration successful!")
      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FieldErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof RegistrationData] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create Account (Zod Validation)</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          name="firstName"
          placeholder="First Name"
          className={`w-full p-3 border rounded-lg ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          name="lastName"
          placeholder="Last Name"
          className={`w-full p-3 border rounded-lg ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={`w-full p-3 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className={`w-full p-3 border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className={`w-full p-3 border rounded-lg ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input name="terms" type="checkbox" className="mr-2" />
          <span className="text-sm">I accept the terms and conditions</span>
        </label>
        {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
      </div>

      <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Register
      </button>
    </form>
  )
}
