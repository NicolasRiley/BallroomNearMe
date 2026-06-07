import { useState } from 'react'

type User = {
  id: string
  name: string
  email: string
}

type AuthState = {
  user: User | null
  isLoggedIn: boolean
  signOut: () => void
}

const initialUser: User | null = {
  id: '1',
  name: 'Jordan Mills',
  email: 'jordan.mills@email.com',
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(initialUser)

  const signOut = () => setUser(null)

  return {
    user,
    isLoggedIn: user !== null,
    signOut,
  }
}