import { useState, useEffect } from 'react';
import { Map, Marker } from 'react-map-gl/maplibre';
import { ReactComponent as TrafficActiveIcon } from '../assets/icons/Traffic Active.svg';
import { ReactComponent as AvariaActiveIcon } from '../assets/icons/Avaria Active.svg';
import { ReactComponent as FalseIcon } from '../assets/icons/false.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/setts.svg';
import SettingsPanel from '../components/SettingsPanel';
import AccidentPanel from '../components/AccidentPanel';
import { markersAPI, accidentsAPI } from '../services/api';
import styles from '../styles/modules/Maps.module.css';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Maps() {
    const [viewState, setViewState] = useState({
        longitude: 32.045,
        latitude: 54.782,
        zoom: 12
    });
    const [markers, setMarkers] = useState([
        { id: 1, longitude: 32.045, latitude: 54.782, type: 'traffic_light', working: true },
        { id: 2, longitude: 32.055, latitude: 54.792, type: 'accident', working: false },
        { id: 3, longitude: 32.035, latitude: 54.775, type: 'traffic_light', working: false },
        { id: 4, longitude: 32.065, latitude: 54.785, type: 'accident', working: true }
    ]);
    const [accidentData, setAccidentData] = useState(null);
    const [accidentsCount] = useState(12);
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        const loadMarkers = async () => {
            try {
                const response = await markersAPI.getAll();
                setMarkers(response.data);
            } catch (error) {
                console.error('Ошибка загрузки маркеров:', error);
            }
        };
        
        loadMarkers();
    }, []);

    const fetchAccidentData = async (markerId) => {
        try {
            const response = await accidentsAPI.getById(markerId);
            return response.data;
        } catch (error) {
            console.error('Ошибка загрузки данных аварии:', error);
            return null;
        }
    };

    const mapStyle = {
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

    return (
        <section className={styles.container}>
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                className={styles.map}
                mapStyle={mapStyle}
                maxBounds={[30.8, 53.2, 35.5, 55.8]}
                attributionControl={false}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        longitude={marker.longitude}
                        latitude={marker.latitude}
                        anchor="bottom"
                        onClick={async () => {
                            setSelectedMarker(marker);
                            if (marker.type === 'accident') {
                                const data = await fetchAccidentData(marker.id);
                                setAccidentData(data);
                            }
                        }}
                    >
                        {marker.type === 'traffic_light' ? (
                            <TrafficActiveIcon className={styles.marker} />
                        ) : (
                            <AvariaActiveIcon className={styles.marker} />
                        )}
                    </Marker>
                ))}
            </Map>

            <div className={`${styles.card} ${styles.accidentsCard}`}>
                <FalseIcon className={`${styles.icon} ${styles.iconWhite}`} />
                <span className={styles.accidentCount}>
                    {accidentsCount}
                </span>
                <span className={styles.textWhite}>
                    аварий
                </span>
            </div>
            <SettingsPanel isOpen={isSettingsVisible} onClose={() => setIsSettingsVisible(false)}/>
            {selectedMarker && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 9999
                }}>
                    <AccidentPanel 
                        accident={accidentData}
                        onClose={() => {
                            setSelectedMarker(null);
                            setAccidentData(null);
                        }}
                    />
                </div>
            )}
            <button onClick={() => setIsSettingsVisible(true)} className={`${styles.card} ${styles.settingsCard}`}>
                <SettingsIcon className={`${styles.icon} ${isSettingsVisible ? styles.iconActive : styles.iconGray}`} />
                <span className={isSettingsVisible ? styles.textActive : styles.textGray}>
                    Настройки
                </span>
            </button>
        </section>
    );
}