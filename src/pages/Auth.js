import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RightIcon } from '../assets/icons/right.svg';
import { ReactComponent as UserDataIcon } from '../assets/icons/User data.svg';
import { ReactComponent as EmailIcon } from '../assets/icons/Email.svg';
import { ReactComponent as PassKeyIcon } from '../assets/icons/Pass key.svg';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/modules/Auth.module.css';

const SuccessMessage = ({ title, text, buttonText, onButtonClick }) => {
    const handleClick = () => {
        if (onButtonClick) {
            onButtonClick();
        }
    };
    
    return (
        <div className={styles.successMessage}>
            <h1 className={styles.successTitle}>{title}</h1>
            <p className={styles.successText}>{text}</p>
            <button className={styles.successButton} onClick={handleClick}>
                {buttonText}
            </button>
        </div>
    );
};

export default function Auth() {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [isErrorFading, setIsErrorFading] = useState(false);
    const [userName, setUserName] = useState('');
    
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const errors = [];
        if (password.length === 0) return errors;
        if (password.length < 8) errors.push('Пароль должен содержать минимум 8 символов');
        if (!/[0-9]/.test(password)) errors.push('Пароль должен содержать цифры');
        if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password)) errors.push('Пароль должен содержать только латинские символы');
        return errors;
    };

    const resetForm = () => {
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        setPasswordErrors([]);
        setFormError('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (name === 'password') {
            setPasswordErrors(validatePassword(value));
        }
        
        if (formError) {
            setIsErrorFading(true);
            setTimeout(() => {
                setFormError('');
                setIsErrorFading(false);
            }, 300);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (isLogin) {
            if (!formData.email || !formData.password) {
                setFormError('Заполните все поля');
                return;
            }
            if (!emailRegex.test(formData.email)) {
                setFormError('Некорректная почта');
                return;
            }
            
            setIsLoading(true);
            login(formData.email, formData.password)
                .then(result => {
                    if (result.success) {
                        setUserName(result.user.name);
                        setIsLoginSuccess(true);
                        resetForm();
                    } else {
                        setFormError(result.error || 'Ошибка входа');
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
            return;
        }
        
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setFormError('Заполните все поля');
            return;
        }
        
        if (!emailRegex.test(formData.email)) {
            setFormError('Некорректная почта');
            return;
        }
        
        setIsLoading(true);
        register(formData.firstName, formData.lastName, formData.email, formData.password)
            .then(result => {
                if (result.success) {
                    setIsRegistrationSuccess(true);
                    resetForm();
                } else {
                    setFormError(result.error || 'Ошибка регистрации');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className={styles.container}>

            {!isRegistrationSuccess && !isLoginSuccess && (
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
            )}

            {!isRegistrationSuccess && !isLoginSuccess ? (
                <form className={styles.authForm} onSubmit={handleSubmit}>
                <h1 className={styles.title}>
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h1>
                
                <div className={styles.inputGroup}>
                    {!isLogin && (
                        <>
                            <div className={styles.inputWithIcon}>
                                <UserDataIcon className={styles.inputIcon} />
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Имя"
                                    className={styles.input}
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.inputWithIcon}>
                                <UserDataIcon className={styles.inputIcon} />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Фамилия"
                                    className={styles.input}
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                    <div className={styles.inputWithIcon}>
                        <EmailIcon className={styles.inputIcon} />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputWithIcon}>
                        <PassKeyIcon className={styles.inputIcon} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            className={styles.input}
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    {!isLogin && passwordErrors.length > 0 && (
                        <div className={styles.passwordErrors} key={passwordErrors.join(',')}>
                            {passwordErrors.map((error, index) => (
                                <div key={index} className={styles.passwordError}>{error}</div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className={styles.submitGroup}>
                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Отправка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
                    </button>
                    
                    {!isLogin && (
                        <p className={styles.disclaimer}>
                            Создавая аккаунт вы принимаете <a href="/terms" className={styles.agreementLink}>условия пользовательского соглашения</a>
                        </p>
                    )}
                    
                    {formError && (
                        <div className={`${styles.formError} ${isErrorFading ? styles.fadeOut : ''}`}>{formError}</div>
                    )}
                </div>
            </form>
            ) : isRegistrationSuccess ? (
                <SuccessMessage 
                    title="Почти готово"
                    text="На вашу почту отправлено письмо с подтверждением. Перейдите по ссылке из письма, чтобы подтвердить адрес. После этого вы сможете войти в аккаунт."
                    buttonText="Войти в аккаунт"
                    onButtonClick={() => {
                        setIsRegistrationSuccess(false);
                        setIsLogin(true);
                        setFormData({ firstName: '', lastName: '', email: '', password: '' });
                    }}
                />
            ) : (
                <SuccessMessage 
                    title="С возвращением"
                    text={`Рады вас видеть снова, ${userName}`}
                    buttonText="Перейти на главную"
                    onButtonClick={() => navigate('/')}
                />
            )}
        </div>
    );
}