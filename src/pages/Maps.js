import { useState, useEffect } from 'react';
import { Map, Marker } from 'react-map-gl/maplibre';
import { ReactComponent as TrafficActiveIcon } from '../assets/icons/Traffic Active.svg';
import { ReactComponent as AvariaActiveIcon } from '../assets/icons/Avaria Active.svg';
import { ReactComponent as FalseIcon } from '../assets/icons/false.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/setts.svg';
import styles from '../styles/modules/Maps.module.css';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Maps() {
    const [viewState, setViewState] = useState({
        longitude: 32.045,
        latitude: 54.782,
        zoom: 12
    });
    const [markers, setMarkers] = useState([]);
    const [accidentsCount] = useState(12);

    useEffect(() => {
        // Запрос к серверу за данными
        fetch('/api/markers')
            .then(res => res.json())
            .then(data => setMarkers(data))
            .catch(err => console.error('Ошибка загрузки данных:', err));
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
        <div className={styles.container}>
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

            <div className={`${styles.card} ${styles.settingsCard}`}>
                <SettingsIcon className={`${styles.icon} ${styles.iconGray}`} />
                <span className={styles.textGray}>
                    Настройки
                </span>
            </div>
        </div>
    );
}