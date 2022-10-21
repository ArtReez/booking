const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const arrayForms = [adForm, mapFiltersForm];

const enabledForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.classList.remove('map__filters--disabled');
  arrayForms.forEach((item) => {
    for (let i = 0; i < item.children.length; i++) {
      item.children[i].removeAttribute('disabled', '');
    }
  });
};

const disabledForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('map__filters--disabled');
  arrayForms.forEach((item) => {
    for (let i = 0; i < item.children.length; i++) {
      item.children[i].setAttribute('disabled', '');
    }
  });
};

export { enabledForm, disabledForm, adForm, mapFiltersForm };
