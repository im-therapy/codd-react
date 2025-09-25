import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as NewsIcon } from '../../assets/icons/news.svg';
import { ReactComponent as AnalIcon } from '../../assets/icons/Anal.svg';
import { ReactComponent as MapIcon } from '../../assets/icons/map.svg';
import { ReactComponent as AuthIcon } from '../../assets/icons/auth.svg';
import styles from '../../styles/modules/Header.module.css';

// Компонент шапки сайта с навигацией
export default function Header() {
    // Получаем текущий маршрут для подсветки активной страницы
    const location = useLocation();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <span className={styles.logoAccent}>ЦОДД</span> Смоленской области
            </div>

            <div className={styles.nav}>
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
            </div>

            <Link
                to="/auth"
                className={`${styles.authLink} ${location.pathname === '/auth' ? styles.navLinkActive : styles.navLinkInactive}`}
            >
                <AuthIcon className={`${styles.icon} ${location.pathname === '/auth' ? styles.iconActive : styles.iconInactive}`} />
                Авторизация
            </Link>
        </header>
    )
}