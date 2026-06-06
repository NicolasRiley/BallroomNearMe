import { useState, useContext, createContext, useRef } from 'react'

type SavedContextType = {
  isSaved: (id: string) => boolean
  toggleSaved: (id: string) => void
  savedVenues: Set<string>
}

export const SavedContext = createContext<SavedContextType | null>(null)

export function useSavedVenuesProvider() {
  const savedIds = useRef(new Set<string>()).current
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

  return { isSaved, toggleSaved, savedVenues: savedIds }
}

export function useSavedVenues() {
  const ctx = useContext(SavedContext)
  if (!ctx) throw new Error('useSavedVenues must be used within SavedProvider')
  return ctx
}