import { FormFieldDemo } from "@/components/react19/form-field-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UseIdPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">useId Improvements</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            React 19.2 improves the useId hook with better default prefixes that are collision-resistant across
            different React instances, making it safer for design systems and micro-frontends.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Fields with useId</CardTitle>
            <CardDescription>
              Each form field uses useId to generate unique, accessible IDs. The new prefix ensures no collisions even
              in complex applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormFieldDemo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why This Matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Proper ID linking between labels and inputs is crucial for screen readers and keyboard navigation. useId
                ensures these IDs are always unique.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Collision Resistance</h3>
              <p className="text-sm text-muted-foreground">
                In applications with multiple React roots, micro-frontends, or embedded components, ID collisions were
                possible. The new prefix includes more entropy to prevent this.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Design Systems</h3>
              <p className="text-sm text-muted-foreground">
                If you're building a design system that needs to work in any environment, the improved useId makes your
                components more robust and reliable.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
