import { useState } from 'react';
import { ReactComponent as EmailIcon } from '../assets/icons/Email.svg';
import { ReactComponent as RightIcon } from '../assets/icons/right.svg';
import ArticleCard from '../components/ArticleCard';
import { subscribeNewsletter } from '../services/dataService';
import { useArticles } from '../hooks/useArticles';
import { ARTICLE_TAGS } from '../constants/routes';
import '../styles/modules/Articles.css';

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

    if (loading) return <div className="articles-loading">Загрузка...</div>;
    if (error) return <div className="articles-error">{error}</div>;

    return (
        <div className="articles-container">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Дорожный блог Смоленска</h1>

                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <div className="newsletter-input">
                            <EmailIcon className="email-icon" />
                            <input
                                type="email"
                                placeholder="Введите свой email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="email-input"
                                required
                            />
                            <button type="submit" className="subscribe-btn">
                                Подписаться
                                <RightIcon className="right-icon" />
                            </button>
                        </div>
                        <p className="newsletter-disclaimer">
                            Подписываясь на рассылку вы принимаете <a href="/privacy" style={{color: '#FFFFFF', textDecoration: 'none'}}>условия обработки персональных данных</a>
                        </p>
                    </form>
                </div>
                
                <div className="hero-description">
                    <p>
                        Образовательные статьи, новые законы, новости Смоленской области в сфере ЦОДД и не только. 
                        Подпишитесь на рассылку чтобы следить за новыми статьями
                    </p>
                </div>
            </section>
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === ARTICLE_TAGS.ALL ? 'active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.ALL)}
                >
                    Все статьи
                </button>
                <button 
                    className={`tab ${activeTab === ARTICLE_TAGS.EDUCATIONAL ? 'active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.EDUCATIONAL)}
                >
                    Образовательные
                </button>
                <button 
                    className={`tab ${activeTab === ARTICLE_TAGS.NEW_LAWS ? 'active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.NEW_LAWS)}
                >
                    Новые законы
                </button>
                <button 
                    className={`tab ${activeTab === ARTICLE_TAGS.NEWS ? 'active' : ''}`}
                    onClick={() => setActiveTab(ARTICLE_TAGS.NEWS)}
                >
                    Новости
                </button>
            </div>

            <div className="articles-grid">
                {filteredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
            
            {filteredArticles.length === 0 && (
                <div className="no-articles">
                    Статьи не найдены
                </div>
            )}
            <div className="articles-spacer"></div>
        </div>
    );
}