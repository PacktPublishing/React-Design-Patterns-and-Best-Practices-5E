interface UserPreferences {
  language: string
  timezone: string
  dateFormat: string
}

class PreferenceManager {
  private readonly STORAGE_KEY = "userPreferences"
  private readonly API_ENDPOINT = "/api/user/preferences"

  async loadPreferences(): Promise<UserPreferences | null> {
    try {
      // Try to load from API first (for authenticated users)
      const response = await fetch(this.API_ENDPOINT, {
        credentials: "include",
      })

      if (response.ok) {
        const preferences = await response.json()
        this.cacheLocally(preferences)
        return preferences
      }
    } catch (error) {
      console.warn("Could not load preferences from API:", error)
    }

    // Fall back to local storage
    return this.loadFromCache()
  }

  async savePreferences(preferences: Partial<UserPreferences>): Promise<void> {
    const current = await this.loadPreferences()
    const updated = { ...current, ...preferences } as UserPreferences

    // Save locally immediately for instant feedback
    this.cacheLocally(updated)

    // Sync to API in background
    try {
      await fetch(this.API_ENDPOINT, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updated),
      })
    } catch (error) {
      console.warn("Could not sync preferences to API:", error)
    }
  }

  private loadFromCache(): UserPreferences | null {
    try {
      const cached = localStorage.getItem(this.STORAGE_KEY)
      return cached ? JSON.parse(cached) : null
    } catch {
      return null
    }
  }

  private cacheLocally(preferences: UserPreferences): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences))
    } catch (error) {
      console.warn("Could not cache preferences locally:", error)
    }
  }
}

export const preferenceManager = new PreferenceManager()
