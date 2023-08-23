import './scss/styles.scss';
const modalButton = document.querySelector('.modal__button');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');

modalButton.addEventListener('click', (event) => {
  modal.classList.add('modal_opened');
  modalContainer.classList.add('modal__container_opened');
})

console.log('hello');
