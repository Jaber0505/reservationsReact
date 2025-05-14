import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import apiClient from 'services/ApiClient';
import Toast from 'utils/ToastHelper';

export const AuthContext = createContext();

const TOKEN_KEYS = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState(null); // setUser est ici correctement défini
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    setIsLoggingOut(true);
    console.log('[logout] Déconnexion en cours...');

    try {
      if (access && refresh) {
        console.log('[logout] Envoi vers /token/logout');
        await apiClient.post('/accounts/api/token/logout/', { refresh });
      }
    } catch (err) {
      console.warn('[logout] Erreur logout distant :', err);
    } finally {
      console.log('[logout] Nettoyage localStorage & état');
      localStorage.clear();
      setIsAuthenticated(false);
      setUser(null); // réinitialiser ici
      setUsername(null); // réinitialiser ici
      setIsLoggingOut(false);
    }
  };

  const fetchUserProfile = async () => {
    console.log('[fetchUserProfile] Appel API /me/');
    try {
      const res = await apiClient.get('/accounts/api/me/');
      console.log('[fetchUserProfile] Réponse reçue :', res.data);
      setUser(res.data); // On définit ici l'utilisateur après la réponse
    } catch (err) {
      console.warn('[fetchUserProfile] Erreur chargement profil utilisateur', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loadUserFromToken = useCallback(async (token) => {
    console.log('[loadUserFromToken] Décodage token...');
    try {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      console.log('[loadUserFromToken] Token expiré ?', decoded.exp < now);

      if (decoded.exp < now) {
        console.warn('[loadUserFromToken] Token expiré, déconnexion');
        logout();
        return;
      }

      console.log('[loadUserFromToken] Authentifié :', decoded.username || decoded.user_id);
      setIsAuthenticated(true);
      setUsername(decoded.username || decoded.user_id);
    } catch (err) {
      console.error('[loadUserFromToken] Échec décodage', err);
      logout();
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    console.log('[login] Tentative de connexion...');
    try {
      const res = await apiClient.post('/accounts/api/token/', { username, password });
      localStorage.setItem(TOKEN_KEYS.ACCESS, res.data.access);
      localStorage.setItem(TOKEN_KEYS.REFRESH, res.data.refresh);
      await loadUserFromToken(res.data.access);
      Toast.success(`Bienvenue ${username} 👋`);
      await fetchUserProfile();
      console.log('[login] Token reçu et utilisateur chargé');
    } catch (err) {
      console.error('[login] Erreur de connexion :', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    console.log('[register] Tentative d’inscription...');
    try {
      await apiClient.post('/accounts/api/register/', formData);
      await login(formData.username, formData.password);
      Toast.success("Inscription réussie. Vous êtes maintenant connecté !");
    } catch (err) {
      console.error('[register] Erreur inscription :', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEYS.ACCESS);
    const refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH);

    console.log('[useEffect] Initialisation. Token présent ?', !!token);

    if (token) {
      loadUserFromToken(token);
      fetchUserProfile();
    } else {
      setLoading(false);
      console.log('[useEffect] Aucun token → pas authentifié');
    }

    const interval = setInterval(async () => {
      if (refreshToken) {
        try {
          console.log('[refresh] Tentative de refresh...');
          const res = await apiClient.post('/accounts/api/token/refresh/', { refresh: refreshToken });

          localStorage.setItem(TOKEN_KEYS.ACCESS, res.data.access);
          if (res.data.refresh) {
            localStorage.setItem(TOKEN_KEYS.REFRESH, res.data.refresh);
          }

          await loadUserFromToken(res.data.access);
        } catch (err) {
          console.warn('[refresh] Échec du refresh token, déconnexion');
          logout();
        }
      }
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loadUserFromToken]);

  console.log('[AuthContext] État actuel → user :', user);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        user,
        loading,
        login,
        logout,
        register,
        isLoggingOut,
        fetchUserProfile,
        setUser, // Assure-toi que setUser est bien fourni
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
