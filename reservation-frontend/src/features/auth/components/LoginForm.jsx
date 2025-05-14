import { useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ redirectTo = '/profil' }) => {
  const { login, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.username, formData.password);
      navigate(redirectTo);
    } catch (err) {
      setError(err?.message || 'Identifiants invalides');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin h-10 w-10 mx-auto border-4 border-blue-500 border-t-transparent rounded-full" />
          <p className="mt-4">Connexion en cours...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            Se connecter
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
