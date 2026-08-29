import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ROLE_PERMISSIONS } from '../config/constants'
import type { User, UserRole } from '../types/user'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (identifier: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser) as User
        setUser(parsedUser)
        setToken(savedToken)
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (identifier: string, password: string) => {
    setIsLoading(true)

    if (!identifier || !password) {
      setIsLoading(false)
      throw new Error('Identifiant et mot de passe requis.')
    }

    const normalized = identifier.trim().toLowerCase()
    const candidate = (await import('../config/constants')).DEFAULT_USERS.find((entry) => {
      const matricule = 'matricule' in entry && entry.matricule ? entry.matricule.toLowerCase() : ''
      const email = 'email' in entry && entry.email ? entry.email.toLowerCase() : ''
      return matricule === normalized || email === normalized
    })

    if (!candidate || candidate.passwordHash !== password) {
      setIsLoading(false)
      throw new Error('Identifiants invalides.')
    }

    const sessionUser: User = {
      ...candidate,
      passwordHash: candidate.passwordHash ?? '',
      createdAt: candidate.createdAt ?? new Date().toISOString(),
    }

    localStorage.setItem('token', `jwt_${Date.now()}`)
    localStorage.setItem('user', JSON.stringify(sessionUser))

    setToken(`jwt_${Date.now()}`)
    setUser(sessionUser)
    setIsLoading(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) {
      return false
    }

    return ROLE_PERMISSIONS[user.role].includes(permission as never)
  }

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) {
      return false
    }

    const roles = Array.isArray(role) ? role : [role]
    return roles.includes(user.role)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        hasPermission,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
