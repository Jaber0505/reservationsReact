import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

const useAuth = () => {
  const {
    isAuthenticated,
    logout,
    username,
    isLoggingOut,
    user,
    loading,
  } = useContext(AuthContext);

  return {
    isAuthenticated,
    logout,
    username,
    isLoggingOut,
    user,
    loading,
  };
};

export default useAuth;
