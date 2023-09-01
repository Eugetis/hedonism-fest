// ВСПОМОГАТЕЛЬНЫЕ СКРИПТЫ

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.



// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Никита -> end!

// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Дмитрий -> end!

// Андрей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Андрей -> end!

// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import {dropDownMenu, dropDownMenuMobile, mobileMenuSlider, page, headerMobileTop, dropDownMenuDesktop} from '../components/constants.js';
/*export const dropDownMenuDesktopOpen = function() {
  dropDownMenuDesktop.classList.add('header__form-city_opened');
  dropDownMenuDesktop.classList.remove('header__form-city_2');
}

export const dropDownMenuDesktopClose = function() {
  dropDownMenuDesktop.classList.remove('header__form-city_opened');
  dropDownMenuDesktop.classList.add('header__form-city_2');
}*/

export const dropDownMenuOpen = function() {
  dropDownMenu.classList.add('header__form-city_opened');
}

export const dropDownMenuClose = function() {
  dropDownMenu.classList.remove('header__form-city_opened');
}

export const dropDownMenuMobileOpen = function() {
  dropDownMenuMobile.classList.remove('header__slide_content_cities_close')

}
export const dropDownMenuMobileClose = function() {
  dropDownMenuMobile.classList.add('header__slide_content_cities_close')
}

export const mobileMenuSliderOpen = function() {
  mobileMenuSlider.classList.remove('header__slider_state_opened');
  headerMobileTop.classList.remove('header__mobile-top_opened');
  page.classList.add('page__no-scroll');
  document.querySelector('.header__wrapper_mobile').classList.add('header__wrapper_mobile_1')
}
export const mobileMenuSliderClose = function() {
  mobileMenuSlider.classList.add('header__slider_state_opened');
  page.classList.remove('page__no-scroll');
  headerMobileTop.classList.add('header__mobile-top_opened');
  document.querySelector('.header__wrapper_mobile').classList.remove('header__wrapper_mobile_1')
}

// Алексей -> end!

// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
