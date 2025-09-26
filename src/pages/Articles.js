import { useState, useEffect } from 'react';
import { articlesAPI } from '../services/api';
import styles from '../styles/modules/PageStub.module.css';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await articlesAPI.getAll();
                setArticles(response.data);
            } catch (error) {
                setError('Ошибка загрузки статей');
                console.error('Ошибка загрузки статей:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadArticles();
    }, []);

    if (loading) return <div className={styles.container}><h1 className={styles.title}>Загрузка...</h1></div>;
    if (error) return <div className={styles.container}><h1 className={styles.title}>{error}</h1></div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>СТАТЬИ</h1>
            
            <div style={{ display: 'grid', gap: '20px', marginTop: '40px' }}>
                {articles.map(article => (
                    <div key={article.id} style={{ 
                        background: 'var(--color-black-plus)', 
                        border: '2px solid #1C1D1F',
                        borderRadius: '16px',
                        padding: '20px'
                    }}>
                        {article.photo_url && (
                            <img 
                                src={article.photo_url} 
                                alt={article.title}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }}
                            />
                        )}
                        
                        <h2 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>{article.title}</h2>
                        <p style={{ color: 'var(--color-gray)', marginBottom: '16px' }}>{article.description}</p>
                        
                        {article.tags && article.tags.length > 0 && (
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                {article.tags.map((tag, index) => (
                                    <span key={index} style={{
                                        background: 'var(--color-black)',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px'
                                    }}>{tag}</span>
                                ))}
                            </div>
                        )}
                        
                        <a 
                            href={article.full_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                                color: 'white',
                                textDecoration: 'underline',
                                fontWeight: '600'
                            }}
                        >
                            Читать полностью
                        </a>
                    </div>
                ))}
            </div>
            
            {articles.length === 0 && !loading && (
                <p style={{ color: 'var(--color-gray)', textAlign: 'center', marginTop: '40px' }}>
                    Статьи не найдены
                </p>
            )}
        </div>
    );
}