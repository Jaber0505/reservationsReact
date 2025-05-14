import { useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ redirectTo = '/profil' }) => {
  const { register, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      navigate(redirectTo);
    } catch (err) {
      setError("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin h-10 w-10 mx-auto border-4 border-green-500 border-t-transparent rounded-full" />
          <p className="mt-4">Création du compte...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          <input
            type="text"
            name="first_name"
            placeholder="Prénom"
            autoComplete="given-name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Nom"
            autoComplete="family-name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            S'inscrire
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
