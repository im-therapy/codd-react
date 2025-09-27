import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (login, password) => {
        if (!login || !password) {
            return { success: false, error: 'Логин и пароль обязательны' };
        }
        
        if (login.length < 3 || password.length < 6) {
            return { success: false, error: 'Неверные данные' };
        }
        
        try {
            const response = await authAPI.login(login, password);
            const { user: userData } = response.data;
            
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Ошибка авторизации' };
        }
    };

    const register = async (login, password, role = 'viewer') => {
        if (!login || !password) {
            return { success: false, error: 'Логин и пароль обязательны' };
        }
        
        if (login.length < 3) {
            return { success: false, error: 'Логин должен быть минимум 3 символа' };
        }
        
        if (password.length < 6) {
            return { success: false, error: 'Пароль должен быть минимум 6 символов' };
        }
        
        try {
            const response = await authAPI.register(login, password, role);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Ошибка регистрации' };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        } finally {
            setUser(null);
        }
    };

    const checkAuth = async () => {
        try {
            const response = await authAPI.me();
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth нужно использовать внутри AuthProvider');
    }
    return context;
};