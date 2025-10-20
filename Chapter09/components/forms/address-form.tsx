"use client"

import { useState } from "react"

interface Address {
  street: string
  city: string
  zipCode: string
}

export function AddressForm() {
  const [addresses, setAddresses] = useState<Address[]>([{ street: "", city: "", zipCode: "" }])

  const updateAddress = (index: number, field: keyof Address, value: string) => {
    setAddresses((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated // This triggers re-render of ALL addresses
    })
  }

  const addAddress = () => {
    setAddresses((prev) => [...prev, { street: "", city: "", zipCode: "" }])
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Dynamic Address Form (Performance Issue)</h2>
      <p className="text-gray-600 text-sm">
        Notice: Every keystroke re-renders ALL address fields. Try adding multiple addresses.
      </p>

      {addresses.map((address, index) => (
        <div key={index} className="border p-4 rounded-lg bg-white shadow">
          <h3 className="font-semibold mb-2">Address {index + 1}</h3>
          <input
            value={address.street}
            onChange={(e) => updateAddress(index, "street", e.target.value)}
            placeholder="Street"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            value={address.city}
            onChange={(e) => updateAddress(index, "city", e.target.value)}
            placeholder="City"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            value={address.zipCode}
            onChange={(e) => updateAddress(index, "zipCode", e.target.value)}
            placeholder="ZIP Code"
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <button onClick={addAddress} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Address
      </button>
    </div>
  )
}
