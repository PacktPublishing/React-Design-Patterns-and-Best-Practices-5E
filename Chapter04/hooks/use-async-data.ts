"use client"

// Custom hook leveraging the use hook for reusable async state patterns
import { use, useMemo, useCallback } from "react"

interface UseAsyncDataOptions<T> {
  enabled?: boolean
  refetchInterval?: number
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useAsyncData<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = [],
  options: UseAsyncDataOptions<T> = {},
) {
  const { enabled = true, onSuccess, onError } = options

  const promise = useMemo(() => {
    if (!enabled) return Promise.resolve(null as T)

    return fetchFn()
      .then((data) => {
        onSuccess?.(data)
        return data
      })
      .catch((error) => {
        onError?.(error)
        throw error
      })
  }, [...dependencies, enabled])

  const data = use(promise)

  const refetch = useCallback(() => {
    fetchFn()
  }, [fetchFn])

  return { data, refetch }
}
