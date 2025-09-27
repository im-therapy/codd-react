import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLinkIcon } from '../assets/icons/Arrow link.svg';
import { ReactComponent as HeartIcon } from '../assets/icons/hearth.svg';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import articleImage from '../assets/icons/image 2 (1).png';
import styles from '../styles/modules/Articles.module.css';

function ArticleCard({ article }) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (article.photo_url && !imageError) {
            const timer = setTimeout(() => {
                if (!imageLoaded) {
                    setImageError(true);
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [article.photo_url, imageLoaded, imageError]);

    const truncateText = (text, maxLength = 400) => {
        if (!text) return '';
        const words = text.split(' ');
        let result = '';
        let lines = 0;
        
        for (let word of words) {
            const testLine = result + (result ? ' ' : '') + word;
            if (testLine.length > 60 && lines < 2) {
                result += '\n';
                lines++;
            }
            if (lines >= 3) break;
            result += (result && !result.endsWith('\n') ? ' ' : '') + word;
        }
        
        if (text.length > result.length) {
            result += '...';
        }
        
        return result;
    };

    const handleReadMore = () => {
        navigate(`/articles/${article.id}`);
    };

    const hasImage = article.photo_url && !imageError;

    return (
        <article className={`${styles.articleCard} ${!hasImage ? styles.noImage : ''}`}>
            {hasImage && (
                <div className={styles.imageContainer}>
                    <img 
                        src={article.photo_url} 
                        alt={article.title || 'Статья'}
                        className={styles.articleImage}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        style={{ display: imageLoaded ? 'block' : 'none' }}
                    />
                    {!imageLoaded && !imageError && (
                        <div className={styles.imagePlaceholder}>
                            <UploadIcon className={styles.uploadIcon} />
                            Загрузка...
                        </div>
                    )}
                </div>
            )}
            
            <div className={styles.articleContent}>
                <h2 className={styles.articleTitle}>{article.title || 'Без названия'}</h2>
                <p className={styles.articleDescription}>
                    {truncateText(article.description)}
                </p>
                
                <div className={styles.articleFooter}>
                    <div className={styles.articleTags}>
                        {article.tags?.map((tag, index) => (
                            <span key={index} className={styles.articleTag}>
                                {tag}
                            </span>
                        )) || []}
                    </div>
                    
                    <button className={styles.readMoreBtn} onClick={handleReadMore}>
                        <ArrowLinkIcon className={styles.arrowIcon} />
                        Перейти к статье
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ArticleCard;