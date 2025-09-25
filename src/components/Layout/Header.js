import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as NewsIcon } from '../../assets/icons/news.svg';
import { ReactComponent as AnalIcon } from '../../assets/icons/Anal.svg';
import { ReactComponent as MapIcon } from '../../assets/icons/map.svg';
import { ReactComponent as AuthIcon } from '../../assets/icons/auth.svg';

// Компонент шапки сайта с навигацией
export default function Header() {
    // Получаем текущий маршрут для подсветки активной страницы
    const location = useLocation();

    return (
        <header style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            right: '16px',
            height: '70px',
            zIndex: 2000,
            backgroundColor: 'rgba(12, 12, 12, 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '2px solid #1C1D1F',
            borderRadius: '12px',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                <span style={{ color: '#62A744' }}>ЦОДД</span> Смоленской области
            </div>

            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                <Link
                    to="/"
                    style={{
                        textDecoration: 'none',
                        color: location.pathname === '/' ? 'white' : '#676C75',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <HomeIcon style={{ width: '20px', height: '20px', color: location.pathname === '/' ? 'white' : '#676C75' }} />
                    Главная
                </Link>
                <Link
                    to="/articles"
                    style={{
                        textDecoration: 'none',
                        color: location.pathname === '/articles' ? 'white' : '#676C75',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <NewsIcon style={{ width: '20px', height: '20px', color: location.pathname === '/articles' ? 'white' : '#676C75' }} />
                    Статьи
                </Link>
                <Link
                    to="/maps"
                    style={{
                        textDecoration: 'none',
                        color: location.pathname === '/maps' ? 'white' : '#676C75',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <MapIcon style={{ width: '20px', height: '20px', color: location.pathname === '/maps' ? 'white' : '#676C75' }} />
                    Карты
                </Link>
                <Link
                    to="/analytics"
                    style={{
                        textDecoration: 'none',
                        color: location.pathname === '/analytics' ? 'white' : '#676C75',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <AnalIcon style={{ width: '20px', height: '20px', color: location.pathname === '/analytics' ? 'white' : '#676C75' }} />
                    Аналитика
                </Link>
            </div>

            <Link
                to="/auth"
                style={{
                    textDecoration: 'none',
                    color: location.pathname === '/auth' ? 'white' : '#676C75',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <AuthIcon style={{ width: '20px', height: '20px', color: location.pathname === '/auth' ? 'white' : '#676C75' }} />
                Авторизация
            </Link>
        </header>
    )
}