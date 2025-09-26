import React, { useState } from 'react';
import AccidentPanel from './AccidentPanel';

const AccidentPanelExample = () => {
  const [showPanel, setShowPanel] = useState(true);

  // Пример данных аварии
  const accidentData = {
    // photo: null, // Если нет фото - покажется placeholder
    // photo: 'https://example.com/accident-photo.jpg', // Если есть фото
    address: 'улица Городок Коминтерна, 15, Смоленск, 214004',
    date: '24.09.2025',
    time: '17:12'
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {showPanel && (
        <AccidentPanel 
          accident={accidentData}
          onClose={() => setShowPanel(false)}
        />
      )}
    </div>
  );
};

export default AccidentPanelExample;