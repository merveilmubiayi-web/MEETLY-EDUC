import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROLE_LABELS } from '../../config/constants'
import { useAuth } from '../../context/AuthContext'

function getDashboardRoute(role: string) {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard'
    case 'CASHIER':
      return '/cashier/dashboard'
    case 'TEACHER_PRIMARY':
    case 'TEACHER_SECONDARY':
      return '/teacher/dashboard'
    case 'STUDENT':
      return '/student/dashboard'
    case 'PARENT':
      return '/parent/dashboard'
    default:
      return '/login'
  }
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navItems = user
    ? [
        { label: 'Tableau de bord', path: getDashboardRoute(user.role) },
        ...(user.role === 'ADMIN'
          ? [
              { label: 'RH & Gestion', path: '/admin/staff' },
              { label: 'Élèves', path: '/admin/students' },
              { label: 'Parents', path: '/admin/parents' },
              { label: 'Logs', path: '/admin/logs' },
            ]
          : []),
        ...(user.role === 'CASHIER'
          ? [
              { label: 'Inscriptions', path: '/cashier/registration' },
              { label: 'Paiements', path: '/cashier/payments' },
            ]
          : []),
        ...(user.role === 'TEACHER_PRIMARY' || user.role === 'TEACHER_SECONDARY'
          ? [
              { label: 'Notes', path: '/teacher/grades' },
              { label: 'Présence', path: '/teacher/attendance' },
            ]
          : []),
        ...(user.role === 'STUDENT' ? [{ label: 'Devoirs', path: '/student/assignments' }] : []),
        ...(user.role === 'PARENT' ? [{ label: 'Factures', path: '/parent/invoices' }] : []),
        { label: 'Profil', path: getDashboardRoute(user.role) },
      ]
    : []

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-box">
          <h1>EducChange</h1>
          <p>{user ? ROLE_LABELS[user.role] : 'Connexion'}</p>
        </div>

        <nav>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <button type="button" className="logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </aside>

      <main className="content-panel">{children}</main>
    </div>
  )
}
