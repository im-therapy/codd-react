import { useState, useEffect } from 'react';
import { getNews } from '../services/dataService';

export const useArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const data = await getNews();
                setArticles(data);
            } catch (error) {
                setError('Ошибка загрузки статей');
                console.error('Ошибка загрузки статей:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadArticles();
        
        const handleArticlesUpdate = () => {
            loadArticles();
        };
        
        window.addEventListener('articlesUpdated', handleArticlesUpdate);
        
        return () => {
            window.removeEventListener('articlesUpdated', handleArticlesUpdate);
        };
    }, []);

    return { articles, loading, error };
};