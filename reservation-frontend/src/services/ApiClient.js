import axios from 'axios';

console.log("REACT_APP_API_URL =", process.env.REACT_APP_API_URL);
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default apiClient;
