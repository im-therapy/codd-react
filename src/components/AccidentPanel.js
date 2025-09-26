import React from 'react';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import './AccidentPanel.css';

const AccidentPanel = ({ accident, onClose }) => {
  const { photo, longitude, latitude, date, time } = accident || {};

  return (
    <div className="accident-panel">
      <div className="accident-content">
        <div className="accident-header">
          <div className="accident-icon">
            <div className="icon-bg"></div>
            <div className="icon-circle">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 8.5V14M14 19.5H14.01" stroke="white" strokeWidth="2.33" strokeLinecap="round"/>
                <circle cx="14" cy="14" r="11.67" stroke="white" strokeWidth="2.33"/>
              </svg>
            </div>
          </div>
          <h3>Авария</h3>
        </div>

        <div className="accident-details">
          <div className="photo-section">
            {photo ? (
              <img src={photo} alt="Авария" className="accident-photo" />
            ) : (
              <div className="photo-placeholder">
                <UploadIcon className="placeholder-icon" />
                <span>Not uploaded</span>
              </div>
            )}
          </div>

          <h4>Информация</h4>

          <div className="info-grid">
            <div className="info-row address-row">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 8.33C17.5 14.17 10 19.17 10 19.17S2.5 14.17 2.5 8.33C2.5 4.23 5.9 0.83 10 0.83C14.1 0.83 17.5 4.23 17.5 8.33Z" stroke="#676C75" strokeWidth="1.67"/>
                <circle cx="10" cy="8.33" r="2.5" stroke="#676C75" strokeWidth="1.67"/>
              </svg>
              <span>{longitude && latitude ? `${latitude}, ${longitude}` : 'Координаты не указаны'}</span>
            </div>

            <div className="info-row date-row">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2.5" y="3.33" width="15" height="13.33" rx="2" stroke="#676C75" strokeWidth="1.67"/>
                <path d="M13.33 1.67V5M6.67 1.67V5M2.5 8.33H17.5" stroke="#676C75" strokeWidth="1.67"/>
              </svg>
              <span>{date || '24.09.2025'}</span>
            </div>

            <div className="info-row time-row">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8.33" stroke="#676C75" strokeWidth="1.67"/>
                <path d="M10 5V10L13.33 11.67" stroke="#676C75" strokeWidth="1.67"/>
              </svg>
              <span>{time || '17:12'}</span>
            </div>
          </div>
        </div>
      </div>

      <button className="close-button" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="white" strokeWidth="1.67"/>
        </svg>
        Закрыть
      </button>
    </div>
  );
};

export default AccidentPanel;