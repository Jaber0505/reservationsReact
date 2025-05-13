import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../services/ApiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = useCallback(async (token) => {
    try {
      const decoded = jwtDecode(token);
      setIsAuthenticated(true);
      setUsername(decoded.username || decoded.user_id);

      // Si besoin : récupérer les infos complètes depuis le backend (/me/)
      // const res = await apiClient.get('/accounts/api/me/');
      // setUser(res.data);
    } catch (err) {
      console.error('Erreur de décodage du token :', err);
      logout();
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await apiClient.post('/accounts/api/token/', {
        username,
        password,
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      await loadUserFromToken(res.data.access);
    } catch (err) {
      console.error('Erreur de connexion :', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      await apiClient.post('/accounts/api/register/', formData);
      await login(formData.username, formData.password);
    } catch (err) {
      console.error('Erreur d\'inscription :', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUsername(null);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    if (token) {
      loadUserFromToken(token);
    } else {
      setLoading(false);
    }

    const interval = setInterval(async () => {
      if (refreshToken) {
        try {
          const res = await apiClient.post('/accounts/api/token/refresh/', {
            refresh: refreshToken,
          });
          localStorage.setItem('access', res.data.access);
          await loadUserFromToken(res.data.access);
        } catch (err) {
          console.warn('Échec du refresh token');
          logout();
        }
      }
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loadUserFromToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, user, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};