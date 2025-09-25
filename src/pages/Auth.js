// Страница регистрации/авторизации
export default function Auth() {
    return (
        // Контейнер на весь экран с темным фоном
        <div style={{
            height: '100vh',
            backgroundColor: '#0C0C0C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Заголовок страницы */}
            <h1 style={{
                color: 'white',
                fontSize: '48px',
                fontWeight: 'bold'
            }}>
                РЕГИСТРАЦИЯ
            </h1>
        </div>
    )
}