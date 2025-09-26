import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/dataService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        const data = await loginUser(email, password);
        const { success, token, user: userData } = data;
        
        if (success) {
            localStorage.setItem('token', token);
            setUser(userData);
        }
        return data;
    };

    const register = async (firstName, lastName, email, password) => {
        return await registerUser(firstName, lastName, email, password);
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