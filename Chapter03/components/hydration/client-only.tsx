"use client"

import type React from "react"

import { useState, useEffect } from "react"

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null
  return <>{children}</>
}

export default ClientOnly
