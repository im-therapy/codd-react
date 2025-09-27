const axios = require('axios');

const API_BASE_URL = 'https://c859bab6858d8b.lhr.life/api/v1';

async function testAPI() {
    console.log('🔍 Тестирование API подключения...\n');

    // Тест новостей
    try {
        console.log('📰 Тестирование /news/all...');
        const newsResponse = await axios.get(`${API_BASE_URL}/news/all`);
        console.log('✅ Новости:', newsResponse.status, `(${newsResponse.data.length || 0} записей)`);
    } catch (error) {
        console.log('❌ Новости:', error.response?.status || 'Network Error', error.message);
    }

    // Тест светофоров
    try {
        console.log('🚦 Тестирование /traffic/all...');
        const trafficResponse = await axios.get(`${API_BASE_URL}/traffic/all`);
        console.log('✅ Светофоры:', trafficResponse.status, `(${trafficResponse.data.length || 0} записей)`);
    } catch (error) {
        console.log('❌ Светофоры:', error.response?.status || 'Network Error', error.message);
    }

    // Тест авторизации
    try {
        console.log('🔐 Тестирование /users/login...');
        const loginResponse = await axios.post(`${API_BASE_URL}/users/login`, {
            login: 'test',
            password: 'test'
        });
        console.log('✅ Авторизация:', loginResponse.status);
    } catch (error) {
        console.log('❌ Авторизация:', error.response?.status || 'Network Error', error.message);
    }

    console.log('\n🏁 Тестирование завершено');
}

testAPI();