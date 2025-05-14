import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

const useUser = () => {
  const {
    user,
    username,
    isAuthenticated,
    loading,
    fetchUserProfile,
    logout,
  } = useContext(AuthContext);

  return {
    user,
    username,
    isAuthenticated,
    loading,
    fetchUserProfile,
    logout,
  };
};

export default useUser;
