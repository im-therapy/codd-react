import { useState } from 'react';
import { ReactComponent as RightIcon } from '../assets/icons/right.svg';
import styles from '../styles/modules/Auth.module.css';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [passwordErrors, setPasswordErrors] = useState([]);

    const validatePassword = (password, confirmPassword = '') => {
        const errors = [];
        if (password.length < 8) errors.push('Пароль должен содержать минимум 8 символов');
        if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password)) errors.push('Пароль должен содержать только латинские буквы и символы');
        if (!isLogin && confirmPassword && password !== confirmPassword) errors.push('Пароли не совпадают');
        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (name === 'password' || name === 'confirmPassword') {
            const password = name === 'password' ? value : formData.password;
            const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
            setPasswordErrors(validatePassword(password, confirmPassword));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className={styles.container}>

            <div className={styles.toggleButtons}>
                <button 
                    className={`${styles.toggleButton} ${!isLogin ? styles.toggleButtonActive : styles.toggleButtonInactive}`}
                    onClick={() => setIsLogin(false)}
                >
                    Регистрация
                </button>
                <button 
                    className={`${styles.toggleButton} ${isLogin ? styles.toggleButtonActive : styles.toggleButtonInactive}`}
                    onClick={() => setIsLogin(true)}
                >
                    Вход
                </button>
            </div>

            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h1 className={styles.title}>
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h1>
                
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={styles.input}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    
                    {!isLogin && (
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Телефон"
                            className={styles.input}
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    )}
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        className={styles.input}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    
                    {!isLogin && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Подтвердите пароль"
                            className={styles.input}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    )}
                    
                    {!isLogin && passwordErrors.length > 0 && (
                        <div className={styles.passwordErrors}>
                            {passwordErrors.map((error, index) => (
                                <div key={index} className={styles.passwordError}>{error}</div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className={styles.submitGroup}>
                    <button type="submit" className={styles.submitButton}>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                    
                    {!isLogin && (
                        <p className={styles.disclaimer}>
                            Создавая аккаунт вы принимаете <a href="#" className={styles.agreementLink}>условия пользовательского соглашения</a>
                        </p>
                    )}
                </div>
            </form>

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
                        <div className={styles.footerText}>Адресс</div>
                        <div className={styles.footerLink}>
                            214015, Смоленская область, г. Смоленск, ул. Большая Краснофлотская, д. 70
                        </div>
                    </div>
                    
                    <div className={`${styles.footerSection} ${styles.newsletter}`}>
                        <h3 className={styles.footerTitle}>Новостная рассылка</h3>
                        <div className={styles.newsletterInput}>
                            <span className={styles.emailPrefix}>@</span>
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
                        <p className={styles.disclaimer}>
                            Подписываясь на рассылку при принимаете условия обработки персональных данных
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