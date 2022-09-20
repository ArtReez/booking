/* eslint-disable no-console */

const offerType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const mapList = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createCustomPopup = (point) => {
  const cardPopupItem = cardTemplate.cloneNode(true);
  const { offer: { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos }, author: { avatar } } = point;

  cardPopupItem.querySelector('.popup__title').textContent = title ? title : cardPopupItem.querySelector('.popup__title').setAttribute('hidden', '');
  cardPopupItem.querySelector('.popup__text--address').textContent = address;
  cardPopupItem.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardPopupItem.querySelector('.popup__type').textContent = offerType[type];
  cardPopupItem.querySelector('.popup__text--capacity').textContent = `${rooms} комнат для ${guests} гостей.`;
  cardPopupItem.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardPopupItem.querySelectorAll('.popup__feature').forEach((featureItem) => {
    if (!featureItem.classList.contains(`popup__feature--${features}`)) { featureItem.remove(); }});
  cardPopupItem.querySelector('.popup__description').textContent = description;
  cardPopupItem.querySelector('.popup__photo').src = photos;
  cardPopupItem.querySelector('.popup__avatar').src = avatar;
  return cardPopupItem;
};

export { mapList, createCustomPopup };
