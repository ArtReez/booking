/* eslint-disable prefer-const */
import { compareCards, filterCardFeatures, filterCardGuests, filterCardPrice, filterCardRooms, filterCardType } from './form.js';
import { createMarker } from './map.js';

const cardTemplatePopup = document.querySelector('#card').content.querySelector('.popup');

const OfferType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderSimilarPopup = (point) => {
  const cardItemPopup = cardTemplatePopup.cloneNode(true);
  let { offer: { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos }, author: { avatar } } = point;

  cardItemPopup.querySelector('.popup__title').textContent = title;
  cardItemPopup.querySelector('.popup__text--address').textContent = address;
  cardItemPopup.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardItemPopup.querySelector('.popup__type').textContent = OfferType[type];
  cardItemPopup.querySelector('.popup__text--capacity').textContent = `${rooms} комнат для ${guests} гостей.`;
  cardItemPopup.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardItemPopup.querySelector('.popup__description').textContent = description;
  cardItemPopup.querySelector('.popup__avatar').src = avatar;

  const featuresList = cardItemPopup.querySelectorAll('.popup__feature');
  featuresList.forEach((featureItem) => {
    if (!features) {
      features = [];
    }
    const isNecessary = features.some((item) => featureItem.classList.contains(`popup__feature--${item}`));
    if (!isNecessary) {
      featureItem.remove();
    }
  });

  const photosList = cardItemPopup.querySelector('.popup__photos');
  photosList.innerHTML = '';
  if (!photos) {
    photos = [];
  }

  photos.forEach((itemPhoto) => {
    const photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = itemPhoto;
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt = 'Фотография жилья';
    photosList.append(photoItem);
  });

  return cardItemPopup;
};

const createCards = (data) => {
  data
    .slice()
    .filter(filterCardType)
    .filter(filterCardPrice)
    .filter(filterCardRooms)
    .filter(filterCardGuests)
    .filter(filterCardFeatures)
    .sort(compareCards)
    .slice(0, 10)
    .forEach((point) => createMarker(point));
};

export { renderSimilarPopup, createCards };
