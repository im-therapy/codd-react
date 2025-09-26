import { USE_MOCK_DATA } from '../constants/config';
import { mockArticles } from '../data/mockArticles';
import { mockMarkers, mockAccidents } from '../data/mockMarkers';
import { articlesAPI, markersAPI, accidentsAPI, authAPI, newsletterAPI } from './api';

// Articles
export const getArticles = async () => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockArticles;
    }
    const response = await articlesAPI.getAll();
    return response.data;
};

export const getArticleById = async (id) => {
    if (USE_MOCK_DATA) {
        return mockArticles.find(a => a.id === parseInt(id));
    }
    const response = await articlesAPI.getById(id);
    return response.data;
};

// Map markers
export const getMarkers = async () => {
    if (USE_MOCK_DATA) {
        return mockMarkers;
    }
    const response = await markersAPI.getAll();
    return response.data;
};

export const getAccidentById = async (id) => {
    if (USE_MOCK_DATA) {
        return mockAccidents[id] || null;
    }
    const response = await accidentsAPI.getById(id);
    return response.data;
};

// Auth
export const loginUser = async (email, password) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            success: true,
            token: 'mock-jwt-token',
            user: { id: 1, email, name: 'Test User' }
        };
    }
    const response = await authAPI.login(email, password);
    return response.data;
};

export const registerUser = async (firstName, lastName, email, password) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            success: true,
            message: 'Письмо с подтверждением отправлено на email'
        };
    }
    const response = await authAPI.register(firstName, lastName, email, password);
    return response.data;
};

// Newsletter
export const subscribeNewsletter = async (email) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true, message: 'Подписка оформлена!' };
    }
    const response = await newsletterAPI.subscribe(email);
    return response.data;
};