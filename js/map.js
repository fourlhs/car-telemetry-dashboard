// map.js: Load & show Leaflet map

let map, vehicleMarker;

export function setupMap() {
  const L = window.L;
  const mapEl = document.getElementById('map');

  const initialLatLng = [38.0, 23.8];

  map = L.map('map', {
    center: initialLatLng,
    zoom: 13
  });

  // Tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Vehicle Marker
  vehicleMarker = L.marker(initialLatLng, {
    icon: L.icon({
      iconUrl: '../assets/images/vehicle-icon.png',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    })
  }).addTo(map);

  simulateVehicleMovement();
}

function simulateVehicleMovement() {
  setInterval(() => {
    if (!map || !vehicleMarker) return;

    const current = vehicleMarker.getLatLng();

    const newLat = current.lat + (Math.random() - 0.5) * 0.005;
    const newLng = current.lng + (Math.random() - 0.5) * 0.005;

    const newPos = L.latLng(newLat, newLng);
    vehicleMarker.setLatLng(newPos);
    map.panTo(newPos, { animate: true });
  }, 2000);
}