import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/types/auth';

export const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(identifier, password);
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Redirection automatique selon le rôle
      switch (savedUser.role) {
        case Role.ADMIN:
          navigate('/admin/dashboard');
          break;
        case Role.CASHIER:
          navigate('/cashier/dashboard');
          break;
        case Role.TEACHER_PRIMARY:
        case Role.TEACHER_SECONDARY:
          navigate('/teacher/dashboard');
          break;
        case Role.PARENT:
          navigate('/parent/dashboard');
          break;
        case Role.STUDENT:
          navigate('/student/dashboard');
          break;
        default:
          navigate('/unauthorized');
      }
    } catch (err: any) {
      setError(err.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Portail Établissement
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Matricule ou Adresse Email
            </label>
            <input
              type="text"
              required
              placeholder="Ex: A001, C001, E001 ou parent@gmail.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full border border-blue-200 bg-blue-50 text-blue-700 font-semibold py-2 px-4 rounded-lg transition hover:bg-blue-100"
          >
            Créer un compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;