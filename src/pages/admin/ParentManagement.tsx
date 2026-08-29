import React from 'react'

const parentRows = [
  { name: 'Awa Diop', children: 'Fanta Diop • M. Diop', status: 'Actif', balance: '0 FC', lastContact: '2026-08-12' },
  { name: 'Babacar Niane', children: 'Mamadou Niane', status: 'À relancer', balance: '75 000 FC', lastContact: '2026-08-08' },
  { name: 'Seydou Mbaye', children: 'Aminata Mbaye', status: 'Actif', balance: '0 FC', lastContact: '2026-08-11' },
  { name: 'Marième Sarr', children: 'Ibrahima Sarr', status: 'À payer', balance: '50 000 FC', lastContact: '2026-08-10' },
]

export const ParentManagement: React.FC = () => {
  return (
    <div className="space-y-6 p-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-600">Suivi parentale</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Parents & tuteurs</h2>
          </div>
          <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">
            + Ajouter un parent
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Parents inscrits</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">624</p>
          <p className="mt-1 text-xs text-slate-500">Suivi actif</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">À relancer</p>
          <p className="mt-2 text-3xl font-bold text-amber-600">18</p>
          <p className="mt-1 text-xs text-amber-600">Paiements en retard</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Réseaux actifs</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">87%</p>
          <p className="mt-1 text-xs text-emerald-600">Communication stable</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Suivi des parents</h3>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Dernière semaine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Parent</th>
                <th className="px-4 py-3 font-semibold">Enfants</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th className="px-4 py-3 font-semibold">Solde</th>
                <th className="px-4 py-3 font-semibold">Dernier contact</th>
              </tr>
            </thead>
            <tbody>
              {parentRows.map((parent) => (
                <tr key={parent.name} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-semibold text-slate-800">{parent.name}</td>
                  <td className="px-4 py-3 text-slate-600">{parent.children}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${parent.status === 'Actif' ? 'bg-emerald-100 text-emerald-700' : parent.status === 'À relancer' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {parent.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{parent.balance}</td>
                  <td className="px-4 py-3 text-slate-600">{parent.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ParentManagement
