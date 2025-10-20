"use client"

import type React from "react"

export function NewsletterSignup() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // FormData provides multiple ways to access data
    const email = formData.get("email") as string
    const frequency = formData.get("frequency") as string
    const topics = formData.getAll("topics") as string[]

    console.log("Subscription details:", {
      email,
      frequency,
      topics,
    })

    alert(`Subscribed! Email: ${email}, Frequency: ${frequency}, Topics: ${topics.join(", ")}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Newsletter Signup (FormData API)</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>
        <input type="email" name="email" required className="w-full p-2 border rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Frequency</label>
        <select name="frequency" className="w-full p-2 border rounded-lg">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Topics of Interest</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" name="topics" value="tech" className="mr-2" />
            Technology
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="topics" value="business" className="mr-2" />
            Business
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="topics" value="design" className="mr-2" />
            Design
          </label>
        </div>
      </div>

      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Subscribe
      </button>
    </form>
  )
}
