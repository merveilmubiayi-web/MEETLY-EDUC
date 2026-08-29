import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const StudentRegistration: React.FC = () => {
  const navigate = useNavigate();

  // Données Élève
  const [studentMatricule, setStudentMatricule] = useState('');
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [selectedClass, setSelectedClass] = useState('6A');

  // Données Parent (généré automatiquement)
  const [parentEmail, setParentEmail] = useState('');
  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [parentPhone, setParentPhone] = useState('');

  // Frais d'inscription
  const [regFeeAmount, setRegFeeAmount] = useState('100');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'MOBILE_MONEY' | 'CARD'>('CASH');

  const [loading, setLoading] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<string | null>(null);

  useEffect(() => {
    const randomMatricule = 'E' + Math.floor(1000 + Math.random() * 9000);
    setStudentMatricule(randomMatricule);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const receiptNumber = 'RC-REG-' + Math.floor(10000 + Math.random() * 90000);
      setSuccessReceipt(receiptNumber);
    }, 800);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nouvelle Inscription Élève</h1>
          <p className="text-sm text-gray-500">Génère le compte élève et crée automatiquement l'accès parent</p>
        </div>
        <button onClick={() => navigate('/cashier/dashboard')} className="text-gray-600 hover:text-gray-900 text-sm">
          ← Retour
        </button>
      </div>

      {successReceipt ? (
        <div className="bg-white rounded-xl p-8 border border-green-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Inscription & Encaissement Réussis !</h2>
          <p className="text-sm text-gray-600">
            Élève : <span className="font-mono font-bold text-gray-900">{studentMatricule}</span> ({studentLastName} {studentFirstName})
            <br />
            Compte Parent : <span className="font-semibold text-gray-900">{parentEmail}</span>
          </p>
          <div className="p-4 bg-gray-50 rounded-lg text-sm font-mono inline-block">
            N° de Reçu : <span className="font-bold text-blue-600">{successReceipt}</span>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-900"
            >
              🖨️ Imprimer le Reçu PDF
            </button>
            <button
              onClick={() => navigate('/cashier/dashboard')}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Retour au Tableau de Bord
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 : Élève */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">1. Information de l'Élève</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Matricule Attribué</label>
                <input
                  type="text"
                  value={studentMatricule}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100 font-mono font-bold text-blue-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nom <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ex: MUKENDI"
                  value={studentLastName}
                  onChange={(e) => setStudentLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Prénom <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aaron"
                  value={studentFirstName}
                  onChange={(e) => setStudentFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Date de Naissance</label>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Sexe</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'M' | 'F')}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                >
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Classe d'Affectation</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                >
                  <option value="6A">6ème A Primaire</option>
                  <option value="5B">5ème B Primaire</option>
                  <option value="3A">3ème A Secondaire</option>
                  <option value="1B">1ère B Secondaire</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2 : Parent */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">2. Information du Tuteur (Création Compte Parent)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Parent (Identifiant de connexion) <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  placeholder="parent.mukendi@gmail.com"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Téléphone Tuteur <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="+243 810 000 000"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nom Tuteur</label>
                <input
                  type="text"
                  placeholder="MUKENDI"
                  value={parentLastName}
                  onChange={(e) => setParentLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Prénom Tuteur</label>
                <input
                  type="text"
                  placeholder="Robert"
                  value={parentFirstName}
                  onChange={(e) => setParentFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 3 : Frais d'Inscription */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">3. Paiement des Frais d'Inscription</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Montant ($)</label>
                <input
                  type="number"
                  value={regFeeAmount}
                  onChange={(e) => setRegFeeAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-bold text-green-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mode de Règlement</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                >
                  <option value="CASH">Espèces / Cash</option>
                  <option value="MOBILE_MONEY">Mobile Money (M-Pesa, Orange)</option>
                  <option value="CARD">Carte Bancaire</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/cashier/dashboard')}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm transition"
            >
              {loading ? 'Validation en cours...' : 'Valider l\'Inscription & Émettre Reçu'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentRegistration;