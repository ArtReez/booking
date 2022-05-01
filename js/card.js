/* eslint-disable no-console */
import { similarData } from './data.js';
import { offerType } from './util.js';

const mapList = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content;
const cardPopup = cardTemplate.querySelector('.popup');

const cardFragment = document.createDocumentFragment();

similarData.forEach((item) => {
  const cardPopupItem = cardPopup.cloneNode(true);
  cardPopupItem.querySelector('.popup__title').textContent = item.offer.title ? item.offer.title : cardPopupItem.querySelector('.popup__title').setAttribute('hidden', '');
  cardPopupItem.querySelector('.popup__text--address').textContent = item.offer.address;
  cardPopupItem.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  cardPopupItem.querySelector('.popup__type').textContent = offerType[item.offer.type];
  cardPopupItem.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнат для ${item.offer.guests} гостей.`;
  cardPopupItem.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  cardPopupItem.querySelectorAll('.popup__feature').forEach((featureItem) => {
    if (!featureItem.classList.contains(`popup__feature--${item.offer.features}`)) {featureItem.remove();}
  });
  cardPopupItem.querySelector('.popup__description').textContent = item.offer.description;
  cardPopupItem.querySelector('.popup__photo').src = item.offer.photos;
  cardPopupItem.querySelector('.popup__avatar').src = item.author.avatar;

  cardFragment.appendChild(cardPopupItem);
});

const listFragment = mapList.appendChild(cardFragment);

export { mapList, listFragment };
