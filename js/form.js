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

const typeCardHandler = (typeCardValue) => {
  const typeCardPrice = {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  };

  if (typeCardValue in typeCardPrice) {
    priceCard.setAttribute('min', typeCardPrice[typeCardValue]);
    priceCard.setAttribute('placeholder', typeCardPrice[typeCardValue]);
  }
};

const roomNumberHandler = (roomNumberValue) => {
  const roomNumberGuest = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  for (const item of roomCapacity) {
    item.removeAttribute('selected');
    item.setAttribute('hidden', '');
  }

  const roomNumberSelect = (arrayGuests) => {
    arrayGuests.forEach((item) => {
      if (roomCapacity[item].value === item.toString()) {
        roomCapacity[item].removeAttribute('hidden');
        roomCapacity[item].selected = true;
      }
    });
  };
  roomNumberSelect(roomNumberGuest[roomNumberValue]);
};

const timeCardHandler = (timeCardValue) => {
  for (let i = 0; i < 3; i++) {
    timeinCard[i].removeAttribute('selected');
    timeoutCard[i].removeAttribute('selected');

    if (timeinCard[i].value === timeCardValue || timeoutCard[i].value === timeCardValue) {
      timeinCard[i].setAttribute('selected', '');
      timeinCard[i].selected = true;
      timeoutCard[i].setAttribute('selected', '');
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
  roomNumberHandler(evt.target.value);
});

typeCard.addEventListener('change', (evt) => {
  typeCardHandler(evt.target.value);
});

timeinCard.addEventListener('change', (evt) => {
  timeCardHandler(evt.target.value);
});

timeoutCard.addEventListener('change', (evt) => {
  timeCardHandler(evt.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
  roomNumberHandler(1);
  typeCardHandler('flat');
  timeCardHandler('12:00');
});

export { titleCard, priceCard };
