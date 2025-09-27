import React from 'react';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as TrafficIcon } from '../assets/icons/traffic.svg';
import { ReactComponent as FalseIcon } from '../assets/icons/false.svg';
import styles from '../styles/modules/TrafficLightPanel.module.css';

const TrafficLightPanel = ({ trafficLight, onClose }) => {
  if (!trafficLight) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.panel}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <div className={styles.iconBg}></div>
              <div className={styles.iconWrapper}>
                <TrafficIcon className={styles.icon} />
              </div>
            </div>
            <h3 className={styles.title}>Светофор</h3>
          </div>
          
          <div className={styles.info}>
            <h4 className={styles.infoTitle}>Информация</h4>
            <div className={styles.infoContainer}>
              <div className={styles.addressRow}>
                <span className={styles.addressText}>
                  {trafficLight.address || 'улица Городок Коминтерна, 15, Смоленск, 214004'}
                </span>
              </div>
              <div className={styles.statusRow}>
                {trafficLight.status === 'active' ? (
                  <div className={styles.statusIcon}>
                    <div className={styles.statusDot}></div>
                  </div>
                ) : (
                  <FalseIcon className={styles.falseIcon} />
                )}
                <span className={styles.statusText}>
                  {trafficLight.status === 'active' ? 'Работает стабильно' : 'Не работает'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon className={styles.closeIcon} />
          <span>Закрыть</span>
        </button>
      </div>
    </>
  );
};

export default TrafficLightPanel;