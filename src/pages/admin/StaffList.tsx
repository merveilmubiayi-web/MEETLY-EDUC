import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@/types/auth';

interface StaffMember {
  id: string;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
}

const mockStaff: StaffMember[] = [
  { id: '1', matricule: 'A001', firstName: 'Joseph', lastName: 'Kabange', email: 'j.kabange@ecole.com', role: Role.ADMIN, status: 'ACTIVE', createdAt: '2026-01-10' },
  { id: '2', matricule: 'P001', firstName: 'Marie', lastName: 'Mbuyi', email: 'm.mbuyi@ecole.com', role: Role.TEACHER_PRIMARY, status: 'ACTIVE', createdAt: '2026-02-01' },
  { id: '3', matricule: 'S001', firstName: 'Patrick', lastName: 'Ilunga', email: 'p.ilunga@ecole.com', role: Role.TEACHER_SECONDARY, status: 'ACTIVE', createdAt: '2026-02-05' },
  { id: '4', matricule: 'C001', firstName: 'Chantal', lastName: 'Nzuzi', email: 'c.nzuzi@ecole.com', role: Role.CASHIER, status: 'ACTIVE', createdAt: '2026-02-10' },
];

export const StaffList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || staff.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full font-medium">Admin</span>;
      case Role.TEACHER_PRIMARY:
        return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium">Enseignant Primaire</span>;
      case Role.TEACHER_SECONDARY:
        return <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 rounded-full font-medium">Enseignant Secondaire</span>;
      case Role.CASHIER:
        return <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">Caissier</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion du Personnel</h1>
          <p className="text-sm text-gray-500">Liste des comptes administrateurs, enseignants et caissiers</p>
        </div>
        <button
          onClick={() => navigate('/admin/staff/create')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition self-start sm:self-auto"
        >
          + Créer un compte Agent
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Rechercher par nom, matricule ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm bg-white"
        >
          <option value="ALL">Tous les rôles</option>
          <option value={Role.ADMIN}>Administrateur</option>
          <option value={Role.TEACHER_PRIMARY}>Enseignant Primaire</option>
          <option value={Role.TEACHER_SECONDARY}>Enseignant Secondaire</option>
          <option value={Role.CASHIER}>Caissier</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="p-4 font-semibold">Matricule</th>
                <th className="p-4 font-semibold">Nom & Prénom</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Rôle</th>
                <th className="p-4 font-semibold">Statut</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-mono font-bold text-gray-800">{staff.matricule}</td>
                  <td className="p-4 font-medium text-gray-900">{staff.lastName} {staff.firstName}</td>
                  <td className="p-4 text-gray-500">{staff.email}</td>
                  <td className="p-4">{getRoleBadge(staff.role)}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${staff.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {staff.status === 'ACTIVE' ? 'Actif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">Éditer</button>
                    <button className="text-red-600 hover:text-red-800 font-medium">Réinitialiser</button>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    Aucun agent trouvé pour ces critères.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffList;