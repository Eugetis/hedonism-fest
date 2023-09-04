// если что-то не работает из-за распределения по именам, можно написать куда нужно и разграничить сверху и снизу своим именем
// ВАЖНО: обязательны комментарии, что делает скрипт (в идеале комментить даже константы, чтобы команда быстро ориентировалась)

//----------------------------------------------------------------------
// ИМПОРТЫ

import '../scss/styles.scss';
import { cardsClickController, modalFavoriteController} from './event';
import {catalogController, generalCardController} from './catalog';



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

if (document.querySelector('#button__favorite')) {
  const buttonsFavorite = document.querySelectorAll('#button__favorite');
  buttonsFavorite.forEach((button) => button.addEventListener('click', modalFavoriteController))
}

if (document.querySelector('.page_id_404')) {
  const cardScrollSection = document.querySelector('.cards_type_scroll');
  const cardTemplate = cardScrollSection.querySelector('#card').content;
  document.querySelector('.cards').addEventListener('click', cardsClickController);
  generalCardController(cardScrollSection, cardTemplate);
}


if (document.querySelector('.page_id_thanks-for-application')) {
  const cardScrollSection = document.querySelector('.cards_type_scroll');
  const cardTemplate = cardScrollSection.querySelector('#card').content;
  document.querySelector('.cards').addEventListener('click', cardsClickController);
  generalCardController(cardScrollSection, cardTemplate);
}

if (document.querySelector('.page_id_thanks-for-support')) {
  const cardScrollSection = document.querySelector('.cards_type_scroll');
  const cardTemplate = cardScrollSection.querySelector('#card').content;
  document.querySelector('.cards').addEventListener('click', cardsClickController);
  generalCardController(cardScrollSection, cardTemplate);
}

if (document.querySelector('.cards_type_scroll')) {
  const cardScrollSection = document.querySelector('.cards_type_scroll');
  const cardTemplate = cardScrollSection.querySelector('#card').content;
  document.querySelector('.cards').addEventListener('click', cardsClickController);
  generalCardController(cardScrollSection, cardTemplate);
}
// Дмитрий

import { updateCityOnMap } from './map.js'

// Андрей
import { showSlide, activateSlider } from '../components/photo-slider.js';
import { openModal } from '../components/modal.js';
import { modalDonate } from '../components/constants.js';
import { setAboutEventListener } from '../components/about.js';
import { setCatalogEventListener } from '../components/catalog.js';
import { addScrollListener } from '../components/floating-button.js';

// Алексей
import {/*dropDownMenuDesktopOpen, dropDownMenuDesktopClose,*/ dropDownMenuOpen, dropDownMenuClose, dropDownMenuMobileOpen, dropDownMenuMobileClose, mobileMenuSliderOpen, mobileMenuSliderClose } from '../components/utils.js';
import {
  cardGridSection,
  //dropDownMenuButtonMobile,
  dropDownMenuButton,
  dropDownMenuButtonBack,
  mobileMenuButton,
  mobileMenuButtonSecondary,
  mobileMenuButtonClose,
  dropDownMenuElements,
  dropDownMenuInputs,
  header
} from '../components/constants.js';
// Георгий
import forParticipants from './for-participants';
import { enableValidation } from './validation';

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
let dropDownMenuButtonTextMobile = document.querySelector('.dropdown__button-text-mobile');







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
  addScrollListener();
}

if (document.querySelector('.page_id_404') || document.querySelector('.page_id_thanks-for-application') || document.querySelector('.page_id_thanks-for-support')) {
  document.querySelector('.footer').classList.add('footer_style_additional');
}
// Евгений вклинился
if (document.querySelector('.page_id_for-participants')) {
  document.querySelector('.footer').classList.add('footer_hidden', 'footer_style_move-down');
}
// Евгений -> end!
donateButton.addEventListener('click', () => {
  openModal(modalDonate);
})

if (document.querySelector('.page_id_about')) {
  setAboutEventListener();
  addScrollListener();
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
//dropDownMenuButton.addEventListener('click', dropDownMenuDesktopOpen);
dropDownMenuButton.addEventListener('click', dropDownMenuOpen);
//закрытие дропдауна
dropDownMenuElements.forEach(function (dropDownMenuElement) {
  dropDownMenuElement.addEventListener('click', dropDownMenuClose);
})
/*dropDownMenuElements.forEach(function (dropDownMenuElement) {
  dropDownMenuElement.addEventListener('click', dropDownMenuDesktopClose);
})*/
//открытие дропдауна на мобильной версии
dropDownMenuButtonTextMobile.addEventListener('click', dropDownMenuMobileOpen);
//закрытие дропдауна на мобильной версии
dropDownMenuButtonBack.addEventListener('click', dropDownMenuMobileClose);
//выезд слайда с меню на мобильной версии
if (document.querySelector('.page_id_index')) {
mobileMenuButton.addEventListener('click', mobileMenuSliderOpen);
}
mobileMenuButtonSecondary.addEventListener('click', mobileMenuSliderOpen);
mobileMenuButtonClose.addEventListener('click', mobileMenuSliderClose);


//подставление значения выбранного пункта дропдауна
dropDownMenuInputs.forEach(function (dropDownMenuInput) {
  dropDownMenuInput.addEventListener('click', function () {
    if (dropDownMenuInput.checked) {
      console.log(dropDownMenuInput.value);
      dropDownMenuButtonText.innerText = dropDownMenuInput.value;
      dropDownMenuButtonTextMobile.innerText = dropDownMenuInput.value;
      localStorage.setItem('city', dropDownMenuInput.value);
      dropDownMenuMobileClose();
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
dropDownMenuButtonTextMobile.textContent = localStorage.getItem('city');
dropDownMenuInputs.forEach(function (dropDownMenuInput) {
  if (dropDownMenuInput.value === dropDownMenuButtonText.innerText) {
    dropDownMenuInput.checked = true;
  } else if (dropDownMenuInput.value === dropDownMenuButtonTextMobile.innerText) {
    console.log(dropDownMenuInput);
    dropDownMenuInput.checked = true;
  }
});

//появляющийся при скролле хедер
if (document.querySelector('.page_id_index')) {
   header.classList.add('header__offset');
   header.classList.add('header__offset_3');
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
