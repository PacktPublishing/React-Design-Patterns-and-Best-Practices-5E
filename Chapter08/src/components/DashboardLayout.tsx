import { NavLink, Outlet, useMatches } from "react-router-dom"
import { clsx } from "clsx"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: "📊" },
  { name: "Analytics", href: "/dashboard/analytics", icon: "📈" },
  { name: "Reports", href: "/dashboard/reports", icon: "📄" },
]

export function DashboardLayout() {
  const matches = useMatches()
  const currentPath = matches[matches.length - 1]?.pathname

  return (
    <div className="flex h-full min-h-[600px]">
      <nav className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Dashboard</h2>
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  end={item.href === "/dashboard"}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    )
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  )
}
