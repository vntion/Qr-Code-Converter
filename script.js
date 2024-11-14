const API_URL = 'http://api.qrserver.com/v1/create-qr-code/?data';
const QR_SIZE = '&size=250x250';

const inputUrl = document.querySelector('.form__input');
const qrContainer = document.querySelector('.qr');
const btn = document.querySelector('.form__btn');

const clearQRContainer = function () {
  qrContainer.innerHTML = '';
};

const renderError = function (msg) {
  clearQRContainer();
  qrContainer.insertAdjacentText('beforeend', msg);
};

const renderSpinner = function () {
  const markup = `
    <svg class="spinner">
      <use xlink:href="symbol-defs.svg#icon-spinner"></use>
    </svg>`;
  clearQRContainer();
  qrContainer.insertAdjacentHTML('afterbegin', markup);
};

const renderQR = async function (link) {
  try {
    const img = document.createElement('img');
    img.src = `${API_URL}=${link}${QR_SIZE}`;
    img.alt = 'Qr Code';
    img.className = 'qr__img';

    await new Promise((resolve, reject) => {
      img.addEventListener('load', resolve);
      img.addEventListener('error', () => {
        reject(new Error('Somenthing went wrong'));
      });
    });

    clearQRContainer();
    qrContainer.append(img);
  } catch (err) {
    renderError(err.message);
  }
};

btn.addEventListener('click', e => {
  e.preventDefault();
  const link = inputUrl.value.trim();

  if (!link) return;

  renderSpinner();
  renderQR(link);
});
