import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <div
          className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"
          role="status"
        />
        <p className="mt-4 text-gray-600">Chargement...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
