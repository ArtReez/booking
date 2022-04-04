/* eslint-disable prefer-const */
/* eslint-disable no-console */

const getRandomNumber = function(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};
console.log(getRandomNumber(15, 20));


const getRandomRange = function (min, max, range) {
  min < 0 ? min *= -1 : min;
  max < 0 ? max *= -1 : max;
  if (min > max) {
    let temp;
    temp = min;
    min = max;
    max = temp;
  }
  // console.log(min, max); // Check reversed min and max
  let randomInt = Math.random() * (max - min + 1) + min;
  randomInt > max ? randomInt = max : randomInt;
  return Math.floor(randomInt * Math.pow(10, range)) / Math.pow(10, range);
};
console.log(getRandomRange(5, 10, 3));
