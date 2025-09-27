import { API_BASE_URL } from '../constants/config';

let serverAvailable = null;
let lastCheck = 0;
const CHECK_INTERVAL = 30000; // 30 секунд

export const checkServerHealth = async () => {
    const now = Date.now();
    
    // Проверяем не чаще чем раз в 30 секунд
    if (serverAvailable !== null && (now - lastCheck) < CHECK_INTERVAL) {
        return serverAvailable;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/news/all`, {
            method: 'HEAD',
            timeout: 5000
        });
        
        serverAvailable = response.ok;
        lastCheck = now;
        
        if (!serverAvailable) {
            console.warn('🔴 Сервер недоступен, используем моковые данные');
        } else {
            console.log('🟢 Сервер доступен');
        }
        
        return serverAvailable;
    } catch (error) {
        console.warn('🔴 Сервер недоступен, используем моковые данные:', error.message);
        serverAvailable = false;
        lastCheck = now;
        return false;
    }
};

export const isServerAvailable = () => serverAvailable;