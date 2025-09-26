import '../styles/colour.css';
import styles from '../styles/modules/MarkerInfoPanel.module.css';
import { ReactComponent as TrafficIcon } from '../assets/icons/traffic.svg';
import { ReactComponent as AvariaActiveIcon } from '../assets/icons/Avaria Active.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as MapIcon } from '../assets/icons/map.svg';
import { ReactComponent as FalseIcon } from '../assets/icons/false.svg';

export default function MarkerInfoPanel({ marker, isOpen, onClose }) {
    if (!marker) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    };

    // Получение адреса по координатам (заглушка для демо)
    const getAddress = (lat, lng) => {
        // В реальном проекте здесь будет запрос к геокодингу
        // return fetch(`/api/geocode?lat=${lat}&lng=${lng}`).then(res => res.json())
        const addresses = {
            1: 'улица Городок Коминтерна, 15, Смоленск, 214004',
            2: 'проспект Гагарина, 32, Смоленск, 214000',
            3: 'улица Ленина, 8, Смоленск, 214016',
            4: 'улица Кашена, 15А, Смоленск, 214012'
        };
        return addresses[marker.id] || 'улица Неизвестная, Смоленск';
    };

    // Получение статуса с сервера (заглушка для демо)
    const getStatus = (markerId, markerType) => {
        // В реальном проекте: fetch(`/api/markers/${markerId}/status`)
        if (markerType === 'accident') {
            return markerId % 2 === 0 ? { working: false, text: 'Активна' } : { working: true, text: 'Устранена' };
        }
        return markerId % 2 === 0 ? { working: false, text: 'Не работает' } : { working: true, text: 'Работает стабильно' };
    };

    const address = getAddress();
    const status = getStatus(marker.id, marker.type);

    return (
        <div 
            onClick={handleBackdropClick} 
            style={{
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                zIndex: 9998, 
                display: isOpen ? 'block' : 'none'
            }}
        >
            <aside 
                className={styles.container} 
                style={{transform: isOpen ? "translateX(0)" : "translateX(100%)"}}
            >
                <header className={styles.header}>
                    <div className={marker.type === 'accident' ? styles.accidentIconContainer : styles.iconContainer}>
                        {marker.type === 'accident' ? (
                            <AvariaActiveIcon className={styles.icon} />
                        ) : (
                            <TrafficIcon className={styles.icon} />
                        )}
                    </div>
                    <h3 className={styles.title}>{marker.type === 'accident' ? 'Авария' : 'Светофор'}</h3>
                </header>
                
                <main className={styles.main}>
                    <section className={styles.section}>
                        <h4 className={styles.sectionTitle}>Информация</h4>
                        <div className={styles.infoBox}>
                            <div className={styles.infoRow}>
                                <MapIcon className={styles.infoIcon} />
                                <span className={styles.infoText}>{address}</span>
                            </div>
                            <div className={styles.infoRow}>
                                {status.working ? (
                                    <div className={styles.statusIcon}></div>
                                ) : (
                                    <FalseIcon className={styles.infoIcon} style={{ color: '#C21F1F' }} />
                                )}
                                <span className={styles.statusText}>{status.text}</span>
                            </div>
                        </div>
                    </section>
                    
                    <button className={styles.closeButton} onClick={onClose}>
                        <CloseIcon className={styles.closeIcon} />
                        Закрыть
                    </button>
                </main>
            </aside>
        </div>
    );
}