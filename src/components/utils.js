// ВСПОМОГАТЕЛЬНЫЕ СКРИПТЫ



// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Никита -> end!

// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// 2D массив в плоский
export const arrayValues = (array) => {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      result.push(array[i][j]);
    }
  }

  return result;
}

/// logger error to console
export const logError = (err) => {
  console.log(err)
};

// Дмитрий -> end!

// Андрей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Андрей -> end!

// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import {dropDownMenu, dropDownMenuMobile, mobileMenuSlider, page, header, mobileHeaderWrapper, dropDownMenuButtonText, dropDownMenuButtonTextMobile, mobileMenuButton} from '../components/constants.js';

const closeDropDownByOverlayClick = function(evt) {
  if (evt.target !== evt.currentTarget) {
    console.log(evt);
    dropDownMenuClose();
  }
}

export const dropDownMenuOpen = function() {
  dropDownMenu.classList.add('geo__list-container_opened');
  const dropDownMenuCityList = Array.from(dropDownMenu.querySelectorAll('.geo__list-input'));
  dropDownMenuCityList.forEach((dropDownMenuInput) => {
    if (dropDownMenuInput.value === dropDownMenuButtonText.innerText) {
      dropDownMenuInput.checked = true;
    }
  });
  dropDownMenu.addEventListener('click', closeDropDownByOverlayClick);
}

export const dropDownMenuClose = function() {
  dropDownMenu.classList.remove('geo__list-container_opened');
}

export const dropDownMenuMobileOpen = function() {
  dropDownMenuMobile.classList.add('geo__mobile-wrapper_opened');
  const dropDownMenuCityListMobile = Array.from(dropDownMenuMobile.querySelectorAll('.geo__list-input'));
  dropDownMenuCityListMobile.forEach((dropDownMenuInputMobile) => {
    if (dropDownMenuInputMobile.value === dropDownMenuButtonTextMobile.innerText) {
      dropDownMenuInputMobile.checked = true;
    }
  })
}

export const dropDownMenuMobileClose = function() {
  dropDownMenuMobile.classList.remove('geo__mobile-wrapper_opened')
}

const mobileMenuButtonIcon = mobileMenuButton.querySelector('.button__icon');

export const mobileMenuSliderOpen = function() {
  mobileHeaderWrapper.classList.add('header__wrapper-mobile_opened');
  mobileMenuSlider.classList.add('header__slider_opened');
  mobileMenuButtonIcon.classList.remove('icon-menu-burger');
  mobileMenuButtonIcon.classList.add('icon-cross');
  mobileMenuButton.addEventListener('click', mobileMenuSliderClose);
  page.classList.add('page_type_no-scroll');
}

export const mobileMenuSliderClose = function() {
  mobileMenuButton.removeEventListener('click', mobileMenuSliderClose);
  mobileMenuButtonIcon.classList.remove('icon-cross');
  mobileMenuButtonIcon.classList.add('icon-menu-burger');
  mobileMenuSlider.classList.remove('header__slider_opened');
  mobileHeaderWrapper.classList.remove('header__wrapper-mobile_opened');
  page.classList.remove('page_type_no-scroll');
}

// Алексей -> end!

// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
