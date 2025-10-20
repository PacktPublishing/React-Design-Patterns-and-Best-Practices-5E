interface UserProfileProps {
  user: {
    id: string
    name: string | null
    email: string | null
  }
  projects: Array<{ id: string; name: string; updatedAt: string }>
}

export function UserProfile({ user, projects }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-base font-medium text-gray-900">{user.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-base font-medium text-gray-900">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Recent Projects</p>
          <ul className="mt-2 space-y-1">
            {projects.map((project) => (
              <li key={project.id} className="text-sm text-gray-700">
                {project.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
