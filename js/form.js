/* eslint-disable no-console */

import { adForm, mapFiltersForm } from './active.js';
import { sendData } from './api.js';
import { avatarPreview, imagePreview } from './avatar.js';
import { closeMarkerPopup, getMainPinMarker, resetMainPinMarker, getMarkerGroup } from './map.js';
import { showError } from './modal.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const titleCard = document.querySelector('#title');
const priceCard = document.querySelector('#price');
const typeCard = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const roomCapacity = document.querySelector('#capacity');
const timeinCard = document.querySelector('#timein');
const timeoutCard = document.querySelector('#timeout');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');
let housingFeatureslist = [];

const TypeCardPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const roomNumberGuestToRange = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const setHousingType = (cb) => {
  housingType.addEventListener('change', () => {
    getMarkerGroup.clearLayers();
    cb();
  });
};

const setHousingPrice = (cb) => {
  housingPrice.addEventListener('change', () => {
    getMarkerGroup.clearLayers();
    cb();
  });
};

const setHousingRooms = (cb) => {
  housingRooms.addEventListener('change', () => {
    getMarkerGroup.clearLayers();
    cb();
  });
};

const setHousingGuests = (cb) => {
  housingGuests.addEventListener('change', () => {
    getMarkerGroup.clearLayers();
    cb();
  });
};

const setHousingFeatures = (cb) => {
  housingFeatures.addEventListener('change', () => {
    housingFeatureslist = Array.from(housingFeatures.children).filter((item) => item.checked).map((item) => item.value);
    console.log(housingFeatureslist);
    getMarkerGroup.clearLayers();
    cb();
  });
};

const typeCardSelectHandler = (typeCardValue) => {
  if (typeCardValue in TypeCardPrice) {
    priceCard.setAttribute('min', TypeCardPrice[typeCardValue]);
    priceCard.setAttribute('placeholder', TypeCardPrice[typeCardValue]);
  }
};

const roomNumberSelectHandler = (roomNumberValue) => {
  const selectRoomNumber = (arrayGuests) => {
    for (const item of roomCapacity) {
      item.selected = false;
      item.setAttribute('hidden', '');
    }
    arrayGuests.forEach((item) => {
      if (roomCapacity[item].value === item.toString()) {
        roomCapacity[item].removeAttribute('hidden');
        roomCapacity[item].selected = true;
      }
    });
  };

  selectRoomNumber(roomNumberGuestToRange[roomNumberValue]);
};

const timeCardSelectHandler = (timeCardValue) => {
  for (let i = 0; i < 3; i++) {
    timeinCard[i].selected = false;
    timeoutCard[i].selected = false;

    if (timeinCard[i].value === timeCardValue || timeoutCard[i].value === timeCardValue) {
      timeinCard[i].selected = true;
      timeoutCard[i].selected = true;
    }
  }
};

titleCard.addEventListener('input', () => {
  const valueLength = titleCard.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleCard.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleCard.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleCard.setCustomValidity('');
  }
  titleCard.reportValidity();
});

priceCard.addEventListener('input', () => {
  const valuePrice = priceCard.value;
  const attributePrice = +priceCard.getAttribute('min');
  if (valuePrice < MIN_PRICE) {
    priceCard.setCustomValidity('Минимальная цена "0"');
  } else if (valuePrice < attributePrice) {
    priceCard.setCustomValidity(`Минимальная цена "${attributePrice}"`);
  } else if (valuePrice > MAX_PRICE) {
    priceCard.setCustomValidity('Максимальная цена "1000000"');
  } else {
    priceCard.setCustomValidity('');
  }
  priceCard.reportValidity();
});

roomNumber.addEventListener('change', (evt) => {
  roomNumberSelectHandler(evt.target.value);
});

typeCard.addEventListener('change', (evt) => {
  typeCardSelectHandler(evt.target.value);
});

timeinCard.addEventListener('change', (evt) => {
  timeCardSelectHandler(evt.target.value);
});

timeoutCard.addEventListener('change', (evt) => {
  timeCardSelectHandler(evt.target.value);
});

const getHousingPrice = (price) => {
  if (price < 10000) {
    return 'low';
  } else if (price >= 10000 && price <= 50000) {
    return 'middle';
  } else if (price > 50000) {
    return 'high';
  }
  return 'any';
};

const filterCardType = (data) => {
  if (data.offer.type === housingType.value || housingType.value === 'any') {
    return data;
  }
};

const filterCardPrice = (data) => {
  if (getHousingPrice(data.offer.price) === housingPrice.value || housingPrice.value === 'any') {
    return data;
  }
};

const filterCardRooms = (data) => {
  if (data.offer.rooms === +housingRooms.value || housingRooms.value === 'any') {
    return data;
  }
};

const filterCardGuests = (data) => {
  if (data.offer.guests === +housingGuests.value || housingGuests.value === 'any') {
    return data;
  }
};

const filterCardFeatures = (data) => {
  if (!data.offer.features ) {
    data.offer.features = [];
  }

  const includesFeaturesList = housingFeatureslist.map((item) => data.offer.features.includes(item));
  const isFeaturesCheck = includesFeaturesList.every((item) => item === true);
  if (isFeaturesCheck) {
    return data;
  }

  // --- Compare exactly the same array - Compare Fetures v1.0
  //   if (data.offer.features.slice().sort().join(',') === housingFeatureslist.slice().sort().join(',')) {
  //     return data;
  //   }
};

const getCardRank = (data) => {
  let rank = 0;

  if (data.offer.type === housingType.value) {
    rank += 1;
  }

  if (getHousingPrice(data.offer.price) === housingPrice.value) {
    rank += 1;
  }

  if (data.offer.rooms === +housingRooms.value) {
    rank += 1;
  }

  if (data.offer.guests === +housingGuests.value) {
    rank += 1;
  }

  // --- Compare exactly the same array - Compare Fetures v1.0
  // if (data.offer.features.slice().sort().join(',') === housingFeatureslist.slice().sort().join(',')) {
  //   rank += 1;
  //   console.log(rank);
  // }

  return rank;
};

const compareCards = (cardA, cardB) => {
  const rankA = getCardRank(cardA);
  const rankB = getCardRank(cardB);
  return rankB - rankA;
};

const resetForms = () => {
  mapFiltersForm.reset();
  adForm.reset();
  closeMarkerPopup();
  resetMainPinMarker();
  getMarkerGroup.clearLayers();
  typeCardSelectHandler('flat');
  timeCardSelectHandler('12:00');
  roomNumberSelectHandler(1);
  avatarPreview.src = 'img/muffin-grey.svg';
  imagePreview.innerHTML = '';
};

document.addEventListener('DOMContentLoaded', () => {
  getMainPinMarker();
});

const setFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => showError(),
      new FormData(evt.target)
    );
  });
};

const setFormsReset = (onCreateCards, onResetForms) => {
  adForm.addEventListener('reset', () => {
    housingFeatureslist = [];
    onResetForms();
    onCreateCards();
  });
};

export {
  resetForms,
  setFormSubmit,
  setFormsReset,
  setHousingType,
  setHousingPrice,
  setHousingRooms,
  setHousingGuests,
  setHousingFeatures,
  filterCardType,
  filterCardPrice,
  filterCardRooms,
  filterCardGuests,
  filterCardFeatures,
  compareCards,
};
