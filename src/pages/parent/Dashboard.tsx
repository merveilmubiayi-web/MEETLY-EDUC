const invoices = [
  { reference: 'INV-2026-021', amount: '120 000 FC', due: 'Payé', date: '12 août 2026' },
  { reference: 'INV-2026-015', amount: '75 000 FC', due: 'À payer', date: '20 août 2026' },
  { reference: 'INV-2026-010', amount: '90 000 FC', due: 'Payé', date: '05 août 2026' },
]

export function ParentDashboard() {
  return (
    <div className="space-y-6 p-2">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Enfants suivis</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">02</p>
          <p className="mt-1 text-xs text-slate-500">1 au primaire • 1 au secondaire</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Factures impayées</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">01</p>
          <p className="mt-1 text-xs text-amber-600">À régler avant le 20 août</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Dernier bulletin</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">17.4</p>
          <p className="mt-1 text-xs text-emerald-600">Très bonne performance</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Suivi du rendement</h3>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-sm text-slate-600">
                <span>Fils aîné - Mathématiques</span>
                <span>19/20</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200">
                <div className="h-2.5 w-[95%] rounded-full bg-blue-600" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm text-slate-600">
                <span>Fille cadette - Français</span>
                <span>17/20</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200">
                <div className="h-2.5 w-[85%] rounded-full bg-emerald-600" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm text-slate-600">
                <span>Participation</span>
                <span>90%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200">
                <div className="h-2.5 w-[90%] rounded-full bg-amber-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Dernière activité</h3>
          <div className="mt-5 space-y-4 text-sm text-slate-600">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Bulletin disponible</p>
              <p className="mt-1">Consultable dans le dossier de votre enfant.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-semibold text-slate-900">Absence signalée</p>
              <p className="mt-1">1 cas non justifié au cours de la semaine.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function InvoicesHistoryPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Historique des factures</h2>
        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
          Exporter PDF
        </button>
      </div>

      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.reference} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-slate-900">{invoice.reference}</p>
              <p className="text-sm text-slate-500">{invoice.date}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-bold text-slate-900">{invoice.amount}</p>
              <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${invoice.due === 'Payé' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {invoice.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
