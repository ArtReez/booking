import { getRandomNumber, getRandomRange, getRandomArrayIndex } from './util.js';

const SIMILAR_ITEM_COUNT = 10;
const AVATAR = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
const TITLE = ['Тихое местечко', 'Красивое местечко', 'Уютная обитель', 'Недорогая обитель', 'Доступное жилье', 'Удобное жилье'];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = ['Хороший район', 'Просторная гостинния', 'Рядом с метро'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createData = () => {
  const latitude = getRandomRange(35.65, 35.7, 5);
  const longitude = getRandomRange(139.7, 139.8, 5);
  return ({
    author: {
      avatar: `img/avatars/user${getRandomArrayIndex(AVATAR)}.png`,
    },
    offer: {
      title: getRandomArrayIndex(TITLE),
      address: `${latitude}, ${longitude}`,
      price: getRandomNumber(3000, 100000),
      type: getRandomArrayIndex(TYPE),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayIndex(CHECKIN),
      checkout: getRandomArrayIndex(CHECKOUT),
      features: getRandomArrayIndex(FEATURES),
      description: getRandomArrayIndex(DESCRIPTION),
      photos: getRandomArrayIndex(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  });
};

const similarData = Array.from({ length: SIMILAR_ITEM_COUNT }, createData);
// console.log(similarData);

export { similarData };
