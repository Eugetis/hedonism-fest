// если что-то не работает из-за распределения по именам, можно написать куда нужно и разграничить сверху и снизу своим именем
// ВАЖНО: обязательны комментарии, что делает скрипт (в идеале комментить даже константы, чтобы команда быстро ориентировалась)

//----------------------------------------------------------------------
// ИМПОРТЫ

import '../scss/styles.scss';
import { cardsClickController } from './event';
import { catalogController, modalController } from './catalog';


import forParticipants from './for-participants';

// Никита

// Столкнулся с проблемой, когда обьявил переменную cardsSection в constants.js
// Вебпак заброковал это переменную, когда я ее импортировал и навесил .addEventListener
// Поэтому обьявил сразу так

if (document.querySelector('.page_id_catalog')) {
  document.querySelector('.cards').addEventListener('click', cardsClickController);
  catalogController();
}
// Дмитрий


// Андрей
import {  showSlide, activateSlider } from '../components/photo-slider.js';
import { openModal } from '../components/modal.js';
import { modalDonate } from '../components/constants.js';
import { setAboutEventListener } from '../components/about.js';
import { setCatalogEventListener } from '../components/catalog.js';

// Алексей
import { dropDownMenuOpen, dropDownMenuClose } from '../components/utils.js';
import { dropDownMenuButton, dropDownMenuElements, dropDownMenuInputs, header } from '../components/constants.js';
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
/*const tabSwitcher = document.querySelector('.tab-switcher');
const buttonList = Array.from(tabSwitcher.querySelectorAll('.tab-switcher__button'));
const mapContainer = document.querySelector('.catalog__events-container_type_map');
const listContainer = document.querySelector('.catalog__events-container_type_grid');*/

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
/*let isMap = false;

const handleTabEvent = (evt) => {
    evt.preventDefault();
    toggleTabSwitcher(evt);
    if (!isMap) {
      isMap = true;
      // mapContainer.style.display = 'flex';
      // listContainer.style.display = 'none';
      mapContainer.classList.add('catalog__events-container_opened');
      listContainer.classList.remove('catalog__events-container_opened');
    } else {
      isMap = false;
      // mapContainer.style.display = 'none';
      // listContainer.style.display = 'grid';
      mapContainer.classList.remove('catalog__events-container_opened');
      listContainer.classList.add('catalog__events-container_opened');
    }
}

const toggleTabSwitcher = (evt) => {*/
/* может сделать через перебор элементов свитча и в зависимости от актив вешать или нет*/
/*evt.target.classList.add('tab-switcher__button_active');
evt.target.removeEventListener('click', handleTabEvent);

if (evt.target.nextElementSibling != null) {
  evt.target.nextElementSibling.classList.remove('tab-switcher__button_active');
  evt.target.nextElementSibling.addEventListener('click', handleTabEvent);
} else {
  evt.target.previousElementSibling.classList.remove('tab-switcher__button_active');
  evt.target.previousElementSibling.addEventListener('click', handleTabEvent);
}
}

mapContainer.classList.remove('catalog__events-container_opened');
listContainer.classList.add('catalog__events-container_opened');

buttonList.forEach((button) => {
if (!button.matches('.tab-switcher__button_active')) {
  button.addEventListener('click', handleTabEvent);
}
});*/

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
/*document.querySelector('.page').addEventListener('click', function(){
  if(dropDownMenu.classList.contains('header__form-city_opened')) {
    console.log('клик')
    dropDownMenuClose();
  }
});*/
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
      dropDownMenuButtonText.textContent = dropDownMenuInput.value;
      localStorage.setItem('city', dropDownMenuInput.value);
    }
  })
});
//сохранение значения кнопки и расположении галочки на инпуте
dropDownMenuButtonText.textContent = localStorage.getItem('city');
dropDownMenuInputs.forEach(function (dropDownMenuInput) {
  if (dropDownMenuInput.value === dropDownMenuButtonText.textContent) {
    dropDownMenuInput.checked = true;
  }
});
window.addEventListener('scroll', function () {
  if (pageYOffset > 1500) {
    header.classList.add('header__offset_1')
    header.classList.remove('header__offset_2')
  } else if (pageYOffset <= 1500) {
    header.classList.remove('header__offset_1')
    header.classList.add('header__offset_2')
  }
});

// Алексей -> end!


// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!


// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
