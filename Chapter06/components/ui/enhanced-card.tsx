import type React from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  variant?: "default" | "outlined" | "filled"
  size?: "sm" | "md" | "lg"
  className?: string
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ variant = "default", size = "md", className, children }) => {
  const baseClasses = "rounded-lg border transition-all duration-200"

  const variantClasses = {
    default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md",
    outlined: "bg-transparent border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
    filled: "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-inner",
  }

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  return <div className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}>{children}</div>
}

export default Card
