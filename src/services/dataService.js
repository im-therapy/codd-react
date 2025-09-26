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

// Statistics
export const getAccidentsCount = async () => {
    if (USE_MOCK_DATA) {
        return 12;
    }
    // В реальном API это может быть отдельный endpoint или часть статистики
    const markers = await getMarkers();
    return markers.filter(m => m.type === 'accident').length;
};

// Likes
export const likeArticle = async (articleId) => {
    if (USE_MOCK_DATA) {
        const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
        if (!likedArticles.includes(articleId)) {
            likedArticles.push(articleId);
            localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
        }
        return { success: true, liked: true };
    }
    const response = await articlesAPI.likeArticle(articleId);
    return response.data;
};

export const unlikeArticle = async (articleId) => {
    if (USE_MOCK_DATA) {
        const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
        const index = likedArticles.indexOf(articleId);
        if (index > -1) {
            likedArticles.splice(index, 1);
            localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
        }
        return { success: true, liked: false };
    }
    const response = await articlesAPI.unlikeArticle(articleId);
    return response.data;
};

export const checkLikeStatus = async (articleId) => {
    if (USE_MOCK_DATA) {
        const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
        return { liked: likedArticles.includes(articleId) };
    }
    const response = await articlesAPI.checkLikeStatus(articleId);
    return response.data;
};