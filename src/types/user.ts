export type UserRole =
  | 'ADMIN'
  | 'TEACHER_PRIMARY'
  | 'TEACHER_SECONDARY'
  | 'CASHIER'
  | 'STUDENT'
  | 'PARENT'

export type User = {
  id: string
  matricule?: string
  email?: string
  passwordHash?: string
  role: UserRole
  firstName: string
  lastName: string
  createdAt: string
}

export type LoginFormValues = {
  identifier: string
  password: string
}

export type PermissionKey =
  | 'dashboard'
  | 'staff_management'
  | 'audit_logs'
  | 'student_registration'
  | 'payments'
  | 'grades'
  | 'attendance'
  | 'class_management'
  | 'fees'
  | 'notes'
  | 'bulletins'
  | 'assignments'
  | 'invoices'
  | 'profile'

export type RolePermissions = Record<UserRole, PermissionKey[]>
