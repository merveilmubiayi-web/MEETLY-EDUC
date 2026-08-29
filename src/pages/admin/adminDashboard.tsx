import React from 'react';
import { useNavigate } from 'react-router-dom';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtext: string;
  iconBg: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, subtext, iconBg }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{subtext}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center text-white text-xl font-bold`}>
        📊
      </div>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Administrateur</h1>
          <p className="text-sm text-gray-500">Vue d'ensemble de l'établissement et indicateurs clés</p>
        </div>
        <button
          onClick={() => navigate('/admin/staff/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
        >
          + Créer un compte Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Effectif Total Élèves" value="842" subtext="380 Primaire | 462 Secondaire" iconBg="bg-blue-600" />
        <KpiCard title="Corps Enseignant" value="48" subtext="12 Primaire | 36 Secondaire" iconBg="bg-indigo-600" />
        <KpiCard title="Taux de Recouvrement" value="78.5%" subtext="Tranche T1 : 92% perçu" iconBg="bg-green-600" />
        <KpiCard title="Assiduité Globale" value="94.2%" subtext="Semaine en cours" iconBg="bg-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Raccourcis de Gestion</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/admin/staff')}
              className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition"
            >
              <p className="font-semibold text-gray-800">Gestion Personnel</p>
              <p className="text-xs text-gray-500 mt-1">Enseignants, Caissiers, Admins</p>
            </button>

            <button
              onClick={() => navigate('/admin/assignments')}
              className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition"
            >
              <p className="font-semibold text-gray-800">Affectations</p>
              <p className="text-xs text-gray-500 mt-1">Attribution des classes et cours</p>
            </button>

            <button
              onClick={() => navigate('/admin/structure')}
              className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition"
            >
              <p className="font-semibold text-gray-800">Structure Scolaire</p>
              <p className="text-xs text-gray-500 mt-1">Classes, Matières, Niveaux</p>
            </button>

            <button
              onClick={() => navigate('/admin/logs')}
              className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition"
            >
              <p className="font-semibold text-gray-800">Journal d'Audit</p>
              <p className="text-xs text-gray-500 mt-1">Traces de sécurité et opérations</p>
            </button>

            <button
              onClick={() => navigate('/admin/settings')}
              className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition"
            >
              <p className="font-semibold text-gray-800">Configuration</p>
              <p className="text-xs text-gray-500 mt-1">Paramètres généraux et frais</p>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Dernières Activités</h2>
          <div className="space-y-4">
            <div className="flex gap-3 text-xs border-b pb-3">
              <span className="font-mono text-gray-400">14:32</span>
              <div>
                <p className="font-semibold text-gray-800">Nouveau reçu émis #RC-892</p>
                <p className="text-gray-500">Caissier C001 (Élève E045)</p>
              </div>
            </div>
            <div className="flex gap-3 text-xs border-b pb-3">
              <span className="font-mono text-gray-400">11:15</span>
              <div>
                <p className="font-semibold text-gray-800">Évaluation verrouillée</p>
                <p className="text-gray-500">Enseignant S012 - Mathématiques 3ème A</p>
              </div>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="font-mono text-gray-400">09:00</span>
              <div>
                <p className="font-semibold text-gray-800">Compte Agent créé (P008)</p>
                <p className="text-gray-500">Admin A001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;