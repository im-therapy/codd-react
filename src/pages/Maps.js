import { useState, useEffect } from 'react';
import { Map } from 'react-map-gl/maplibre';
import { ReactComponent as FalseIcon } from '../assets/icons/false.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/setts.svg';
import 'maplibre-gl/dist/maplibre-gl.css';

const SMOLENSK_CENTER = { lng: 32.045, lat: 54.782 };
const REGION_BOUNDS = [30.8, 53.2, 35.5, 55.8];

const buttonStyle = {
    position: 'fixed',
    bottom: 16,
    zIndex: 1000,
    backgroundColor: 'rgba(12, 12, 12, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '2px solid #1C1D1F',
    borderRadius: 16,
    height: 54,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
};

export default function Maps() {
    const [viewState, setViewState] = useState({
        longitude: SMOLENSK_CENTER.lng,
        latitude: SMOLENSK_CENTER.lat,
        zoom: 16
    });
    const [accidentsCount] = useState(12);
    const [mapType, setMapType] = useState('dark');
    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude: lat, longitude: lng } = pos.coords;
                // проверяем что в области
                if (lat >= 53.2 && lat <= 55.8 && lng >= 30.8 && lng <= 35.5) {
                    setViewState(prev => ({ ...prev, latitude: lat, longitude: lng }));
                }
            },
            () => {}
        );
    }, []);

    const getMapStyle = () => {
        switch(mapType) {
            case 'satellite':
                return {
                    version: 8,
                    sources: {
                        satellite: {
                            type: 'raster',
                            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
                            tileSize: 256
                        }
                    },
                    layers: [{ id: 'satellite', type: 'raster', source: 'satellite' }]
                };
            default:
                return {
                    version: 8,
                    sources: {
                        osm: {
                            type: 'raster',
                            tiles: ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
                            tileSize: 256
                        }
                    },
                    layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
                };
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100%', zIndex: 1 }}>
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle={getMapStyle()}
                maxBounds={REGION_BOUNDS}
                attributionControl={false}
            />

            <div style={{ ...buttonStyle, left: 16, width: 138 }}>
                <FalseIcon style={{ width: 20, height: 20, fill: 'white' }} />
                <span style={{ color: '#C21F1F', fontWeight: 'bold' }}>{accidentsCount}</span>
                <span style={{ color: 'white' }}> аварий</span>
            </div>

            <div style={{ ...buttonStyle, left: 170, width: 145, cursor: 'pointer' }}>
                <SettingsIcon style={{ width: 20, height: 20, color: '#676C75' }} />
                <span style={{ color: '#676C75' }}>Настройки</span>
            </div>
            
            <div style={{
                position: 'fixed',
                top: 100,
                right: 16,
                zIndex: 1000,
                backgroundColor: 'rgba(12, 12, 12, 0.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '2px solid #1C1D1F',
                borderRadius: 8,
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 4
            }}>
                <button 
                    onClick={() => setMapType('dark')}
                    style={{
                        background: mapType === 'dark' ? '#62A744' : 'transparent',
                        color: mapType === 'dark' ? 'white' : '#676C75',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 12
                    }}
                >
                    Темная
                </button>
                <button 
                    onClick={() => setMapType('satellite')}
                    style={{
                        background: mapType === 'satellite' ? '#62A744' : 'transparent',
                        color: mapType === 'satellite' ? 'white' : '#676C75',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 12
                    }}
                >
                    Спутник
                </button>
            </div>

        </div>
    );
}