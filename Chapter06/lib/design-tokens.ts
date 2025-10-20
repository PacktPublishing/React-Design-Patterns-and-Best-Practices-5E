// Design tokens for consistent styling across the application
export const designTokens = {
  colors: {
    primary: {
      50: "bg-blue-50 dark:bg-blue-950",
      100: "bg-blue-100 dark:bg-blue-900",
      500: "bg-blue-500 dark:bg-blue-500",
      600: "bg-blue-600 dark:bg-blue-400",
      900: "bg-blue-900 dark:bg-blue-100",
    },
    surface: {
      primary: "bg-white dark:bg-gray-900",
      secondary: "bg-gray-50 dark:bg-gray-800",
      elevated: "bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20",
    },
  },
  spacing: {
    section: "py-16 px-4 sm:px-6 lg:px-8",
    card: "p-6 sm:p-8",
    tight: "space-y-4",
    loose: "space-y-8",
  },
  typography: {
    heading: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white",
    subheading: "text-lg text-gray-600 dark:text-gray-300",
    body: "text-gray-700 dark:text-gray-200 leading-relaxed",
  },
} as const
