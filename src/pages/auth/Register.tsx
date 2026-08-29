import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UserRole } from '../../types/user'

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'STUDENT', label: 'Élève' },
  { value: 'PARENT', label: 'Parent' },
  { value: 'TEACHER_PRIMARY', label: 'Enseignant primaire' },
  { value: 'TEACHER_SECONDARY', label: 'Enseignant secondaire' },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT' as UserRole,
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Tous les champs sont obligatoires.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)

    try {
      const generatedMatricule =
        form.role === 'STUDENT'
          ? `E${Math.floor(1000 + Math.random() * 9000)}`
          : form.role === 'PARENT'
            ? `P${Math.floor(1000 + Math.random() * 9000)}`
            : form.role === 'TEACHER_PRIMARY'
              ? `PR${Math.floor(1000 + Math.random() * 9000)}`
              : `SE${Math.floor(1000 + Math.random() * 9000)}`

      const newUser = {
        id: `user-${Date.now()}`,
        matricule: generatedMatricule,
        email: form.email,
        passwordHash: form.password,
        role: form.role,
        firstName: form.firstName,
        lastName: form.lastName,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem('token', `jwt_register_${Date.now()}`)
      localStorage.setItem('user', JSON.stringify(newUser))

      const routeMap: Record<UserRole, string> = {
        ADMIN: '/admin/dashboard',
        TEACHER_PRIMARY: '/teacher/dashboard',
        TEACHER_SECONDARY: '/teacher/dashboard',
        CASHIER: '/cashier/dashboard',
        STUDENT: '/student/dashboard',
        PARENT: '/parent/dashboard',
      }

      navigate(routeMap[form.role], { replace: true })
    } catch {
      setError('Une erreur est survenue lors de l’inscription.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">EducChange</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Créer un compte</h1>
          <p className="mt-2 text-sm text-slate-500">Inscrivez-vous pour accéder à votre espace</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Prénom</label>
              <input
                value={form.firstName}
                onChange={(event) => handleChange('firstName', event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-blue-500"
                placeholder="Jean"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nom</label>
              <input
                value={form.lastName}
                onChange={(event) => handleChange('lastName', event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
                placeholder="Dupont"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Adresse email</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => handleChange('email', event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
              placeholder="jean@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Type de compte</label>
            <select
              value={form.role}
              onChange={(event) => handleChange('role', event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Mot de passe</label>
              <input
                type="password"
                value={form.password}
                onChange={(event) => handleChange('password', event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Confirmer</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(event) => handleChange('confirmPassword', event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? 'Création du compte...' : 'S’inscrire'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Vous avez déjà un compte ?{' '}
          <button type="button" onClick={() => navigate('/login')} className="font-semibold text-blue-600 hover:text-blue-700">
            Se connecter
          </button>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
