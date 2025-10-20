import Link from "next/link"

export default function HomePage() {
  const examples = [
    { href: "/traditional-form", title: "Traditional Form", description: "The problem: unwieldy form component" },
    { href: "/address-form", title: "Address Form", description: "Performance issues with dynamic forms" },
    { href: "/profile-form", title: "Profile Form", description: "useActionState for state transitions" },
    { href: "/contact-form", title: "Contact Form", description: "useFormStatus for user feedback" },
    { href: "/todo-list", title: "Todo List", description: "Optimistic UI with useOptimistic" },
    { href: "/registration-form", title: "Registration Form", description: "Zod validation with type safety" },
    { href: "/username-field", title: "Username Field", description: "Async validation with Zod" },
    { href: "/newsletter-signup", title: "Newsletter Signup", description: "Working with FormData API" },
    { href: "/product-editor", title: "Product Editor", description: "Complex nested data structures" },
    { href: "/image-uploader", title: "Image Uploader", description: "File uploads with preview" },
    { href: "/blog-post-editor", title: "Blog Post Editor", description: "Server Actions with FormData" },
    { href: "/application-form", title: "Application Form", description: "Multi-step form architecture" },
    { href: "/accessible-registration", title: "Accessible Registration", description: "Accessibility best practices" },
    { href: "/dynamic-survey", title: "Dynamic Survey", description: "Focus management in dynamic forms" },
    { href: "/password-field", title: "Password Field", description: "Accessible password validation" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced Form Handling in React</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore comprehensive examples from the chapter covering React 19 features, Zod validation, FormData API,
            and accessibility best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <Link
              key={example.href}
              href={example.href}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 hover:border-blue-500"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{example.title}</h2>
              <p className="text-gray-600 text-sm">{example.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
