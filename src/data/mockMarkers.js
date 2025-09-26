export const mockMarkers = [
    { id: 1, longitude: 32.045, latitude: 54.782, type: 'traffic_light', working: true },
    { id: 2, longitude: 32.055, latitude: 54.792, type: 'accident', working: false },
    { id: 3, longitude: 32.035, latitude: 54.775, type: 'traffic_light', working: false },
    { id: 4, longitude: 32.065, latitude: 54.785, type: 'accident', working: true }
];

export const mockAccidents = {
    1: { id: 1, photo: null, longitude: 32.045, latitude: 54.782, date: '24.09.2025', time: '17:12' },
    2: { id: 2, photo: null, longitude: 32.055, latitude: 54.792, date: '23.09.2025', time: '14:30' },
    4: { id: 4, photo: null, longitude: 32.065, latitude: 54.785, date: '22.09.2025', time: '09:15' }
};