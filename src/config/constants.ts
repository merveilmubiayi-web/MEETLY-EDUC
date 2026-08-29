import type { RolePermissions, User, UserRole } from '../types/user'

export const ROLES: UserRole[] = [
  'ADMIN',
  'TEACHER_PRIMARY',
  'TEACHER_SECONDARY',
  'CASHIER',
  'STUDENT',
  'PARENT',
]

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Admin (Chef)',
  TEACHER_PRIMARY: 'Enseignant Primaire',
  TEACHER_SECONDARY: 'Enseignant Secondaire',
  CASHIER: 'Caissier',
  STUDENT: 'Élève',
  PARENT: 'Parent',
}

export const ROLE_PERMISSIONS: RolePermissions = {
  ADMIN: [
    'dashboard',
    'staff_management',
    'audit_logs',
    'student_registration',
    'payments',
    'grades',
    'attendance',
    'class_management',
    'fees',
    'notes',
    'bulletins',
    'assignments',
    'invoices',
    'profile',
  ],
  TEACHER_PRIMARY: ['dashboard', 'grades', 'attendance', 'notes', 'bulletins', 'assignments', 'profile'],
  TEACHER_SECONDARY: ['dashboard', 'grades', 'attendance', 'notes', 'bulletins', 'assignments', 'class_management', 'profile'],
  CASHIER: ['dashboard', 'student_registration', 'payments', 'fees', 'invoices', 'profile'],
  STUDENT: ['dashboard', 'notes', 'bulletins', 'assignments', 'invoices', 'profile'],
  PARENT: ['dashboard', 'invoices', 'notes', 'bulletins', 'profile'],
}

export const DEFAULT_USERS: User[] = [
  {
    id: 'u-admin',
    matricule: 'A001',
    role: 'ADMIN',
    firstName: 'Chef',
    lastName: 'Admin',
    passwordHash: 'admin123',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'u-teacher-primary',
    matricule: 'P001',
    role: 'TEACHER_PRIMARY',
    firstName: 'Alice',
    lastName: 'Ndiaye',
    passwordHash: 'teacher123',
    createdAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'u-teacher-secondary',
    matricule: 'S001',
    role: 'TEACHER_SECONDARY',
    firstName: 'Baba',
    lastName: 'Diallo',
    passwordHash: 'teacher123',
    createdAt: '2026-01-03T00:00:00.000Z',
  },
  {
    id: 'u-cashier',
    matricule: 'C001',
    role: 'CASHIER',
    firstName: 'Moussa',
    lastName: 'Sow',
    passwordHash: 'cashier123',
    createdAt: '2026-01-04T00:00:00.000Z',
  },
  {
    id: 'u-student',
    matricule: 'E001',
    role: 'STUDENT',
    firstName: 'Fanta',
    lastName: 'Diop',
    passwordHash: 'student123',
    createdAt: '2026-01-05T00:00:00.000Z',
  },
  {
    id: 'u-parent',
    email: 'parent@example.com',
    role: 'PARENT',
    firstName: 'Awa',
    lastName: 'Diop',
    passwordHash: 'parent123',
    createdAt: '2026-01-06T00:00:00.000Z',
  },
]
