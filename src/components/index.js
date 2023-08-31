// если что-то не работает из-за распределения по именам, можно написать куда нужно и разграничить сверху и снизу своим именем
// ВАЖНО: обязательны комментарии, что делает скрипт (в идеале комментить даже константы, чтобы команда быстро ориентировалась)

//----------------------------------------------------------------------
// ИМПОРТЫ

import '../scss/styles.scss';
import { cardsClickController } from './event';
import { catalogController, generalCardController, modalController } from './catalog';


import forParticipants from './for-participants';

// Никита

// Столкнулся с проблемой, когда обьявил переменную cardsSection в constants.js
// Вебпак заброковал это переменную, когда я ее импортировал и навесил .addEventListener
// Поэтому обьявил сразу так

if (document.querySelector('.page_id_catalog')) {
  const cardGridSection = document.querySelector('.cards_type_grid');
  const cardTemplate = cardGridSection.querySelector('#card').content;
  document.querySelector('.cards').addEventListener('click', cardsClickController);
  catalogController(cardGridSection, cardTemplate);
}

if (document.querySelector('.page_id_index')) {
  const cardScrollSection = document.querySelector('.cards_type_scroll');
  const cardTemplate = cardScrollSection.querySelector('#card').content;
  document.querySelector('.cards').addEventListener('click', cardsClickController);
  generalCardController(cardScrollSection, cardTemplate);
}
// Дмитрий

import { updateCityOnMap } from './catalog'

// Андрей
import {  showSlide, activateSlider } from '../components/photo-slider.js';
import { openModal } from '../components/modal.js';
import { modalDonate } from '../components/constants.js';
import { setAboutEventListener } from '../components/about.js';
import { setCatalogEventListener } from '../components/catalog.js';

// Алексей
import { dropDownMenuOpen, dropDownMenuClose } from '../components/utils.js';
import {
  cardGridSection,
  dropDownMenuButton,
  dropDownMenuElements,
  dropDownMenuInputs,
  header
} from '../components/constants.js';
// Георгий


// Евгений



//----------------------------------------------------------------------
// КОНСТАНТЫ (если потребуется положить их прямо тут, а не в constants.js)

// Никита
const modalButton = document.querySelector('.modal__button');
const modalCloseButton = document.querySelector('.modal__close-button')
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');

// Дмитрий


// Андрей
const donateButton = document.querySelector('.header__button');



// Алексей
let dropDownMenuButtonText = document.querySelector('.dropdown__button-text');







// Георгий


// Евгений



//-----------------------------------------------------------------------------------------------
// СКРИПТЫ

// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

modalButton.addEventListener('click', (event) => {
  modal.classList.add('modal_opened');
  modalContainer.classList.add('modal__container_opened');
})

modalCloseButton.addEventListener('click', () => {
  modal.classList.remove('modal_opened');
  modalContainer.classList.remove('modal__container_opened');
})

// Никита -> end!


// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// Дмитрий -> end!


// Андрей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
if (document.querySelector('.page_id_index')) {
  window.addEventListener('resize', showSlide);
  showSlide();
  activateSlider();
}

if (document.querySelector('.page_id_404') || document.querySelector('.page_id_thanks-for-application') || document.querySelector('.page_id_thanks-for-support')) {
  document.querySelector('.footer').classList.add('footer_style_additional');
}

donateButton.addEventListener('click', () => {
  openModal(modalDonate);
})

if (document.querySelector('.page_id_about')) {
  setAboutEventListener();
}

if (document.querySelector('.page_id_catalog')) {
  setCatalogEventListener();
}

if (document.querySelector('.page_id_catalog')) {
  document.querySelector('.modal__button_type_ticket').addEventListener('click', () => {
    openModal(document.querySelector('.modal_id_payment'));
  });
}

// Андрей -> end!


// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//открытие дропдауна
dropDownMenuButton.addEventListener('click', dropDownMenuOpen);
//закрытие дропдауна
dropDownMenuElements.forEach(function (dropDownMenuElement) {
  dropDownMenuElement.addEventListener('click', dropDownMenuClose);
})
//подставление значения выбранного пункта дропдауна
dropDownMenuInputs.forEach(function (dropDownMenuInput) {
  dropDownMenuInput.addEventListener('click', function () {
    if (dropDownMenuInput.checked) {
      dropDownMenuButtonText.innerText = dropDownMenuInput.value;
      localStorage.setItem('city', dropDownMenuInput.value);
      // Dmitry
      // пинаем карту, чтобы обновилась по выбранному городу
      updateCityOnMap();
      // Dmitry -> end!
    }
  })
});
//Проверка локалсторэдж, вставка в него дефолтного города
if (!localStorage.getItem('city')) {
  localStorage.setItem('city', 'Москва');
}

//сохранение значения кнопки и расположении галочки на инпуте
dropDownMenuButtonText.textContent = localStorage.getItem('city');
dropDownMenuInputs.forEach(function (dropDownMenuInput) {
  if (dropDownMenuInput.value === dropDownMenuButtonText.innerText) {
    dropDownMenuInput.checked = true;
  }
});

//появляющийся при скролле хедер
if (document.querySelector('.page_id_index')) {
   header.classList.add('header__offset');
window.addEventListener('scroll', function () {
  if (pageYOffset > 10) {
    header.classList.remove('header__offset');
    header.classList.add('header__offset_1');
    header.classList.remove('header__offset_2');

  } else if (pageYOffset <= 10) {
    header.classList.remove('header__offset_1');
    header.classList.add('header__offset_2');
  }
})
}

// Алексей -> end!


// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!


// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
