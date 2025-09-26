import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLinkIcon } from '../assets/icons/Arrow link.svg';
import { ReactComponent as HeartIcon } from '../assets/icons/hearth.svg';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import articleImage from '../assets/icons/image 2 (1).png';
import '../styles/modules/Articles.css';

export default function ArticleCard({ article }) {
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
        <article className={`article-card ${!hasImage ? 'no-image' : ''}`}>
            {hasImage && (
                <div className="image-container">
                    <img 
                        src={article.photo_url} 
                        alt={article.title || 'Статья'}
                        className="article-image"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        style={{ display: imageLoaded ? 'block' : 'none' }}
                    />
                    {!imageLoaded && !imageError && (
                        <div className="image-placeholder">
                            <UploadIcon className="upload-icon" />
                            Загрузка...
                        </div>
                    )}
                </div>
            )}
            
            <div className="article-content">
                <h2 className="article-title">{article.title || 'Без названия'}</h2>
                <p className="article-description">
                    {truncateText(article.description)}
                </p>
                
                <div className="article-footer">
                    <div className="article-tags">
                        {article.tags?.map((tag, index) => (
                            <span key={index} className="article-tag">
                                {tag}
                            </span>
                        )) || []}
                    </div>
                    
                    <button className="read-more-btn" onClick={handleReadMore}>
                        <ArrowLinkIcon className="arrow-icon" />
                        Перейти к статье
                    </button>
                </div>
            </div>
        </article>
    );
}