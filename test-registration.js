const axios = require('axios');

const API_BASE_URL = 'https://c859bab6858d8b.lhr.life/api/v1';

async function testRegistration() {
    console.log('🔍 Тестирование регистрации...\n');

    const testUser = {
        login: 'testuser' + Date.now(),
        password: 'testpass123',
        role: 'viewer'
    };

    console.log('📤 Отправляем данные:', testUser);

    try {
        const response = await axios.post(`${API_BASE_URL}/users/create`, testUser, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Регистрация успешна!');
        console.log('📊 Статус:', response.status);
        console.log('📋 Ответ:', response.data);
        
    } catch (error) {
        console.log('❌ Ошибка регистрации:');
        console.log('📊 Статус:', error.response?.status);
        console.log('📋 Ошибка:', error.response?.data);
        console.log('🔍 Полная ошибка:', error.message);
        
        if (error.code === 'ENOTFOUND') {
            console.log('🌐 Проблема с сетью - сервер недоступен');
        }
    }
}

testRegistration();