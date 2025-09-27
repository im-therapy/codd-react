# JWT и API - Информация для разработки

## JWT (JSON Web Token)

### Текущая реализация JWT

В проекте JWT обрабатывается в `src/contexts/AuthContext.js`:

```javascript
// Декодирование JWT токена
const payload = JSON.parse(atob(token.split('.')[1]));

// Проверка срока действия
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
```

### Ожидаемая структура JWT payload:
```json
{
  "id": "number - ID пользователя",
  "email": "string - email пользователя", 
  "name": "string - имя пользователя",
  "role": "string - роль (admin/viewer)",
  "exp": "number - timestamp истечения токена"
}
```

### Автоматическая обработка JWT:
- Токен автоматически добавляется в заголовки всех API запросов
- При получении 401 ошибки токен удаляется и пользователь перенаправляется на /auth
- Токен проверяется на валидность при загрузке приложения

## API Конфигурация

### Переключение между моками и реальным API

В `src/constants/config.js`:
```javascript
export const USE_MOCK_DATA = true; // false для реального API
export const API_BASE_URL = 'https://b95e7b830d67d9.lhr.life/api/v1';
```

### Структура API endpoints

Все endpoints настраиваются в `src/constants/apiEndpoints.js`:

```javascript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/create',
  },
  NEWS: {
    GET_ALL: '/news/all',
    GET_BY_ID: (id) => `/news/${id}`,
  },
  // ... остальные endpoints
}
```

### Изменение API endpoints

Для изменения путей API нужно только отредактировать файл `apiEndpoints.js`. 
Например, если бэкенд изменит `/users/login` на `/auth/login`:

```javascript
AUTH: {
  LOGIN: '/auth/login', // было '/users/login'
  REGISTER: '/auth/register', // было '/users/create'
}
```

### Типы данных API

В `apiEndpoints.js` также описаны ожидаемые типы данных для документации:

```javascript
export const API_DATA_TYPES = {
  USER: {
    login: 'string',
    password: 'string', 
    role: 'string', // 'admin' | 'viewer'
  },
  // ... остальные типы
}
```

## Готовность к изменениям API

### Что уже готово:
1. ✅ Централизованная конфигурация endpoints
2. ✅ Автоматическая обработка JWT токенов
3. ✅ Переключение мок/реальные данные через конфиг
4. ✅ Обработка ошибок авторизации
5. ✅ Типизация данных для документации

### Что нужно будет сделать при изменении API:
1. Обновить `API_BASE_URL` в config.js
2. Обновить пути в `apiEndpoints.js` если изменились
3. Обновить типы данных в `API_DATA_TYPES` если изменились
4. Переключить `USE_MOCK_DATA = false`

### Пример быстрого изменения API:

```javascript
// config.js
export const USE_MOCK_DATA = false;
export const API_BASE_URL = 'https://new-api-url.com/api/v2';

// apiEndpoints.js  
AUTH: {
  LOGIN: '/auth/signin',     // было '/users/login'
  REGISTER: '/auth/signup',  // было '/users/create'
}
```

## Отладка API

Все API вызовы логируются в консоль браузера. При ошибках выводится подробная информация.

Для тестирования API можно временно включить дополнительное логирование в `api.js`:

```javascript
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method.toUpperCase(), config.url, config.data);
  return config;
});
```