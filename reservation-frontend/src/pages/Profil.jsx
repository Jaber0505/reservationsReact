import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
  const { isAuthenticated, username, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Mon profil</h1>
        <p className="mt-4">Bienvenue, <strong>{username}</strong></p>
        {user && (
          <div className="mt-4">
            <p>Prénom : {user.first_name}</p>
            <p>Nom : {user.last_name}</p>
            <p>Email : {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil;
