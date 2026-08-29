import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { ProtectedRoute } from './components/rbac/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Login as LoginPage } from './pages/auth/Login'
import { RegisterPage } from './pages/auth/Register'
import { LandingPage } from './pages/public/LandingPage'
import { Unauthorized as UnauthorizedPage } from './pages/auth/Unauthorized'
import { AdminDashboard } from './pages/admin/adminDashboard'
import { ParentManagement } from './pages/admin/ParentManagement'
import { StaffCreate as StaffCreatePage } from './pages/admin/StaffCreate'
import { StaffList as StaffManagement } from './pages/admin/StaffList'
import { StudentManagement } from './pages/admin/StudentManagement'
import { CashierDashboard } from './pages/cashier/CashierDashboard'
import { StudentRegistration as RegistrationPage } from './pages/cashier/StudentRegistration'
import { PaymentEntry as PaymentsPage } from './pages/cashier/PaymentEntry'
import { GradeEntryPage, AttendancePage, TeacherDashboard } from './pages/teacher/Dashboard'
import { StudentDashboard, AssignmentsPage } from './pages/student/Dashboard'
import { ParentDashboard, InvoicesHistoryPage } from './pages/parent/Dashboard'

const AuditLogs = () => (
  <div className="page-card">
    <h2>Journal d'audit</h2>
    <p>Historique des actions de sécurité et des opérations principales de l'établissement.</p>
  </div>
)

function LoginRedirect() {
  const { user } = useAuth()

  if (!user) {
    return <LoginPage />
  }

  const roleRoutes = {
    ADMIN: '/admin/dashboard',
    TEACHER_PRIMARY: '/teacher/dashboard',
    TEACHER_SECONDARY: '/teacher/dashboard',
    CASHIER: '/cashier/dashboard',
    STUDENT: '/student/dashboard',
    PARENT: '/parent/dashboard',
  }

  return <Navigate to={roleRoutes[user.role] ?? '/login'} replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <StaffManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/staff/create"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <StaffCreatePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <StudentManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/parents"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <ParentManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/logs"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout>
                  <AuditLogs />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/cashier/dashboard"
            element={
              <ProtectedRoute allowedRoles={['CASHIER']}>
                <DashboardLayout>
                  <CashierDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cashier/registration"
            element={
              <ProtectedRoute allowedRoles={['CASHIER']}>
                <DashboardLayout>
                  <RegistrationPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cashier/payments"
            element={
              <ProtectedRoute allowedRoles={['CASHIER']}>
                <DashboardLayout>
                  <PaymentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cashier/payment"
            element={
              <ProtectedRoute allowedRoles={['CASHIER']}>
                <DashboardLayout>
                  <PaymentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute allowedRoles={['TEACHER_PRIMARY', 'TEACHER_SECONDARY']}>
                <DashboardLayout>
                  <TeacherDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/grades"
            element={
              <ProtectedRoute allowedRoles={['TEACHER_PRIMARY', 'TEACHER_SECONDARY']}>
                <DashboardLayout>
                  <GradeEntryPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/attendance"
            element={
              <ProtectedRoute allowedRoles={['TEACHER_PRIMARY', 'TEACHER_SECONDARY']}>
                <DashboardLayout>
                  <AttendancePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/assignments"
            element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout>
                  <AssignmentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/parent/dashboard"
            element={
              <ProtectedRoute allowedRoles={['PARENT']}>
                <DashboardLayout>
                  <ParentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/invoices"
            element={
              <ProtectedRoute allowedRoles={['PARENT']}>
                <DashboardLayout>
                  <InvoicesHistoryPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
