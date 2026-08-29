import { useAuth } from '../context/AuthContext'

export function usePermissions() {
  const { hasPermission, hasRole, user } = useAuth()

  return { hasPermission, hasRole, user }
}
