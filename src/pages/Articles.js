import { useState, useEffect, useRef } from 'react';
import { ReactComponent as EmailIcon } from '../assets/icons/Email.svg';
import { ReactComponent as RightIcon } from '../assets/icons/right.svg';
import ArticleCard from '../components/ArticleCard';
import { subscribeNewsletter } from '../services/dataService';
import { useArticles } from '../hooks/useArticles';
import { ARTICLE_TAGS } from '../constants/routes';
import styles from '../styles/modules/Articles.module.css';

export default function Articles() {
    const { articles, loading, error } = useArticles();
    const [activeTab, setActiveTab] = useState(ARTICLE_TAGS.ALL);
    const [email, setEmail] = useState('');
    const tabsRef = useRef(null);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const result = await subscribeNewsletter(email);
            if (result.success) {
                setEmail('');
                alert(result.message);
            }
        } catch (error) {
            console.error('Ошибка подписки:', error);
        }
    };

    const updateUnderline = () => {
        if (!tabsRef.current) return;
        
        const activeButton = tabsRef.current.querySelector('.active');
        const underline = tabsRef.current.querySelector('::after');
        
        if (activeButton && tabsRef.current) {
            const tabsRect = tabsRef.current.getBoundingClientRect();
            const activeRect = activeButton.getBoundingClientRect();
            const left = activeRect.left - tabsRect.left;
            const width = activeRect.width;
            
            tabsRef.current.style.setProperty('--underline-left', `${left}px`);
            tabsRef.current.style.setProperty('--underline-width', `${width}px`);
        }
    };

    useEffect(() => {
        setTimeout(() => updateUnderline(), 0);
    }, [activeTab]);

    useEffect(() => {
        const handleLoad = () => setTimeout(() => updateUnderline(), 100);
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    const filteredArticles = articles.filter(article => {
        if (activeTab === ARTICLE_TAGS.ALL) return true;
        return article.tags.includes(activeTab);
    });

    if (loading) return <div className={styles.articlesLoading}>Загрузка...</div>;
    if (error) return <div className={styles.articlesError}>{error}</div>;

    return (
        <div className={styles.articlesContainer}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Дорожный блог Смоленска</h1>

                    <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                        <div className={styles.newsletterInput}>
                            <EmailIcon className={styles.emailIcon} />
                            <input
                                type="email"
                                placeholder="Введите свой email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.emailInput}
                                required
                            />
                            <button type="submit" className={styles.subscribeBtn}>
                                Подписаться
                                <RightIcon className={styles.rightIcon} />
                            </button>
                        </div>
                        <p className={styles.newsletterDisclaimer}>
                            Подписываясь на рассылку вы принимаете <a href="/privacy" style={{color: '#FFFFFF', textDecoration: 'none'}}>условия обработки персональных данных</a>
                        </p>
                    </form>
                </div>
                
                <div className={styles.heroDescription}>
                    <p>
                        Образовательные статьи, новые законы, новости Смоленской области в сфере ЦОДД и не только. 
                        Подпишитесь на рассылку чтобы следить за новыми статьями
                    </p>
                </div>
            </section>
            <div className={styles.tabs} ref={tabsRef} style={{
                '--underline-left': '0px',
                '--underline-width': '0px'
            }}>
                <button 
                    className={`${styles.tab} ${activeTab === ARTICLE_TAGS.ALL ? styles.active + ' active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.ALL)}
                >
                    Все статьи
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === ARTICLE_TAGS.EDUCATIONAL ? styles.active + ' active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.EDUCATIONAL)}
                >
                    Образовательные
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === ARTICLE_TAGS.NEW_LAWS ? styles.active + ' active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.NEW_LAWS)}
                >
                    Новые законы
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === ARTICLE_TAGS.NEWS ? styles.active + ' active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.NEWS)}
                >
                    Новости
                </button>
            </div>

            <div className={styles.articlesGrid}>
                {filteredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
            
            {filteredArticles.length === 0 && (
                <div className={styles.noArticles}>
                    Статьи не найдены
                </div>
            )}
            <div className={styles.articlesSpacer}></div>
        </div>
    );
}