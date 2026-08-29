import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h1 className="text-6xl font-extrabold text-red-600 mb-2">403</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès Refusé</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Vous n'avez pas les autorisations nécessaires pour accéder à cette page avec votre rôle actuel.
      </p>
      <button
        onClick={() => navigate('/login')}
        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        Retour à la connexion
      </button>
    </div>
  );
};

export default Unauthorized;