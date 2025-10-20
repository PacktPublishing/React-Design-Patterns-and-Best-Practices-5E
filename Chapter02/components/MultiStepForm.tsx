"use client"

import { useActionState } from "react"
import { validateStep, submitCompleteForm } from "@/actions/formSteps"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type FormDataShape = Record<string, any>

type FormState = {
  step: number
  data: FormDataShape
  errors: Record<string, string>
}

const initialState: FormState = {
  step: 1,
  data: {},
  errors: {},
}

async function processFormStep(prevState: FormState, formData: FormData): Promise<FormState> {
  const currentStep = prevState.step
  const stepData = Object.fromEntries(formData.entries())

  const validation = await validateStep(currentStep, stepData)
  if (!validation.success) {
    return {
      ...prevState,
      errors: validation.errors || {},
    }
  }

  const updatedData = { ...prevState.data, ...stepData }

  if (currentStep === 3) {
    await submitCompleteForm(updatedData)
    return {
      step: 4,
      data: updatedData,
      errors: {},
    }
  }

  return {
    step: currentStep + 1,
    data: updatedData,
    errors: {},
  }
}

function PersonalInfoStep({ errors }: { errors: Record<string, string> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Personal Information</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input id="name" name="name" className="w-full px-3 py-2 border rounded-md" required />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input id="email" name="email" type="email" className="w-full px-3 py-2 border rounded-md" required />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>
    </div>
  )
}

function AddressStep({ errors }: { errors: Record<string, string> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Address</h2>
      <div>
        <label htmlFor="address" className="block text-sm font-medium mb-2">
          Street Address
        </label>
        <input id="address" name="address" className="w-full px-3 py-2 border rounded-md" required />
        {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium mb-2">
          City
        </label>
        <input id="city" name="city" className="w-full px-3 py-2 border rounded-md" required />
        {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
      </div>
    </div>
  )
}

function ReviewStep({ data }: { data: FormDataShape }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Review Your Information</h2>
      <Card className="p-4">
        <dl className="space-y-2">
          <div>
            <dt className="font-semibold">Name:</dt>
            <dd>{data.name}</dd>
          </div>
          <div>
            <dt className="font-semibold">Email:</dt>
            <dd>{data.email}</dd>
          </div>
          <div>
            <dt className="font-semibold">Address:</dt>
            <dd>{data.address}</dd>
          </div>
          <div>
            <dt className="font-semibold">City:</dt>
            <dd>{data.city}</dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}

function SuccessMessage() {
  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">✓</div>
      <h2 className="text-2xl font-bold mb-2">Success!</h2>
      <p className="text-muted-foreground">Your form has been submitted successfully.</p>
    </div>
  )
}

function FormNavigation({
  step,
  isPending,
  onPrevious,
}: {
  step: number
  isPending: boolean
  onPrevious: () => void
}) {
  return (
    <div className="flex justify-between mt-6">
      {step > 1 && step < 4 && (
        <Button type="button" variant="outline" onClick={onPrevious} disabled={isPending}>
          Previous
        </Button>
      )}
      {step < 4 && (
        <Button type="submit" disabled={isPending} className="ml-auto">
          {isPending ? "Processing..." : step === 3 ? "Submit" : "Next"}
        </Button>
      )}
    </div>
  )
}

export default function MultiStepForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(processFormStep, initialState)

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded ${s <= state.step ? "bg-primary" : "bg-muted"} ${s < 3 ? "mr-2" : ""}`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">Step {Math.min(state.step, 3)} of 3</p>
      </div>

      <form action={formAction}>
        {state.step === 1 && <PersonalInfoStep errors={state.errors} />}
        {state.step === 2 && <AddressStep errors={state.errors} />}
        {state.step === 3 && <ReviewStep data={state.data} />}
        {state.step === 4 && <SuccessMessage />}

        <FormNavigation
          step={state.step}
          isPending={isPending}
          onPrevious={() => {
            const newFormData = new FormData()
            formAction(newFormData)
          }}
        />
      </form>
    </Card>
  )
}
