//Константы
const sliderLine = document.querySelector('.gallery__slider-line');
const sliderDots = document.querySelectorAll('.gallery__slider-radio');
const sliderImages = document.querySelectorAll('.gallery__image');

// Переменные
let sliderCount = 0;
let sliderWidth;

// console.log(sliderImages);

window.addEventListener('resize', showSlide);

export function showSlide() {
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


function rollSlider() {
  sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

function thisSlide(index) {
  sliderDots.forEach(item => item.classList.remove('gallery__slider-radio_active'));
  sliderDots[index].classList.add('gallery__slider-radio_active');
}

export function activateSlider() {
  sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      sliderCount = index;
      rollSlider();
      thisSlide(sliderCount);
    })
  })
}
