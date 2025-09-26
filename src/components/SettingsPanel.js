import '../styles/colour.css';
import styles from '../styles/modules/SettingsPanel.module.css';
import { ReactComponent as TrafficIcon } from '../assets/icons/traffic.svg';
import { ReactComponent as ClockIcon } from '../assets/icons/clock.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';

export default function SettingsPanel({ isOpen, onClose }) {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    };

    return (
        <div onClick={handleBackdropClick} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998, display: isOpen ? 'block' : 'none'}}>
            <aside className={styles.container} style={{transform: isOpen ? "translateX(0)" : "translateX(100%)"}}>
                <header className={styles.settingsHeader}>
                    <div className={styles.trafficIconContainer}>
                        <TrafficIcon className={styles.trafficIcon} />
                    </div>
                    <h3 className={styles.titleText}>Настройки</h3>
                </header>
                    <main className={styles.settingsMain}>
                        <section className={styles.section}>
                            <h4 className={styles.sectionTitle}>Тип объектов</h4>
                            <div className={styles.durationInfoItems}>
                                <div className={styles.objectsTypeItems}>
                                    <div className={styles.objectType}>
                                        Аварии
                                        <label className={styles.switch}>
                                            <input type="checkbox" />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                    <div className={styles.objectType}>
                                        Светофоры
                                        <label className={styles.switch}>
                                            <input type="checkbox" />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                    <div className={styles.objectType}>
                                        Эвакуации
                                        <label className={styles.switch}>
                                            <input type="checkbox" />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className={styles.section}>
                            <h4 className={styles.sectionTitle}>Временной промежуток</h4>
                            <div className={styles.durationInfoItems}>
                                <div className={styles.durationInfoPeriodInputs}>
                                    <CalendarIcon className={styles.durationInfoIcon} />
                                    <input type="text" placeholder="Дата начала" className={styles.durationInfoPeriodInput} />
                                    <input type="text" placeholder="Дата окончания" className={styles.durationInfoPeriodInput} />
                                </div>
                                <div className={styles.durationInfoPeriodInputs}>
                                    <ClockIcon className={styles.durationInfoIcon} />
                                    <input type="text" placeholder="Время начала" className={styles.durationInfoPeriodInput} />
                                    <input type="text" placeholder="Время окончания" className={styles.durationInfoPeriodInput} />
                                </div>
                            </div>
                        </section>
                        <button className={styles.acceptButton}>
                            <CheckIcon />
                            Применить
                        </button>
                    </main>
                </aside>
        </div>
    );
}
