/* eslint-disable no-console */
import { disabledForm, enabledForm } from './active.js';
import { createCustomPopup } from './card.js';
import { similarData } from './data.js';

const addressForm = document.querySelector('#address');
addressForm.value = `${35.6895}, ${139.692}`;
disabledForm();

const map = L.map('map-canvas')
  .on('load', () => {
    enabledForm();
    console.log('Map ready');
  })
  .setView(
    {
      lat: 35.6895,
      lng: 139.692,
    }, 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const addressLocation = Object.values(evt.target.getLatLng()).map((item) => item.toFixed(5));
  addressForm.value = `${addressLocation[0]}, ${addressLocation[1]}`;
});

const createMarker = (point) => {
  const {location: { lat, lng }} = point;

  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createCustomPopup(point));
  // return marker;
};

similarData.forEach((point) => createMarker(point));

// const markers = similarData.map((point) => createMarker(point));
// markers.forEach((marker) => {
//   console.log(marker);
//   marker.remove();
// });

export { map, mainPinMarker, mainPinIcon, addressForm };
