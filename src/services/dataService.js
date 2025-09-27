import { USE_MOCK_DATA } from '../constants/config';
import { mockArticles } from '../data/mockArticles';
import { mockMarkers } from '../data/mockMarkers';
import { authAPI, newsAPI, trafficLightsAPI, accidentsAPI, finesAPI, evacuationsAPI, documentsAPI } from './api';
import { checkServerHealth } from './apiHealthCheck';

// Функции для работы с новостями
export const getNews = async () => {
  if (USE_MOCK_DATA || !(await checkServerHealth())) {
    return mockArticles;
  }
  
  try {
    const response = await newsAPI.getAll();
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    return mockArticles;
  }
};

export const getNewsById = async (id) => {
  if (USE_MOCK_DATA) {
    return mockArticles.find(article => article.id === parseInt(id));
  }
  
  try {
    const response = await newsAPI.getById(id);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении новости:', error);
    return null;
  }
};

export const createNews = async (newsData) => {
  try {
    const response = await newsAPI.create(newsData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message };
  }
};

// Функции для работы со светофорами
export const getTrafficLights = async () => {
  if (USE_MOCK_DATA || !(await checkServerHealth())) {
    return mockMarkers;
  }
  
  try {
    const response = await trafficLightsAPI.getAll();
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении светофоров:', error);
    return mockMarkers;
  }
};

export const createTrafficLight = async (data) => {
  try {
    const response = await trafficLightsAPI.create(data);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message };
  }
};

// Функции для работы с происшествиями
export const getAccidents = async () => {
  try {
    const response = await accidentsAPI.getAll();
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении происшествий:', error);
    return [];
  }
};

// Функции для работы со штрафами
export const getFines = async () => {
  try {
    const response = await finesAPI.getAll();
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении штрафов:', error);
    return [];
  }
};

// Функции для работы с эвакуациями
export const getEvacuations = async () => {
  try {
    const response = await evacuationsAPI.getAll();
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении эвакуаций:', error);
    return [];
  }
};

// Функции для работы с документами
export const getDocuments = async () => {
  try {
    const response = await documentsAPI.getAll();
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении документов:', error);
    return [];
  }
};

export const uploadDocument = async (file, title, description) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    const response = await documentsAPI.upload(formData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message };
  }
};

// Совместимость со старыми функциями
export const getArticles = getNews;
export const getArticleById = getNewsById;
export const getMarkers = getTrafficLights;

// Функции авторизации (для совместимости)
export const loginUser = async (login, password) => {
  if (USE_MOCK_DATA || !(await checkServerHealth())) {
    return {
      success: true,
      token: 'mock-jwt-token',
      user: { id: 1, login, role: 'viewer', name: 'Пользователь' }
    };
  }
  
  try {
    const response = await authAPI.login(login, password);
    return { success: true, ...response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || 'Ошибка авторизации' };
  }
};

export const registerUser = async (login, password, role = 'viewer') => {
  if (USE_MOCK_DATA || !(await checkServerHealth())) {
    console.log('📝 Мок регистрация:', { login, password, role });
    return { success: true, message: 'Пользователь успешно зарегистрирован (мок)' };
  }
  
  try {
    console.log('📝 Отправка регистрации на сервер:', { login, password, role });
    const response = await authAPI.register(login, password, role);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Ошибка регистрации:', error);
    return { success: false, error: error.response?.data?.message || 'Ошибка регистрации' };
  }
};

// Недостающие функции для совместимости
export const subscribeNewsletter = async (email) => {
  return { success: true, message: 'Подписка оформлена!' };
};

export const likeArticle = async (id) => {
  return { success: true };
};

export const unlikeArticle = async (id) => {
  return { success: true };
};

export const checkLikeStatus = async (id) => {
  return { liked: false };
};

