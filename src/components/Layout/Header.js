import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as NewsIcon } from '../../assets/icons/news.svg';
import { ReactComponent as AnalIcon } from '../../assets/icons/Anal.svg';
import { ReactComponent as MapIcon } from '../../assets/icons/map.svg';
import { ReactComponent as AuthIcon } from '../../assets/icons/auth.svg';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/modules/Header.module.css';

export default function Header() {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAuthClick = () => {
        if (isAuthenticated) {
            logout();
        }
    };

    return (
        <header className={`${styles.header} ${styles.headerVisible}`}>
            <Link to="/" className={styles.logo}>
                <span className={styles.logoAccent}>ЦОДД</span> Смоленской области
            </Link>

            <nav className={styles.nav}>
                <Link
                    to="/"
                    className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : styles.navLinkInactive}`}
                >
                    <HomeIcon className={`${styles.icon} ${location.pathname === '/' ? styles.iconActive : styles.iconInactive}`} />
                    Главная
                </Link>
                <Link
                    to="/articles"
                    className={`${styles.navLink} ${location.pathname === '/articles' ? styles.navLinkActive : styles.navLinkInactive}`}
                >
                    <NewsIcon className={`${styles.icon} ${location.pathname === '/articles' ? styles.iconActive : styles.iconInactive}`} />
                    Статьи
                </Link>
                <Link
                    to="/maps"
                    className={`${styles.navLink} ${location.pathname === '/maps' ? styles.navLinkActive : styles.navLinkInactive}`}
                >
                    <MapIcon className={`${styles.icon} ${location.pathname === '/maps' ? styles.iconActive : styles.iconInactive}`} />
                    Карты
                </Link>
                <Link
                    to="/analytics"
                    className={`${styles.navLink} ${location.pathname === '/analytics' ? styles.navLinkActive : styles.navLinkInactive}`}
                >
                    <AnalIcon className={`${styles.icon} ${location.pathname === '/analytics' ? styles.iconActive : styles.iconInactive}`} />
                    Аналитика
                </Link>

            </nav>

            {isAuthenticated ? (
                <button
                    onClick={handleAuthClick}
                    className={`${styles.authLink} ${styles.navLinkInactive}`}
                >
                    <AuthIcon className={`${styles.icon} ${styles.iconInactive}`} />
                    {user?.name || 'Пользователь'}
                </button>
            ) : (
                <Link
                    to="/auth"
                    className={`${styles.authLink} ${location.pathname === '/auth' ? styles.navLinkActive : styles.navLinkInactive}`}
                >
                    <AuthIcon className={`${styles.icon} ${location.pathname === '/auth' ? styles.iconActive : styles.iconInactive}`} />
                    Авторизация
                </Link>
            )}
        </header>
    );
}