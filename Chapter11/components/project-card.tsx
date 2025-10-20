"use client"

import { useState } from "react"
import { Can, Cannot } from "@/components/rbac/can"
import { Permission } from "@/lib/rbac/roles"
import { deleteProject } from "@/app/actions/project-actions"

interface ProjectCardProps {
  id: string
  name: string
  description: string
  userId: string
  currentUserId: string
}

export function ProjectCard({ id, name, description, userId, currentUserId }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const isOwner = userId === currentUserId

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return

    setIsDeleting(true)
    try {
      await deleteProject(id)
    } catch (error) {
      alert("Failed to delete project")
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <div className="flex gap-2">
        <Can permission={Permission.PROJECT_UPDATE}>
          {isOwner && (
            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white 
                               rounded hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          )}
        </Can>

        <Can permission={Permission.PROJECT_DELETE}>
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded 
                         hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </Can>

        <Cannot permission={Permission.PROJECT_UPDATE}>
          <span className="text-xs text-gray-400 self-center">View only</span>
        </Cannot>
      </div>
    </div>
  )
}
