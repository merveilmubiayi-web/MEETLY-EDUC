import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface StudentInfo {
  matricule: string;
  fullName: string;
  className: string;
  parentEmail: string;
  pendingInvoices: { id: string; title: string; amount: number; dueDate: string }[];
}

const mockSearchStudent = (query: string): StudentInfo | null => {
  if (!query) return null;
  return {
    matricule: query.toUpperCase(),
    fullName: 'MUKENDI Aaron',
    className: '6ème A Primaire',
    parentEmail: 'parent.mukendi@gmail.com',
    pendingInvoices: [
      { id: 'INV-001', title: 'Minerval - Tranche 1', amount: 150, dueDate: '2026-09-15' },
      { id: 'INV-002', title: 'Frais de Cantine T1', amount: 80, dueDate: '2026-09-30' },
    ],
  };
};

export const PaymentEntry: React.FC = () => {
  const navigate = useNavigate();

  const [searchMatricule, setSearchMatricule] = useState('');
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('');
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'MOBILE_MONEY' | 'CARD'>('CASH');
  const [loading, setLoading] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const res = mockSearchStudent(searchMatricule);
    setStudent(res);
    if (res && res.pendingInvoices.length > 0) {
      setSelectedInvoiceId(res.pendingInvoices[0].id);
      setAmountPaid(res.pendingInvoices[0].amount);
    }
  };

  const handleSelectInvoice = (id: string) => {
    setSelectedInvoiceId(id);
    const inv = student?.pendingInvoices.find((i) => i.id === id);
    if (inv) setAmountPaid(inv.amount);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setReceiptNumber('RC-2026-' + Math.floor(100 + Math.random() * 900));
    }, 700);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guichet d'Encaissement</h1>
          <p className="text-sm text-gray-500">Saisie des règlements des frais scolaires et tranches de minerval</p>
        </div>
        <button onClick={() => navigate('/cashier/dashboard')} className="text-gray-600 hover:text-gray-900 text-sm">
          ← Retour
        </button>
      </div>

      {/* Barre de recherche par Matricule */}
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Entrer le matricule élève (ex: E001)..."
          value={searchMatricule}
          onChange={(e) => setSearchMatricule(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm uppercase font-mono font-bold"
        />
        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Rechercher
        </button>
      </form>

      {receiptNumber ? (
        <div className="bg-white rounded-xl p-8 border border-green-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Paiement Enregistré !</h2>
          <p className="text-sm text-gray-600">
            Reçu N° <span className="font-mono font-bold text-blue-600">{receiptNumber}</span>
            <br />
            Montant perçu : <span className="font-bold text-green-600">{amountPaid} $</span> ({paymentMethod})
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => window.print()}
              className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-900"
            >
              🖨️ Imprimer le Reçu PDF
            </button>
            <button
              onClick={() => {
                setReceiptNumber(null);
                setStudent(null);
                setSearchMatricule('');
              }}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Nouveau Paiement
            </button>
          </div>
        </div>
      ) : student ? (
        <form onSubmit={handlePay} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-xs text-blue-600 font-semibold uppercase">Fiche Élève Identifié</p>
              <p className="text-lg font-bold text-gray-900">{student.fullName} ({student.matricule})</p>
              <p className="text-xs text-gray-500">Classe : {student.className} | Parent : {student.parentEmail}</p>
            </div>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">Actif</span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sélectionner la Tranche / Frais à régler</label>
            <div className="space-y-2">
              {student.pendingInvoices.map((inv) => (
                <label
                  key={inv.id}
                  onClick={() => handleSelectInvoice(inv.id)}
                  className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer transition ${
                    selectedInvoiceId === inv.id ? 'border-blue-600 bg-blue-50/30' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="invoice"
                      checked={selectedInvoiceId === inv.id}
                      onChange={() => handleSelectInvoice(inv.id)}
                      className="text-blue-600"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{inv.title}</p>
                      <p className="text-xs text-gray-400">Échéance : {inv.dueDate}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">{inv.amount} $</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Montant Versé ($)</label>
              <input
                type="number"
                required
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
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
                <option value="MOBILE_MONEY">Mobile Money</option>
                <option value="CARD">Carte Bancaire</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg text-sm transition"
            >
              {loading ? 'Validation en cours...' : `Valider l'Encaissement de ${amountPaid} $`}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-xl p-8 border border-gray-100 text-center text-gray-400">
          Entrez un matricule d'élève (ex: E001) ci-dessus pour lancer la procédure d'encaissement.
        </div>
      )}
    </div>
  );
};

export default PaymentEntry;