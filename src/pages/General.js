import { Link } from 'react-router-dom';
import { ReactComponent as EmailIcon } from '../assets/icons/Email.svg';
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

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Контакты</h3>
                        <div className={styles.footerText}>Контактный телефон</div>
                        <a href="tel:88005553535" className={styles.footerLink}>8 800 555-35-35</a>
                        <div className={styles.footerText}>Почта поддержки ЦОДД</div>
                        <a href="mailto:hi@codd.ru" className={styles.footerLink}>hi@codd.ru</a>
                    </div>

                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Данные</h3>
                        <div className={styles.footerText}>
                            Государственное казённое учреждение Смоленской области «Центр организации дорожного движения» (ГКУ СО «ЦОДД»)
                        </div>
                        <div className={styles.footerLink}>Адрес</div>
                        <div className={styles.footerText}>
                            214015, Смоленская область, г. Смоленск, ул. Большая Краснофлотская, д. 70
                        </div>
                    </div>

                    <div className={`${styles.footerSection} ${styles.newsletter}`}>
                        <h3 className={styles.footerTitle}>Новостная рассылка</h3>
                        <div className={styles.newsletterInput}>
                            <EmailIcon className={styles.newsletterEmailIcon} />
                            <input 
                                type="email" 
                                placeholder="Введите свой email"
                                className={styles.newsletterEmailInput}
                            />
                            <button className={styles.newsletterButton}>
                                Подписаться
                                <RightIcon className={styles.rightIcon} />
                            </button>
                        </div>
                        <p className={styles.newsletterDisclaimer}>
                            Подписываясь на рассылку вы принимаете <a href="/privacy" className={styles.agreementLink}>условия обработки персональных данных</a>
                        </p>
                    </div>
                </div>
                
                <div className={styles.copyright}>
                    © 2025 ГКУ СО «ЦОДД». Все права защищены.
                </div>
            </footer>
        </div>
    );
}