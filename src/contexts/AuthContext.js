import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const timingSafeEqual = (a, b) => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

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
            const { token, user: userData } = response.data;
            
            localStorage.setItem('token', token);
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

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                
                if (payload.exp * 1000 > Date.now()) {
                    setUser({
                        id: payload.id,
                        email: payload.email,
                        name: payload.name
                    });
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
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