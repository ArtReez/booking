/* eslint-disable prefer-const */
/* eslint-disable no-console */

const getRandomNumber = function (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
// console.log(getRandomNumber(15, 20));


const getRandomRange = function (min, max, range) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(range);
};
// console.log(getRandomRange(5.55, 10.7, 5));


const AVATAR = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
const TITLE = ['Красиво и тихо', 'Уютно и недорого', 'Доступно и удобно'];
const TYPE = ['palace', 'flat', 'house', 'bungalo', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = ['Хороший район', 'Просторная гостинния', 'Рядом с метро'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


const SIMILAR_ITEM_COUNT = 10;
const getRandomArryaIndex = (item) => item[getRandomNumber(0, item.length - 1)];
const latitude = getRandomRange(35.65, 35.7, 5);
const longitude = getRandomRange(139.7, 139.8, 5);

const createItem = () => ({
  author: {
    avatar: `img/avatars/user${getRandomArryaIndex(AVATAR)}.png`,
  },
  offer: {
    title: getRandomArryaIndex(TITLE),
    address: `${latitude}, ${longitude}`,
    price: getRandomNumber(3000, 100000),
    type: getRandomArryaIndex(TYPE),
    rooms: getRandomNumber(1, 5),
    guest: getRandomNumber(1, 10),
    checkin: getRandomArryaIndex(CHECKIN),
    checkout: getRandomArryaIndex(CHECKOUT),
    features: getRandomArryaIndex(FEATURES),
    description: getRandomArryaIndex(DESCRIPTION),
    photos: getRandomArryaIndex(PHOTOS),
  },
  location: {
    lat: latitude,
    lng: longitude,
  },
});

const similarItems = Array.from({length: SIMILAR_ITEM_COUNT}, createItem);

console.log(similarItems);
