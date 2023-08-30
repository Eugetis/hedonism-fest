// если что-то не работает из-за распределения по именам, можно написать куда нужно и разграничить сверху и снизу своим именем
// ВАЖНО: обязательны комментарии, что делает скрипт (в идеале комментить даже константы, чтобы команда быстро ориентировалась)

//----------------------------------------------------------------------
// ИМПОРТЫ

import '../scss/styles.scss';

// Никита


// Дмитрий


// Андрей


// Алексей
import { dropDownMenuOpen, dropDownMenuClose } from '../components/utils.js';
import { dropDownMenuButton, dropDownMenuElements, dropDownMenuInputs } from '../components/constants.js';
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
const sliderLine = document.querySelector('.gallery__slider-line');
const sliderDots = document.querySelectorAll('.gallery__slider-radio');
const sliderImages = document.querySelectorAll('.gallery__image');

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

// Переменные
let sliderCount = 0;
let sliderWidth;

// console.log(sliderImages);

window.addEventListener('resize', showSlide);

function showSlide() {
  if (sliderLine) {
    sliderWidth = document.querySelector('.gallery__slider').offsetWidth;
    if (window.innerWidth < 768) {
      sliderLine.style.width = sliderWidth * sliderImages.length + 'px';

      rollSlider();
    } else {
      sliderLine.style.transform = `translateX(0)`;
      sliderLine.style.width = '100%';
    }
  }
}

showSlide();

function rollSlider() {
  sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

function thisSlide(index) {
  sliderDots.forEach(item => item.classList.remove('gallery__slider-radio_active'));
  sliderDots[index].classList.add('gallery__slider-radio_active');
}

function activateSlider() {
  sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      sliderCount = index;
      rollSlider();
      thisSlide(sliderCount);
    })
  })
}

activateSlider();

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
      dropDownMenuButtonText.textContent = dropDownMenuInput.value;
    }
  })
});


// Алексей -> end!


// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!


// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
