// если что-то не работает из-за распределения по именам, можно написать куда нужно и разграничить сверху и снизу своим именем
// ВАЖНО: обязательны комментарии, что делает скрипт (в идеале комментить даже константы, чтобы команда быстро ориентировалась)

//----------------------------------------------------------------------
// ИМПОРТЫ

import '../scss/styles.scss';
import {cardsClickController} from './event';
import {catalogController, modalController} from './catalog';


// Никита

// Столкнулся с проблемой, когда обьявил переменную cardsSection в constants.js
// Вебпак заброковал это переменную, когда я ее импортировал и навесил .addEventListener
// Поэтому обьявил сразу так

document.querySelector('.cards').addEventListener('click', cardsClickController)
if (document.querySelector('.catalog')) {
  catalogController();
}
// Дмитрий


// Андрей


// Алексей


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
const sliderLine = document.querySelector('.gallery__slider-line');
const sliderDots = document.querySelectorAll('.gallery__slider-radio');
const sliderImages = document.querySelectorAll('.gallery__image');

// Алексей


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




// Алексей -> end!


// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!


// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
