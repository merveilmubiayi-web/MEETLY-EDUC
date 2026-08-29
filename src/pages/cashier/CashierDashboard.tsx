import React from 'react';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, bgColor }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{subtext}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center text-white text-xl font-bold`}>
        💳
      </div>
    </div>
  </div>
);

export const CashierDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Espace Caisse & Inscriptions</h1>
          <p className="text-sm text-gray-500">Gestion des encaissements, reçus et inscriptions des élèves</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/cashier/registration')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition text-sm"
          >
            + Inscrire un Élève
          </button>
          <button
            onClick={() => navigate('/cashier/payment')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition text-sm"
          >
            + Nouvel Encaissement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Encaissements du Jour" value="1 450 $" subtext="14 transactions validées" bgColor="bg-green-600" />
        <StatCard title="Inscriptions de la Semaine" value="28" subtext="Matricules générés (E001-E028)" bgColor="bg-blue-600" />
        <StatCard title="Tranches en Attente" value="42" subtext="Relances urgentes recommandées" bgColor="bg-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Derniers Encaissements</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="p-3 font-semibold">Reçu #</th>
                  <th className="p-3 font-semibold">Élève</th>
                  <th className="p-3 font-semibold">Objet</th>
                  <th className="p-3 font-semibold">Montant</th>
                  <th className="p-3 font-semibold">Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/50">
                  <td className="p-3 font-mono font-bold text-gray-800">RC-2026-089</td>
                  <td className="p-3">E014 - MUKENDI Aaron</td>
                  <td className="p-3">Minerval T1</td>
                  <td className="p-3 font-bold text-green-600">150 $</td>
                  <td className="p-3"><span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded font-medium">Cash</span></td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-3 font-mono font-bold text-gray-800">RC-2026-088</td>
                  <td className="p-3">E032 - KABEYA Grace</td>
                  <td className="p-3">Inscription + Tenue</td>
                  <td className="p-3 font-bold text-green-600">220 $</td>
                  <td className="p-3"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium">Mobile Money</span></td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-3 font-mono font-bold text-gray-800">RC-2026-087</td>
                  <td className="p-3">E005 - TSHILOMBO David</td>
                  <td className="p-3">Frais de Bus M1</td>
                  <td className="p-3 font-bold text-green-600">50 $</td>
                  <td className="p-3"><span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded font-medium">Carte</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Actions Rapides</h2>
          <button
            onClick={() => navigate('/cashier/registration')}
            className="w-full text-left p-3 border rounded-xl hover:border-green-500 hover:bg-green-50/50 transition"
          >
            <p className="font-semibold text-gray-800 text-sm">Inscription Élève & Parent</p>
            <p className="text-xs text-gray-500">Création automatique du compte parent</p>
          </button>
          <button
            onClick={() => navigate('/cashier/payment')}
            className="w-full text-left p-3 border rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition"
          >
            <p className="font-semibold text-gray-800 text-sm">Enregistrer un Paiement</p>
            <p className="text-xs text-gray-500">Recherche par matricule élève</p>
          </button>
          <button
            onClick={() => navigate('/cashier/students')}
            className="w-full text-left p-3 border rounded-xl hover:border-amber-500 hover:bg-amber-50/50 transition"
          >
            <p className="font-semibold text-gray-800 text-sm">Suivi des Relances</p>
            <p className="text-xs text-gray-500">Liste des retardataires par classe</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;