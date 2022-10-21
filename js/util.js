const TIME_DELAY = 500;

const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomRange = (min, max, range) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(range);
};

const getRandomArrayIndex = (item) => item[getRandomNumber(0, item.length - 1)];

const debounce = (cb) => () => (setTimeout((cb), TIME_DELAY));


export { getRandomNumber, getRandomRange, getRandomArrayIndex, debounce };
