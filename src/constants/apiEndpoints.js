// Конфигурация API endpoints
// Здесь можно легко изменить пути к API при необходимости

export const API_ENDPOINTS = {
  // Авторизация
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/create',
    LOGOUT: '/users/logout',
    ME: '/users/me',
    GET_USER: (userId) => `/users/${userId}`,
  },

  // Новости
  NEWS: {
    GET_ALL: '/news/all',
    GET_BY_ID: (id) => `/news/${id}`,
    CREATE: '/news/create',
  },

  // Светофоры
  TRAFFIC_LIGHTS: {
    GET_ALL: '/traffic/all',
    CREATE: '/traffic/create',
  },

  // Происшествия
  ACCIDENTS: {
    GET_ALL: '/accidents/all',
    GET_BY_ID: (id) => `/accidents/${id}`,
  },

  // Штрафы
  FINES: {
    GET_ALL: '/fines/all',
    GET_BY_ID: (id) => `/fines/${id}`,
  },

  // Эвакуации
  EVACUATIONS: {
    GET_ALL: '/evacuations/all',
    GET_BY_ID: (id) => `/evacuations/${id}`,
  },

  // Документы
  DOCUMENTS: {
    GET_ALL: '/documents/all',
    UPLOAD: '/documents/upload',
  },

  // Статистика (для будущего использования)
  STATISTICS: {
    ACCIDENTS: '/statistics/accidents',
    DANGEROUS_STREETS: '/statistics/dangerous-streets',
    FINES: '/statistics/fines',
    EVACUATIONS: '/statistics/evacuations',
  }
};

// Типы данных для API (для документации)
export const API_DATA_TYPES = {
  USER: {
    login: 'string',
    role: 'string',
  },
  
  NEWS: {
    id: 'number',
    title: 'string',
    content: 'string',
    publication_date: 'string',
    author: 'string',
  },

  TRAFFIC_LIGHT: {
    id: 'number',
    address: 'string',
    latitude: 'number',
    longitude: 'number',
    type: 'string',
    status: 'string', // 'active' | 'inactive'
    installation_date: 'string',
  },

  ACCIDENT: {
    id: 'number',
    location: 'string',
    latitude: 'number',
    longitude: 'number',
    date: 'string',
    severity: 'string',
    description: 'string',
  }
};