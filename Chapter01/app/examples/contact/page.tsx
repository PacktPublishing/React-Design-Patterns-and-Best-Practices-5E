import ContactForm from "@/components/examples/contact-form"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground mb-8">Form submission using Server Actions with 'use server'</p>
        <ContactForm />
      </div>
    </div>
  )
}
