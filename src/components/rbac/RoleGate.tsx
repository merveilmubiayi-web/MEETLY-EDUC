import type { ReactNode } from 'react'
import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types/user'

type RoleGateProps = {
  roles?: UserRole[]
  permissions?: string[]
  children: ReactNode
  fallback?: ReactNode
}

export function RoleGate({ roles, permissions, children, fallback = null }: RoleGateProps) {
  const { user, hasPermission } = useAuth()

  if (!user) {
    return <>{fallback}</>
  }

  const roleMatch = roles ? roles.includes(user.role) : true
  const permissionMatch = permissions ? permissions.every((permission) => hasPermission(permission)) : true

  if (!roleMatch || !permissionMatch) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
