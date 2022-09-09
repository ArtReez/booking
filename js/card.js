/* eslint-disable no-console */
// import { similarData } from './data.js';
import { offerType } from './util.js';

const mapList = document.querySelector('.map__canvas');
// const cardFragment = document.createDocumentFragment();

const createCustomPopup = (item) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardPopupItem = cardTemplate.cloneNode(true);

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

  return cardPopupItem;
};

// console.log(createCustomPopup());
// cardFragment.appendChild(cardPopupItem);
// console.log(cardFragment);
// const listFragment = mapList.appendChild(cardFragment);

export { mapList, createCustomPopup };


// ----------------------------------------
// /* eslint-disable no-console */
// import { similarData } from './data.js';
// import { offerType } from './util.js';

// const mapList = document.querySelector('.map__canvas');
// const cardTemplate = document.querySelector('#card').content;
// const cardPopup = cardTemplate.querySelector('.popup');

// const cardFragment = document.createDocumentFragment();
// let cardPopupItem;

// similarData.forEach((item) => {
//   cardPopupItem = cardPopup.cloneNode(true);
//   cardPopupItem.querySelector('.popup__title').textContent = item.offer.title ? item.offer.title : cardPopupItem.querySelector('.popup__title').setAttribute('hidden', '');
//   cardPopupItem.querySelector('.popup__text--address').textContent = item.offer.address;
//   cardPopupItem.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
//   cardPopupItem.querySelector('.popup__type').textContent = offerType[item.offer.type];
//   cardPopupItem.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнат для ${item.offer.guests} гостей.`;
//   cardPopupItem.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
//   cardPopupItem.querySelectorAll('.popup__feature').forEach((featureItem) => {
//     if (!featureItem.classList.contains(`popup__feature--${item.offer.features}`)) { featureItem.remove(); }
//   });
//   cardPopupItem.querySelector('.popup__description').textContent = item.offer.description;
//   cardPopupItem.querySelector('.popup__photo').src = item.offer.photos;
//   cardPopupItem.querySelector('.popup__avatar').src = item.author.avatar;

// });

// // cardFragment.appendChild(cardPopupItem);
// // console.log(cardPopupItem);
// // console.log(cardFragment);
// // const listFragment = mapList.appendChild(cardFragment);

// export { mapList, cardFragment, cardPopupItem };
