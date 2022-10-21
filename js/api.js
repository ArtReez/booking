import { disabledForm, enabledForm } from './active.js';
import { resetForms } from './form.js';
import { showAlert } from './modal.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        enabledForm();
        // console.log('Data ready');
        response.json()
          .then((data) => onSuccess(data));
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      showAlert('Ошибка загрузки данных, обновите страницу');
      disabledForm();
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        resetForms();
      } else {
        throw new Error();
      }
    })
    .catch(() => onError());
};

export { getData, sendData };
