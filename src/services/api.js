import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (firstName, lastName, email, password) =>
    api.post('/auth/register', { firstName, lastName, email, password }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

export const markersAPI = {
  getAll: () => api.get('/markers'),
};

export const accidentsAPI = {
  getById: (id) => api.get(`/accidents/${id}`),
  uploadPhoto: (id, formData) =>
    api.post(`/accidents/${id}/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const articlesAPI = {
  getAll: () => api.get('/articles'),
  getById: (id) => api.get(`/articles/${id}`),
  likeArticle: (id) => api.post(`/articles/${id}/like`),
  unlikeArticle: (id) => api.delete(`/articles/${id}/like`),
  checkLikeStatus: (id) => api.get(`/articles/${id}/like-status`),
};

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter', { email }),
};

export const statisticsAPI = {
  getFines: (startDate, endDate) =>
    api.get('/statistics/fines', { params: { startDate, endDate } }),

  getEvacuations: (startDate, endDate) =>
    api.get('/statistics/evacuations', { params: { startDate, endDate } }),

  getAccidents: (startDate, endDate) =>
    api.get('/statistics/accidents', { params: { startDate, endDate } }),
};

export const trafficLightsAPI = {
  getAll: () => api.get('/traffic-lights'),
};

export const adminAPI = {
  importData: (formData, dataType) =>
    api.post('/admin/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { data_type: dataType }
    }),

  exportData: (type, format) =>
    api.get(`/admin/export/${type}`, {
      params: { format },
      responseType: 'blob'
    }),
};

export default api;