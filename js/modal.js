const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const noticeModalContainer = document.querySelector('.notice__modal');

const EscKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    ModalCloseHanlder();
  }
};

function ModalCloseHanlder() {
  noticeModalContainer.innerHTML = '';
  document.removeEventListener('keydown', EscKeydownHandler);
  document.removeEventListener('click', ModalCloseHanlder);
}

const setEventsModal = () => {
  document.addEventListener('keydown', EscKeydownHandler);
  document.addEventListener('click', ModalCloseHanlder);
};

const showSuccess = () => {
  const successModalFragment = document.createDocumentFragment();
  const successModal = successModalTemplate.cloneNode(true);
  successModalFragment.appendChild(successModal);
  noticeModalContainer.appendChild(successModalFragment);
  setEventsModal();
};

const showError = () => {
  const errorModalFragment = document.createDocumentFragment();
  const errorModal = errorModalTemplate.cloneNode(true);
  errorModalFragment.appendChild(errorModal);
  noticeModalContainer.appendChild(errorModalFragment);
  setEventsModal();
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 10000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '10vh';
  alertContainer.style.right = 0;
  alertContainer.style.left = 0;
  alertContainer.style.padding = '1em';
  alertContainer.style.fontSize = '2em';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#ffffff';
  alertContainer.style.backgroundColor = '#ef1616';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

export { showSuccess, showError, showAlert};
