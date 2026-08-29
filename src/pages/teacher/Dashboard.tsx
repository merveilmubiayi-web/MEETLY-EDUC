import React, { useState } from 'react'

const teacherCourses = [
  { name: 'Français', className: '6ème A – Primaire', students: 32, next: '08:00' },
  { name: 'Mathématiques', className: '6ème A – Primaire', students: 32, next: '09:15' },
  { name: 'Sciences', className: '6ème A – Primaire', students: 32, next: '10:30' },
  { name: 'Histoire-Géographie', className: '6ème A – Primaire', students: 32, next: '11:45' },
  { name: 'Éducation morale', className: '6ème A – Primaire', students: 32, next: '13:00' },
  { name: 'Anglais', className: '6ème A – Primaire', students: 32, next: '14:15' },
  { name: 'Art plastique', className: '6ème A – Primaire', students: 32, next: '15:00' },
]

const recentGrades = [
  { student: 'Amani K.', subject: 'Mathématiques', grade: '18/20' },
  { student: 'Boris M.', subject: 'Français', grade: '16/20' },
  { student: 'Céline D.', subject: 'Sciences', grade: '17/20' },
]

const initialAttendance = [
  { id: '1', student: 'Amani Kabasele', status: 'present' },
  { id: '2', student: 'Boris Mbuyi', status: 'absent' },
  { id: '3', student: 'Céline Nsimba', status: 'present' },
  { id: '4', student: 'Dylan Tshibanda', status: 'present' },
  { id: '5', student: 'Esther Lubamba', status: 'absent' },
  { id: '6', student: 'Franck Kalonji', status: 'present' },
]

type ViewMode = 'dashboard' | 'notes' | 'attendance' | 'bulletin'

export function TeacherDashboard() {
  const [view, setView] = useState<ViewMode>('dashboard')
  const [students, setStudents] = useState(initialAttendance)

  const updateStatus = (id: string, status: 'present' | 'absent') => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, status } : student,
      ),
    )
  }

  if (view === 'notes') {
    return <GradeEntryPage />
  }

  if (view === 'attendance') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Journal de classe</h2>
            <p className="text-sm text-slate-500">Classe titulaire : 6ème A • Primaire</p>
          </div>
          <button
            type="button"
            onClick={() => setView('dashboard')}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Retour
          </button>
        </div>

        <div className="mb-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setStudents((current) => current.map((student) => ({ ...student, status: 'present' })))}
            className="rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700"
          >
            Tous présents
          </button>
          <button
            type="button"
            onClick={() => setStudents((current) => current.map((student) => ({ ...student, status: 'absent' })))}
            className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700"
          >
            Tous absents
          </button>
        </div>

        <div className="space-y-3">
          {students.map((item) => (
            <div key={item.id} className="grid items-center gap-3 rounded-xl border border-slate-200 p-3 md:grid-cols-[1.5fr_1fr_1fr]">
              <p className="font-semibold text-slate-900">{item.student}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(item.id, 'present')}
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    item.status === 'present'
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Présent
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(item.id, 'absent')}
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    item.status === 'absent'
                      ? 'border-rose-600 bg-rose-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Absent
                </button>
              </div>
              <span
                className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${
                  item.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {item.status === 'present' ? 'Présent' : 'Absent'}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (view === 'bulletin') {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Bulletin et suivi</h2>
            <p className="text-sm text-slate-500">Suivi du rendement scolaire de la classe 6ème A</p>
          </div>
          <button
            type="button"
            onClick={() => setView('dashboard')}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Retour
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">Moyenne générale</p>
            <p className="mt-2 text-3xl font-bold text-emerald-900">82%</p>
          </div>
          <div className="rounded-xl bg-amber-50 p-4">
            <p className="text-sm text-amber-700">Présence</p>
            <p className="mt-2 text-3xl font-bold text-amber-900">91%</p>
          </div>
          <div className="rounded-xl bg-indigo-50 p-4">
            <p className="text-sm text-indigo-700">Élèves performants</p>
            <p className="mt-2 text-3xl font-bold text-indigo-900">19</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {recentGrades.map((item) => (
            <div key={item.student} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <div>
                <p className="font-semibold text-slate-900">{item.student}</p>
                <p className="text-xs text-slate-500">{item.subject}</p>
              </div>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">{item.grade}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-2">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Classe titulaire</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">6ème A</p>
          <p className="mt-1 text-xs text-slate-500">Primaire • 1 classe seulement</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Élèves suivis</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">32</p>
          <p className="mt-1 text-xs text-slate-500">Taux d’assiduité 91%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Cours à dispenser</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">12</p>
          <p className="mt-1 text-xs text-indigo-600">Aujourd’hui • 6ème A</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Mes cours</h3>
          <div className="mt-5 space-y-3">
            {teacherCourses.map((course) => (
              <div key={course.name} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-900">{course.name}</p>
                  <p className="text-sm text-slate-500">{course.className}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">{course.students} élèves</p>
                  <p className="text-xs text-indigo-600">Heure {course.next}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Actions rapides</h3>
          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={() => setView('notes')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Saisir des notes
            </button>
            <button
              type="button"
              onClick={() => setView('attendance')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Journal de classe
            </button>
            <button
              type="button"
              onClick={() => setView('bulletin')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Bulletin et suivi
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GradeEntryPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Saisie des notes</h2>
          <p className="text-sm text-slate-500">Entrée des évaluations pour la classe titulaire.</p>
        </div>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          Enregistrer
        </button>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
          <option>Français - 6ème A</option>
          <option>Mathématiques - 6ème A</option>
        </select>
        <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Nom de l’évaluation" defaultValue="Devoir n°2" />
        <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Coefficient" defaultValue="2" />
      </div>

      <div className="space-y-3">
        {recentGrades.map((item) => (
          <div key={item.student} className="grid items-center gap-3 rounded-xl border border-slate-200 p-3 md:grid-cols-[1.4fr_1fr_0.8fr]">
            <div>
              <p className="font-semibold text-slate-900">{item.student}</p>
              <p className="text-xs text-slate-500">{item.subject}</p>
            </div>
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" defaultValue={item.grade} />
            <button className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200">Valider</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AttendancePage() {
  const [students, setStudents] = React.useState(initialAttendance)

  const updateStatus = (id: string, status: 'present' | 'absent') => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, status } : student,
      ),
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Journal de classe</h2>
          <p className="text-sm text-slate-500">Classe titulaire : 6ème A • Primaire</p>
        </div>
        <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
          Valider l’appel
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setStudents((current) => current.map((student) => ({ ...student, status: 'present' })))}
          className="rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700"
        >
          Tous présents
        </button>
        <button
          type="button"
          onClick={() => setStudents((current) => current.map((student) => ({ ...student, status: 'absent' })))}
          className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700"
        >
          Tous absents
        </button>
      </div>

      <div className="space-y-3">
        {students.map((item) => (
          <div key={item.id} className="grid items-center gap-3 rounded-xl border border-slate-200 p-3 md:grid-cols-[1.5fr_1fr_1fr]">
            <p className="font-semibold text-slate-900">{item.student}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => updateStatus(item.id, 'present')}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  item.status === 'present'
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                Présent
              </button>
              <button
                type="button"
                onClick={() => updateStatus(item.id, 'absent')}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                  item.status === 'absent'
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                Absent
              </button>
            </div>
            <span
              className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${
                item.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}
            >
              {item.status === 'present' ? 'Présent' : 'Absent'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
