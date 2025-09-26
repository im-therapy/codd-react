import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as HeartIcon } from '../assets/icons/hearth.svg';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import { getArticleById, likeArticle, unlikeArticle, checkLikeStatus } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/modules/ArticleDetail.module.css';

export default function ArticleDetail() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const [articleData, likeStatus] = await Promise.all([
                    getArticleById(id),
                    isAuthenticated ? checkLikeStatus(parseInt(id)) : Promise.resolve({ liked: false })
                ]);
                setArticle(articleData);
                setLikesCount(articleData?.likes || 0);
                setIsLiked(likeStatus.liked);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка загрузки статьи:', error);
                setLoading(false);
            }
        };

        loadArticle();
    }, [id]);

    useEffect(() => {
        if (article?.photo_url && !imageError) {
            const timer = setTimeout(() => {
                if (!imageLoaded) {
                    setImageError(true);
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [article?.photo_url, imageLoaded, imageError]);

    const handleLike = async () => {
        if (!isAuthenticated) {
            navigate('/auth');
            return;
        }
        
        try {
            if (isLiked) {
                const result = await unlikeArticle(parseInt(id));
                if (result.success) {
                    setIsLiked(false);
                    setLikesCount(prev => prev - 1);
                }
            } else {
                const result = await likeArticle(parseInt(id));
                if (result.success) {
                    setIsLiked(true);
                    setLikesCount(prev => prev + 1);
                }
            }
        } catch (error) {
            console.error('Ошибка лайка:', error);
        }
    };

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (!article) return <div className={styles.notFound}>Статья не найдена</div>;

    const hasImage = article.photo_url && !imageError;

    return (
        <div className={styles.container}>
            <article className={styles.article}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{article.title}</h1>
                    <button 
                        className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
                        onClick={handleLike}
                    >
                        <HeartIcon className={styles.heartIcon} />
                        {likesCount} лайков
                    </button>
                </header>

                {hasImage && (
                    <div className={styles.imageContainer}>
                        <img
                            src={article.photo_url} 
                            alt={article.title}
                            className={styles.image}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    </div>
                )}
                
                {imageError && (
                    <div className={styles.imageContainer}>
                        <div className={styles.imagePlaceholder}>
                            <p>Изображение недоступно</p>
                        </div>
                    </div>
                )}

                <div className={styles.content}>
                    <p className={styles.intro}>
                        Безопасность на дороге — это общая ответственность. Пешеходы, как и водители, должны соблюдать правила дорожного движения. В этой статье мы собрали основные правила и советы, которые помогут пешеходам избежать опасных ситуаций.
                    </p>
                    
                    <h2>Основные правила</h2>
                    <p>
                        Пешеходы обязаны двигаться по тротуарам или пешеходным дорожкам, а при их отсутствии — по обочинам. Переходить дорогу можно только по пешеходным переходам, убедившись в отсутствии приближающегося транспорта.
                    </p>
                    <p>
                        В темное время суток или в условиях недостаточной видимости пешеходам рекомендуется носить светоотражающие элементы на одежде. Это сделает их более заметными для водителей и снизит риск ДТП.
                    </p>
                    
                    <h2>Советы пешеходам</h2>
                    <p>
                        Будьте внимательны и осторожны при переходе дороги. Не отвлекайтесь на мобильные устройства и другие гаджеты. Смотрите по сторонам и убедитесь, что все автомобили остановились, прежде чем начать движение.
                    </p>
                </div>
            </article>
        </div>
    );
}