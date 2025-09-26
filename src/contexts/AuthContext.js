import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Создание простого токена
    const createToken = (userData) => {
        const payload = {
            id: userData.id || Date.now(),
            email: userData.email,
            name: userData.name,
            exp: Date.now() + (24 * 60 * 60 * 1000) // 24 часа
        };
        return btoa(JSON.stringify(payload));
    };

    // Проверка токена
    const verifyToken = (token) => {
        try {
            const payload = JSON.parse(atob(token));
            return payload.exp > Date.now() ? payload : null;
        } catch (error) {
            return null;
        }
    };

    // Вход пользователя
    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);
            const { success, token, user: userData, error } = response.data;
            
            if (success) {
                localStorage.setItem('authToken', token);
                setUser(userData);
                return { success: true, user: userData };
            } else {
                return { success: false, error: error || 'Ошибка входа' };
            }
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.error || 'Ошибка соединения с сервером' 
            };
        }
    };

    // Регистрация пользователя
    const register = async (firstName, lastName, email, password) => {
        try {
            const response = await authAPI.register(firstName, lastName, email, password);
            const { success, message, error } = response.data;
            
            if (success) {
                return { success: true, message };
            } else {
                return { success: false, error: error || 'Ошибка регистрации' };
            }
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.error || 'Ошибка соединения с сервером' 
            };
        }
    };

    // Выход пользователя
    const logout = async () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
    };

    // Обновление токена
    const refreshToken = async () => {
        try {
            // BACKEND INTEGRATION POINT:
            // Раскомментируй это для подключения к бекенду
            /*
            const response = await fetch(API_ENDPOINTS.REFRESH, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Не удалось обновить токен');
            }

            const data = await response.json();
            const { token, user: userData } = data;
            
            localStorage.setItem('authToken', token);
            setUser(userData);
            */
        } catch (error) {
            logout();
        }
    };

    // Проверка авторизации при загрузке
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            
            if (token) {
                const decoded = verifyToken(token);
                
                if (decoded) {
                    setUser({
                        id: decoded.id,
                        email: decoded.email,
                        name: decoded.name
                    });
                } else {
                    localStorage.removeItem('authToken');
                }
            }
            
            setLoading(false);
        };

        checkAuth();
    }, []);

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        refreshToken,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
};