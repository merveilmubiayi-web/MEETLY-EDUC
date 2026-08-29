const studentGrades = [
  { subject: 'Mathématiques', grade: '18/20', trend: '+1.5' },
  { subject: 'Physique', grade: '16/20', trend: '+0.8' },
  { subject: 'Français', grade: '17/20', trend: '+1.1' },
  { subject: 'Informatique', grade: '19/20', trend: '+2.0' },
]

const assignments = [
  { title: 'Devoir maison 3', subject: 'Mathématiques', due: '18 août', status: 'À rendre' },
  { title: 'Projet groupe', subject: 'Informatique', due: '20 août', status: 'En cours' },
  { title: 'Exposé oral', subject: 'Français', due: '22 août', status: 'À préparer' },
]

export function StudentDashboard() {
  return (
    <div className="space-y-6 p-2">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Moyenne générale</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">17.2</p>
          <p className="mt-1 text-xs text-emerald-600">+1.1 depuis le dernier trimestre</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Absences</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">2</p>
          <p className="mt-1 text-xs text-slate-500">Aucune absence injustifiée</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Devoirs à rendre</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">03</p>
          <p className="mt-1 text-xs text-amber-600">2 jours avant la date limite</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Dernières notes</h3>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Semestre</span>
          </div>

          <div className="space-y-3">
            {studentGrades.map((item) => (
              <div key={item.subject} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-800">{item.subject}</p>
                  <p className="text-xs text-slate-500">Évaluation récente</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{item.grade}</p>
                  <p className="text-xs text-emerald-600">{item.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Progression</h3>
          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-sm text-slate-600">
                <span>Mathématiques</span>
                <span>88%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200">
                <div className="h-2.5 w-[88%] rounded-full bg-blue-600" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm text-slate-600">
                <span>Informatique</span>
                <span>92%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200">
                <div className="h-2.5 w-[92%] rounded-full bg-emerald-600" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm text-slate-600">
                <span>Français</span>
                <span>81%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200">
                <div className="h-2.5 w-[81%] rounded-full bg-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AssignmentsPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Devoirs & travaux</h2>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          + Nouveau devoir
        </button>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div key={assignment.title} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">{assignment.title}</p>
              <p className="text-sm text-slate-500">{assignment.subject} • À remettre le {assignment.due}</p>
            </div>
            <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              {assignment.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
