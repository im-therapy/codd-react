import { useState, useEffect } from 'react';
import { Map } from 'react-map-gl/maplibre';
import { ReactComponent as FalseIcon } from '../assets/icons/false.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/setts.svg';
import 'maplibre-gl/dist/maplibre-gl.css';

// Страница с картой Смоленской области
export default function Maps() {
    // Состояние карты
    const [viewState, setViewState] = useState({
        longitude: 32.045, // Смоленск
        latitude: 54.782,
        zoom: 13
    });
    // Количество аварий (пока статичное число)
    const [accidentsCount] = useState(12);

    // При загрузке проверяем геолокацию пользователя
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Если пользователь в пределах Смоленской области - центрируем карту на нем
                    if (latitude >= 53.2 && latitude <= 55.8 && longitude >= 30.8 && longitude <= 35.5) {
                        setViewState(prev => ({
                            ...prev,
                            latitude,
                            longitude
                        }));
                    }
                },
                () => {} // Ошибка геолокации - остаемся на Смоленске
            );
        }
    }, []);

    return (
        // Контейнер на весь экран
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100%',
            zIndex: 1
        }}>
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle={{
                    version: 8,
                    sources: {
                        'osm': {
                            type: 'raster',
                            tiles: ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
                            tileSize: 256
                        }
                    },
                    layers: [
                        {
                            id: 'osm',
                            type: 'raster',
                            source: 'osm'
                        }
                    ]
                }}
                maxBounds={[30.8, 53.2, 35.5, 55.8]} // Границы Смоленской области
                attributionControl={false}
            />
            
            {/* Кнопка аварий */}
            <div style={{
                position: 'fixed',
                bottom: '16px',
                left: '16px',
                zIndex: 1000,
                backgroundColor: '#0C0C0C',
                backdropFilter: 'blur(8px)',
                border: '2px solid #1C1D1F',
                borderRadius: '16px',
                width: '138px',
                height: '54px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
            }}>
                <FalseIcon style={{ width: '20px', height: '20px', fill: 'white' }} />
                <span style={{ color: '#C21F1F', fontWeight: 'bold' }}>{accidentsCount}</span>
                <span style={{ color: 'white' }}> аварий</span>
            </div>
            
            {/* Кнопка настроек */}
            <div style={{
                position: 'fixed',
                bottom: '16px',
                left: '170px',
                zIndex: 1000,
                backgroundColor: '#0C0C0C',
                backdropFilter: 'blur(8px)',
                border: '2px solid #1C1D1F',
                borderRadius: '16px',
                width: '145px',
                height: '54px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
            }}>
                <SettingsIcon style={{ width: '20px', height: '20px', color: '#676C75' }} />
                <span style={{ color: '#676C75' }}>Настройки</span>
            </div>
        </div>
    )
}