import Link from "next/link"

export default function Home() {
  const sections = [
    {
      title: "Virtual DOM & Reconciliation",
      description: "Understanding React's rendering process",
      examples: [
        { name: "User Profile (Batching)", href: "/virtual-dom/user-profile" },
        { name: "Task List (Keys)", href: "/virtual-dom/task-list" },
        { name: "Dashboard (Memoization)", href: "/virtual-dom/dashboard" },
      ],
    },
    {
      title: "Performance Optimization",
      description: "Techniques to avoid unnecessary re-renders",
      examples: [
        { name: "Product Store", href: "/optimization/product-store" },
        { name: "User List", href: "/optimization/user-list" },
      ],
    },
    {
      title: "Virtualization & Code Splitting",
      description: "Managing large datasets and lazy loading",
      examples: [
        { name: "Virtual Message List", href: "/virtualization/message-list" },
        { name: "Analytics Dashboard", href: "/code-splitting/analytics" },
      ],
    },
    {
      title: "Event Optimization",
      description: "Debouncing and throttling techniques",
      examples: [{ name: "Search Interface", href: "/events/search-interface" }],
    },
    {
      title: "Performance Monitoring",
      description: "Tools for identifying bottlenecks",
      examples: [
        { name: "React Profiler Demo", href: "/monitoring/profiler" },
        { name: "Web Vitals Monitor", href: "/monitoring/web-vitals" },
      ],
    },
    {
      title: "React 19 Advanced Features",
      description: "Concurrent rendering and transitions",
      examples: [
        { name: "Product Catalog (Transitions)", href: "/advanced/product-catalog" },
        { name: "Tab Navigator", href: "/advanced/tab-navigator" },
        { name: "Product Detail (Suspense)", href: "/advanced/product-detail" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">React Performance Optimization</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive collection of examples demonstrating performance optimization techniques in React
            applications
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h2>
              <p className="text-gray-600 mb-4">{section.description}</p>
              <ul className="space-y-2">
                {section.examples.map((example) => (
                  <li key={example.href}>
                    <Link
                      href={example.href}
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                    >
                      <span className="mr-2">→</span>
                      {example.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center text-gray-600">
          <p className="text-sm">Chapter 16: Optimizing Performance in React Applications</p>
        </footer>
      </div>
    </div>
  )
}
