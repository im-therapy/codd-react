import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as UploadIcon } from '../assets/icons/user.svg';
import styles from '../styles/modules/CreateArticle.module.css';

export default function CreateArticle() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedTag, setSelectedTag] = useState('новые законы');
    const [contentBlocks, setContentBlocks] = useState([
        { id: 1, heading: '', text: '' }
    ]);

    const tags = ['образовательные', 'новые законы', 'новости'];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const addContentBlock = () => {
        const newId = Math.max(...contentBlocks.map(b => b.id)) + 1;
        setContentBlocks([...contentBlocks, { id: newId, heading: '', text: '' }]);
    };

    const updateContentBlock = (id, field, value) => {
        setContentBlocks(contentBlocks.map(block => 
            block.id === id ? { ...block, [field]: value } : block
        ));
    };

    const deleteContentBlock = (id) => {
        if (contentBlocks.length > 1) {
            setContentBlocks(contentBlocks.filter(block => block.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Создаем новую статью
        const content = contentBlocks.map(block => 
            `${block.heading ? `<h2>${block.heading}</h2>` : ''}${block.text ? `<p>${block.text}</p>` : ''}`
        ).join('\n');
        
        const description = contentBlocks.map(block => block.text).join(' ').substring(0, 150) + '...';
        
        const newArticle = {
            id: Date.now(),
            title,
            description,
            content,
            tags: [selectedTag],
            image: imagePreview,
            date: new Date().toLocaleDateString('ru-RU'),
            author: 'админ'
        };

        // Сохраняем в localStorage
        const existingArticles = JSON.parse(localStorage.getItem('articles') || '[]');
        const updatedArticles = [newArticle, ...existingArticles];
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
        
        // Обновляем событие для обновления списка статей
        window.dispatchEvent(new Event('articlesUpdated'));
        
        // Переходим на страницу статей
        navigate('/articles');
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.header}>
                    <input
                        type="text"
                        placeholder="Введите заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`${styles.titleInput} ${title ? styles.titleActive : ''}`}
                        required
                    />
                    
                    <div className={styles.tagButtons} style={{
                        '--slider-position': `${tags.indexOf(selectedTag) * 33.33}%`
                    }}>
                        {tags.map((tag) => (
                            <button 
                                key={tag}
                                type="button" 
                                className={`${styles.tagButton} ${selectedTag === tag ? styles.tagActive : ''}`}
                                onClick={() => setSelectedTag(tag)}
                            >
                                {tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.imageUpload}>
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                    ) : (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className={styles.fileInput}
                                id="image-upload"
                            />
                            <label htmlFor="image-upload" className={styles.uploadButton}>
                                <UploadIcon />
                                Загрузить изображение
                            </label>
                        </>
                    )}
                </div>

                <div className={styles.editorSection}>
                    {contentBlocks.map((block) => (
                        <div key={block.id} className={styles.contentBlock}>
                            <div className={styles.fieldsGroup}>
                                <textarea
                                    placeholder="Введите заголовок"
                                    value={block.heading}
                                    onChange={(e) => updateContentBlock(block.id, 'heading', e.target.value)}
                                    className={`${styles.headingInput} ${block.heading ? styles.textActive : ''}`}
                                />
                                <textarea
                                    placeholder="Введите текст"
                                    value={block.text}
                                    onChange={(e) => updateContentBlock(block.id, 'text', e.target.value)}
                                    className={`${styles.textInput} ${block.text ? styles.textActive : ''}`}
                                />
                            </div>
                            <div className={styles.blockControls}>
                                <div className={styles.headingControls}>
                                    <button type="button" className={`${styles.controlButton} ${styles.deleteButton}`} onClick={() => deleteContentBlock(block.id)}>×</button>
                                    <button type="button" className={styles.controlButton}>H1</button>
                                    <button type="button" className={styles.controlButton}>H2</button>
                                </div>
                                <div className={styles.textControls}>
                                    <button type="button" className={`${styles.controlButton} ${styles.deleteButton}`} onClick={() => deleteContentBlock(block.id)}>×</button>
                                    <button type="button" className={styles.controlButton}>H3</button>
                                    <button type="button" className={styles.controlButton}>Aa</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <div className={styles.actionButtons}>
                        <button type="button" onClick={addContentBlock} className={styles.addButton}>
                            Добавить поле
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Создать запись
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}