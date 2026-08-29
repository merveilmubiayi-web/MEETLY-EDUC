export type { LoginFormValues, PermissionKey, RolePermissions, User, UserRole } from './user'

export const Role = {
  ADMIN: 'ADMIN',
  TEACHER_PRIMARY: 'TEACHER_PRIMARY',
  TEACHER_SECONDARY: 'TEACHER_SECONDARY',
  CASHIER: 'CASHIER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
} as const

export type Role = (typeof Role)[keyof typeof Role]
