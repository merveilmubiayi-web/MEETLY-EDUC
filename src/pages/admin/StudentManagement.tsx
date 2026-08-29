import React from 'react'

const studentRows = [
  { name: 'Fanta Diop', className: 'Terminale A', attendance: '96%', status: 'Actif', contact: 'fanta.diop@ecole.sn' },
  { name: 'Ibrahima Sarr', className: 'Seconde B', attendance: '94%', status: 'Actif', contact: 'ibra.sarr@ecole.sn' },
  { name: 'Aminata Mbaye', className: 'CM2 B', attendance: '91%', status: 'À suivre', contact: 'aminata.mbaye@ecole.sn' },
  { name: 'Mamadou Niane', className: '3ème C', attendance: '89%', status: 'Actif', contact: 'mamadou.niane@ecole.sn' },
]

export const StudentManagement: React.FC = () => {
  return (
    <div className="space-y-6 p-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">Gestion académique</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Élèves</h2>
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            + Ajouter un élève
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Effectif total</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">842</p>
          <p className="mt-1 text-xs text-slate-500">+18 cette année</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Taux d’assiduité</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">94%</p>
          <p className="mt-1 text-xs text-emerald-600">Stable sur le trimestre</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">À risque</p>
          <p className="mt-2 text-3xl font-bold text-amber-600">12</p>
          <p className="mt-1 text-xs text-amber-600">Suivi pédagogique recommandé</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-bold text-slate-900">Liste des élèves</h3>
          <div className="flex gap-2">
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Rechercher"
            />
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Filtrer
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Élève</th>
                <th className="px-4 py-3 font-semibold">Classe</th>
                <th className="px-4 py-3 font-semibold">Présence</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
              </tr>
            </thead>
            <tbody>
              {studentRows.map((student) => (
                <tr key={student.name} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-semibold text-slate-800">{student.name}</td>
                  <td className="px-4 py-3 text-slate-600">{student.className}</td>
                  <td className="px-4 py-3 text-slate-600">{student.attendance}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${student.status === 'Actif' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{student.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StudentManagement
