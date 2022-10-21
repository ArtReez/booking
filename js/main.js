import { setFormSubmit, setFormsReset, resetForms, setHousingType, setHousingPrice, setHousingRooms, setHousingGuests, setHousingFeatures } from './form.js';
import { showSuccess } from './modal.js';
import { createCards } from './card.js';
import { getData } from './api.js';
import { debounce } from './util.js';
import './avatar.js';


getData((data) => {
  createCards(data);
  setHousingType(debounce(() => createCards(data)));
  setHousingPrice(debounce(() => createCards(data)));
  setHousingRooms(debounce(() => createCards(data)));
  setHousingGuests(debounce(() => createCards(data)));
  setHousingFeatures(debounce(() => createCards(data)));
  setFormsReset(debounce(() => createCards(data)), resetForms);
});

setFormSubmit(showSuccess);
