import { Link } from 'react-router-dom';
import { ReactComponent as RightIcon } from '../assets/icons/right.svg';
import styles from '../styles/modules/General.module.css';

export default function General() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    ЦОДД Смоленской области
                </h1>
                <p className={styles.subtitle}>
                    Система мониторинга и управления дорожным движением
                </p>
                <div className={styles.heroActions}>
                    <Link to="/auth" className={styles.authButton}>
                        Авторизация
                        <RightIcon className={styles.rightIcon} />
                    </Link>
                    <a href="https://codd67.ru/" className={styles.aboutLink}>
                        О проекте
                    </a>
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.feature}>
                    <h3>Мониторинг в реальном времени</h3>
                    <p>Отслеживание состояния светофоров и дорожной обстановки</p>
                </div>
                <div className={styles.feature}>
                    <h3>Аналитика и отчеты</h3>
                    <p>Подробная статистика по авариям и нарушениям</p>
                </div>
                <div className={styles.feature}>
                    <h3>Управление системой</h3>
                    <p>Централизованное управление светофорами и настройками</p>
                </div>
            </section>
        </div>
    );
}