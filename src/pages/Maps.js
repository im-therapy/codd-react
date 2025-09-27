import { useState, useEffect } from 'react';
import { Map, Marker } from 'react-map-gl/maplibre';
import { ReactComponent as TrafficActiveIcon } from '../assets/icons/Traffic Active.svg';
import { ReactComponent as AvariaActiveIcon } from '../assets/icons/Avaria Active.svg';
import { ReactComponent as FalseIcon } from '../assets/icons/false.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/setts.svg';
import SettingsPanel from '../components/SettingsPanel';
import AccidentPanel from '../components/AccidentPanel';
import TrafficLightPanel from '../components/TrafficLightPanel';
import { getTrafficLights, getAccidents } from '../services/dataService';
import styles from '../styles/modules/Maps.module.css';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Maps() {
    const [viewState, setViewState] = useState({
        longitude: 32.045,
        latitude: 54.782,
        zoom: 12
    });
    const [markers, setMarkers] = useState([]);
    const [accidentData, setAccidentData] = useState(null);
    const [trafficLightData, setTrafficLightData] = useState(null);
    const [accidentsCount, setAccidentsCount] = useState(0);
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [markersData, accidentsData] = await Promise.all([
                    getTrafficLights(),
                    getAccidents()
                ]);
                setMarkers(markersData);
                setAccidentsCount(accidentsData.length);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };
        loadData();
    }, []);



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
                                setAccidentData(marker);
                            } else if (marker.type === 'traffic_light') {
                                setTrafficLightData(marker);
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
            <SettingsPanel isOpen={isSettingsVisible} onClose={() => setIsSettingsVisible(false)} />
            {accidentData && (
                <AccidentPanel
                    accident={accidentData}
                    onClose={() => {
                        setSelectedMarker(null);
                        setAccidentData(null);
                    }}
                />
            )}
            {trafficLightData && (
                <TrafficLightPanel
                    trafficLight={trafficLightData}
                    onClose={() => {
                        setSelectedMarker(null);
                        setTrafficLightData(null);
                    }}
                />
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