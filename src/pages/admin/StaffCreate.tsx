import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@/types/auth';

export const StaffCreate: React.FC = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>(Role.TEACHER_PRIMARY);
  const [matricule, setMatricule] = useState<string>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('Pass1234!');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Génération automatique du matricule selon le rôle
  useEffect(() => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    switch (role) {
      case Role.ADMIN:
        setMatricule(`A${randomNum}`);
        break;
      case Role.TEACHER_PRIMARY:
        setMatricule(`P${randomNum}`);
        break;
      case Role.TEACHER_SECONDARY:
        setMatricule(`S${randomNum}`);
        break;
      case Role.CASHIER:
        setMatricule(`C${randomNum}`);
        break;
      default:
        setMatricule(`U${randomNum}`);
    }
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de création
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`Agent créé avec succès ! Matricule attribué : ${matricule}`);
      setTimeout(() => navigate('/admin/staff'), 1800);
    }, 600);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Créer un Compte Agent</h1>
          <p className="text-sm text-gray-500">Ajout d'un nouvel administrateur, enseignant ou caissier</p>
        </div>
        <button
          onClick={() => navigate('/admin/staff')}
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          ← Annuler
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl font-medium border border-green-200">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Rôle de l'Agent <span className="text-red-500">*</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
            >
              <option value={Role.TEACHER_PRIMARY}>Enseignant Primaire (Classe Unique)</option>
              <option value={Role.TEACHER_SECONDARY}>Enseignant Secondaire (Multi-Classes/Matières)</option>
              <option value={Role.CASHIER}>Caissier (Finances & Inscriptions)</option>
              <option value={Role.ADMIN}>Administrateur (Chef)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Matricule Généré
            </label>
            <input
              type="text"
              value={matricule}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 font-mono font-bold text-blue-700 cursor-not-allowed text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: KABANGE"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Jean"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Adresse Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="jean.kabange@ecole.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Numéro de Téléphone
            </label>
            <input
              type="tel"
              placeholder="+243 810 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mot de passe temporaire
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-mono"
            />
            <p className="text-xs text-gray-400 mt-1">L'utilisateur sera invité à le modifier lors de sa première connexion.</p>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/staff')}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
          >
            {loading ? 'Création en cours...' : 'Enregistrer le Compte Agent'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffCreate;