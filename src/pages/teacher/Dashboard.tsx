const teacherCourses = [
  { name: 'Mathématiques', className: 'Terminale A', students: 32, next: '09:00' },
  { name: 'Physique-Chimie', className: 'Terminale C', students: 28, next: '11:15' },
  { name: 'Informatique', className: 'Seconde B', students: 26, next: '14:00' },
]

const recentGrades = [
  { student: 'Amani K.', subject: 'Mathématiques', grade: '18/20' },
  { student: 'Boris M.', subject: 'Physique', grade: '16/20' },
  { student: 'Céline D.', subject: 'Français', grade: '17/20' },
]

const attendanceList = [
  { student: 'Amani K.', status: 'Présent' },
  { student: 'Boris M.', status: 'Retard' },
  { student: 'Céline D.', status: 'Absent' },
  { student: 'Dylan T.', status: 'Présent' },
]

export function TeacherDashboard() {
  return (
    <div className="space-y-6 p-2">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Classes assignées</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">03</p>
          <p className="mt-1 text-xs text-slate-500">2 sections secondaires • 1 classe fondamentale</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Élèves suivis</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">86</p>
          <p className="mt-1 text-xs text-slate-500">Taux d’assiduité 94%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Prochain cours</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">Mathématiques</p>
          <p className="mt-1 text-xs text-indigo-600">09:00 • Terminale A</p>
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
                  <p className="text-xs text-indigo-600">Prochain cours {course.next}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Actions rapides</h3>
          <div className="mt-5 space-y-3">
            <button className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100">
              Saisir des notes
            </button>
            <button className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100">
              Gérer les présences
            </button>
            <button className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100">
              Publier le bulletin
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
          <p className="text-sm text-slate-500">Entrée et validation des évaluations par classe et matière.</p>
        </div>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          Enregistrer
        </button>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
          <option>Mathématiques - Terminale A</option>
          <option>Physique - Terminale C</option>
        </select>
        <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Nom de l’évaluation" defaultValue="Contrôle n°3" />
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
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Présences</h2>
          <p className="text-sm text-slate-500">Suivi des absences et présence des élèves.</p>
        </div>
        <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
          Valider l’appel
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <button className="rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">Tous présents</button>
        <button className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700">Tous absents</button>
        <button className="rounded-lg bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-700">Retards</button>
      </div>

      <div className="space-y-3">
        {attendanceList.map((item) => (
          <div key={item.student} className="grid items-center gap-3 rounded-xl border border-slate-200 p-3 md:grid-cols-[1.5fr_1fr_1fr]">
            <p className="font-semibold text-slate-900">{item.student}</p>
            <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'Présent' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Retard' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
              {item.status}
            </span>
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100">
              Modifier
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
