"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface FormFieldProps {
  label: string
  type?: string
  placeholder?: string
}

function FormField({ label, type = "text", placeholder }: FormFieldProps) {
  const id = useId()

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input id={id} type={type} placeholder={placeholder} className="w-full" />
      <p className="text-xs text-muted-foreground font-mono">ID: {id}</p>
    </div>
  )
}

function TextAreaField({ label, placeholder }: { label: string; placeholder?: string }) {
  const id = useId()

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Textarea id={id} placeholder={placeholder} rows={4} className="w-full" />
      <p className="text-xs text-muted-foreground font-mono">ID: {id}</p>
    </div>
  )
}

export function FormFieldDemo() {
  const [showIds, setShowIds] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Contact Form</h3>
        <Button variant="outline" size="sm" onClick={() => setShowIds(!showIds)}>
          {showIds ? "Hide" : "Show"} IDs
        </Button>
      </div>

      <form className="space-y-4">
        <FormField label="Full Name" placeholder="John Doe" />
        <FormField label="Email Address" type="email" placeholder="john@example.com" />
        <FormField label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" />
        <TextAreaField label="Message" placeholder="Tell us how we can help..." />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>

      <div className="bg-muted p-4 rounded-lg space-y-2">
        <p className="text-sm font-semibold">About useId:</p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Generates unique IDs for accessibility attributes</li>
          <li>Works correctly with server-side rendering</li>
          <li>New in React 19.2: Better collision resistance across React instances</li>
          <li>Perfect for design systems and reusable components</li>
        </ul>
      </div>
    </div>
  )
}
