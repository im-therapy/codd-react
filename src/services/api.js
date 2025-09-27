import axios from 'axios';
import { API_BASE_URL } from '../constants/config';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (login, password, role = 'viewer') =>
    api.post(API_ENDPOINTS.AUTH.REGISTER, { login, password, role }),

  login: (login, password) =>
    api.post(API_ENDPOINTS.AUTH.LOGIN, { login, password }),

  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),

  me: () => api.get(API_ENDPOINTS.AUTH.ME),

  getUser: (userId) => api.get(API_ENDPOINTS.AUTH.GET_USER(userId)),
};

export const trafficLightsAPI = {
  getAll: () => api.get(API_ENDPOINTS.TRAFFIC_LIGHTS.GET_ALL),
  create: (data) => api.post(API_ENDPOINTS.TRAFFIC_LIGHTS.CREATE, data),
};

export const accidentsAPI = {
  getAll: () => api.get(API_ENDPOINTS.ACCIDENTS.GET_ALL),
  getById: (id) => api.get(API_ENDPOINTS.ACCIDENTS.GET_BY_ID(id)),
};

export const newsAPI = {
  getAll: () => api.get(API_ENDPOINTS.NEWS.GET_ALL),
  getById: (id) => api.get(API_ENDPOINTS.NEWS.GET_BY_ID(id)),
  create: (data) => api.post(API_ENDPOINTS.NEWS.CREATE, data),
};

export const finesAPI = {
  getAll: () => api.get(API_ENDPOINTS.FINES.GET_ALL),
  getById: (id) => api.get(API_ENDPOINTS.FINES.GET_BY_ID(id)),
};

export const evacuationsAPI = {
  getAll: () => api.get(API_ENDPOINTS.EVACUATIONS.GET_ALL),
  getById: (id) => api.get(API_ENDPOINTS.EVACUATIONS.GET_BY_ID(id)),
};

export const documentsAPI = {
  getAll: () => api.get(API_ENDPOINTS.DOCUMENTS.GET_ALL),
  upload: (formData) => api.post(API_ENDPOINTS.DOCUMENTS.UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Статистика API (для будущего использования)
export const statisticsAPI = {
  getAccidents: (params) => api.get(API_ENDPOINTS.STATISTICS.ACCIDENTS, { params }),
  getDangerousStreets: (params) => api.get(API_ENDPOINTS.STATISTICS.DANGEROUS_STREETS, { params }),
  getFines: (params) => api.get(API_ENDPOINTS.STATISTICS.FINES, { params }),
  getEvacuations: (params) => api.get(API_ENDPOINTS.STATISTICS.EVACUATIONS, { params }),
};


export default api;