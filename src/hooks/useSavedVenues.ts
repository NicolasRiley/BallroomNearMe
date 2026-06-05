import { useState } from 'react'

const savedIds = new Set<string>()

export function useSavedVenues() {
  const [, forceUpdate] = useState(0)

  const isSaved = (id: string) => savedIds.has(id)

  const toggleSaved = (id: string) => {
    if (savedIds.has(id)) {
      savedIds.delete(id)
    } else {
      savedIds.add(id)
    }
    forceUpdate(n => n + 1)
  }

  const savedVenues = savedIds

  return { isSaved, toggleSaved, savedVenues }
}