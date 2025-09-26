Backend Integration Guide

Как подключить бекенд к этому проекту

1. API Endpoints

У тебя уже есть:
/login - авторизация
/register - регистрация
/get_all_traffics - получение светофоров

Этого хватит для MVP! Нужно только:
- Поменять /get_all_traffics на /api/markers (или поменять в коде фронта)
- Добавить префикс /api к auth endpoints

2. Структура запросов/ответов

Login (POST /login)
Запрос:
{
  "email": "user@example.com",
  "password": "password123"
}

Ответ (успех):
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}

Register (POST /register)
Запрос:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "password": "password123"
}

Ответ (успех):
{
  "success": true,
  "message": "Регистрация успешна"
}

Traffic Lights (GET /get_all_traffics)
Ответ:
[
  {
    "id": 1,
    "longitude": 32.045,
    "latitude": 54.782,
    "type": "traffic_light"
  }
]

3. Что нужно раскомментировать

В файле src/contexts/AuthContext.js найди блоки с комментарием:
// BACKEND INTEGRATION POINT:
// Раскомментируй это для подключения к бекенду

И раскомментируй код внутри, удалив MOCK DATA блоки.

ИЛИ просто поменяй в AuthContext.js:
LOGIN: '/login'
REGISTER: '/register'

И в Maps.js поменяй:
fetch('/get_all_traffics')

4. Переменные окружения

Создай файл .env в корне проекта:
REACT_APP_API_URL=http://localhost:3001
REACT_APP_JWT_SECRET=твой_секретный_ключ

5. CORS настройки

Бекенд должен разрешить CORS для фронтенда:
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

6. JWT токены

- Используй тот же секретный ключ что и в AuthContext.js
- Токены должны содержать: id, email, name, exp
- Время жизни токена: 24 часа

7. Готовые хуки для использования

import { useAuth } from './contexts/AuthContext';
const { user, login, register, logout, isAuthenticated } = useAuth();

8. Тестирование

После подключения бекенда:
1. Проверь регистрацию нового пользователя
2. Проверь вход существующего пользователя
3. Проверь автоматический вход при перезагрузке страницы
4. Проверь выход из системы

9. Безопасность

- Используй HTTPS в продакшене
- Храни JWT в httpOnly cookies (рекомендуется)
- Валидируй все входящие данные
- Используй rate limiting для auth endpoints