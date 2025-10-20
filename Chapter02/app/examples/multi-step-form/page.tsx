import MultiStepForm from "@/components/MultiStepForm"

export default function MultiStepFormPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Multi-Step Form</h1>
        <p className="text-muted-foreground mb-8 text-center">Complex form state management with useActionState</p>
        <MultiStepForm />
      </div>
    </div>
  )
}
