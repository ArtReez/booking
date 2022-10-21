/* eslint-disable no-console */
import { disabledForm, enabledForm } from './active.js';
import { renderSimilarPopup } from './card.js';

const DEFAULT_LAT = 35.6895;
const DEFAULT_LNG = 139.692;
const MAP_ZOOM = 12;
const addressFormValue = document.querySelector('#address');
let mainPinMarker;

disabledForm();
const map = L.map('map-canvas')
  .on('load', () => {
    enabledForm();
    // console.log('Map ready');
  })
  .setView(
    {
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    }, MAP_ZOOM
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const getMarkerGroup = L.layerGroup().addTo(map);

const closeMarkerPopup = () => map.closePopup();

const getMainPinMarker = () => {
  mainPinMarker = L.marker(
    {
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  ).addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const addressLocation = Object.values(evt.target.getLatLng()).map((item) => item.toFixed(5));
    addressFormValue.value = `${addressLocation[0]}, ${addressLocation[1]}`;
  });
};

const resetMainPinMarker = () => {
  mainPinMarker.remove();
  getMainPinMarker();
};

const createMarker = (point) => {
  const { location: { lat, lng } } = point;

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
    .addTo(getMarkerGroup)
    .bindPopup(renderSimilarPopup(point));
};

export { map, mainPinIcon, createMarker, getMainPinMarker, resetMainPinMarker, closeMarkerPopup, getMarkerGroup };
