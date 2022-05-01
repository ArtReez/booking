const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const array = [adForm, mapFilters];

const enabledForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  array.forEach((item) => {
    for (let i = 0; i < item.children.length; i++) {
      item.children[i].removeAttribute('disabled', '');
    }
  });
};

const disabledForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  array.forEach((item) => {
    for (let i = 0; i < item.children.length; i++) {
      item.children[i].setAttribute('disabled', '');
    }
  });
};

export { enabledForm, disabledForm };
