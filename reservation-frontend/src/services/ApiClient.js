import axios from 'axios';

const TOKEN_KEYS = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête : ajout du token access
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEYS.ACCESS);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponse : tentative de refresh si 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH);
      if (!refreshToken) {
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/accounts/api/token/refresh/`,
          { refresh: refreshToken }
        );

        const { access, refresh } = res.data;

        localStorage.setItem(TOKEN_KEYS.ACCESS, access);
        if (refresh) {
          localStorage.setItem(TOKEN_KEYS.REFRESH, refresh);
        }

        // Réessaye la requête d'origine avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.warn('Refresh token invalide ou expiré');
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
