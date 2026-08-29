import { Link } from 'react-router-dom'

const stats = [
  { value: '842', label: 'élèves suivis' },
  { value: '48', label: 'enseignants actifs' },
  { value: '94.2%', label: 'assiduité moyenne' },
  { value: '24/7', label: 'accès parent & élève' },
]

const features = [
  {
    title: 'Suivi scolaire centralisé',
    description: 'Tableaux de bord pour les enseignants, parents, élèves et direction.',
  },
  {
    title: 'Paiements et inscriptions',
    description: 'Gestion des frais, reçus et accompagnement rapide du service caisse.',
  },
  {
    title: 'Sécurité et autorisations',
    description: 'Accès contrôlé par rôle avec logique RBAC claire et simple à administrer.',
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              E
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">EducChange</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">Fonctionnalités</a>
            <a href="#stats" className="hover:text-slate-900">Chiffres</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Connexion
            </Link>
            <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              S’inscrire
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              plateforme école moderne
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Un espace unique pour gérer toute l’école.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Centralisez les inscriptions, les paiements, les notes, l’assiduité et le suivi des parents dans une plateforme simple, moderne et sécurisée.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
                Commencer maintenant
              </Link>
              <Link to="/login" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                J’ai déjà un compte
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
              <span>• Gestion parent</span>
              <span>• Caisse et paiement</span>
              <span>• Enseignants & élèves</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70">
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-100">Tableau de bord</p>
                    <h2 className="mt-2 text-2xl font-bold">Vue d’ensemble</h2>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">Live</div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.15em] text-blue-100">Élèves</p>
                    <p className="mt-3 text-3xl font-bold">842</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.15em] text-blue-100">Paiements</p>
                    <p className="mt-3 text-3xl font-bold">78.5%</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {['Matières / notes', 'Présences', 'Factures', 'Rôle admin'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                    <span>{item}</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">OK</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="stats" className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">fonctionnalités</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Tout ce qu’il faut pour piloter une école</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-700">✦</div>
                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-slate-900 py-16 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-bold">Une plateforme pensée pour les acteurs scolaires</h2>
            <p className="mt-4 text-slate-300">
              Plus de friction administrative, plus de suivi dispersé, plus de temps perdu.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500">
                Ouvrir un compte
              </Link>
              <Link to="/login" className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-700">
                Se connecter
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
