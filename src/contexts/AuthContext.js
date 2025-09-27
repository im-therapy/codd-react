import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (login, password) => {
        try {
            const response = await authAPI.login(login, password);
            const { token, user: userData } = response.data;
            
            localStorage.setItem('token', token);
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Ошибка авторизации' };
        }
    };

    const register = async (login, password, role = 'viewer') => {
        try {
            const response = await authAPI.register(login, password, role);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Ошибка регистрации' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Декодируем JWT токен
                const payload = JSON.parse(atob(token.split('.')[1]));
                
                // Проверяем срок действия
                if (payload.exp * 1000 > Date.now()) {
                    setUser({
                        id: payload.id,
                        email: payload.email,
                        name: payload.name
                    });
                } else {
                    // Токен просрочен
                    localStorage.removeItem('token');
                }
            } catch (error) {
                // Невалидный токен
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
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