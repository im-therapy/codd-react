import { useState } from 'react';
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
            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === ARTICLE_TAGS.ALL ? 'active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.ALL)}
                >
                    Все статьи
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === ARTICLE_TAGS.EDUCATIONAL ? 'active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.EDUCATIONAL)}
                >
                    Образовательные
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === ARTICLE_TAGS.NEW_LAWS ? 'active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.NEW_LAWS)}
                >
                    Новые законы
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === ARTICLE_TAGS.NEWS ? 'active' : ''}`}
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