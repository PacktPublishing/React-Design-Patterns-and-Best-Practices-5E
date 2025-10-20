"use client"

import { useState } from "react"

interface ApplicationData {
  personal: { firstName: string; lastName: string; email: string }
  experience: { years: number; role: string; skills: string[] }
  preferences: { location: string; salary: string; startDate: string }
}

export default function ApplicationForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<ApplicationData>({
    personal: { firstName: "", lastName: "", email: "" },
    experience: { years: 0, role: "", skills: [] },
    preferences: { location: "", salary: "", startDate: "" },
  })

  const updateData = (section: keyof ApplicationData, key: string, val: any) => {
    setData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [key]: val },
    }))
  }

  const next = () => setStep((s) => Math.min(s + 1, 2))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    console.log("Submitting", data)
    alert("Application submitted successfully!")
  }

  const Progress = () => (
    <div className="flex mb-6">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`flex-1 h-2 mx-1 rounded-full ${i <= step ? "bg-blue-500" : "bg-gray-200"}`} />
      ))}
    </div>
  )

  const StepPersonal = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="First Name"
          value={data.personal.firstName}
          onChange={(e) => updateData("personal", "firstName", e.target.value)}
          className="p-2 border rounded"
        />
        <input
          placeholder="Last Name"
          value={data.personal.lastName}
          onChange={(e) => updateData("personal", "lastName", e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <input
        placeholder="Email"
        type="email"
        value={data.personal.email}
        onChange={(e) => updateData("personal", "email", e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  )

  const StepExperience = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      <input
        placeholder="Years of Experience"
        type="number"
        value={data.experience.years || ""}
        onChange={(e) => updateData("experience", "years", Number(e.target.value) || 0)}
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Current/Most Recent Role"
        value={data.experience.role}
        onChange={(e) => updateData("experience", "role", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Skills (comma separated)"
        value={data.experience.skills.join(", ")}
        onChange={(e) =>
          updateData(
            "experience",
            "skills",
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
        className="w-full p-2 border rounded"
      />
    </div>
  )

  const StepPreferences = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Preferences</h2>
      <input
        placeholder="Preferred Location"
        value={data.preferences.location}
        onChange={(e) => updateData("preferences", "location", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Expected Salary"
        value={data.preferences.salary}
        onChange={(e) => updateData("preferences", "salary", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        placeholder="Preferred Start Date"
        type="date"
        value={data.preferences.startDate}
        onChange={(e) => updateData("preferences", "startDate", e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  )

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return <StepPersonal />
      case 1:
        return <StepExperience />
      case 2:
        return <StepPreferences />
      default:
        return <StepPersonal />
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Job Application (Multi-Step)</h1>
        <p className="text-gray-600">Step {step + 1} of 3</p>
      </div>

      <Progress />
      {renderCurrentStep()}

      <div className="flex justify-between pt-4">
        <button onClick={prev} disabled={step === 0} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Previous
        </button>
        {step < 2 ? (
          <button onClick={next} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Next
          </button>
        ) : (
          <button onClick={submit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Submit Application
          </button>
        )}
      </div>
    </div>
  )
}
