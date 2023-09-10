// ВСПОМОГАТЕЛЬНЫЕ СКРИПТЫ

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.



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
import {dropDownMenu, dropDownMenuMobile, mobileMenuSlider, page, header, headerMobileTop, dropDownMenuDesktop} from '../components/constants.js';
/*export const dropDownMenuDesktopOpen = function() {
  dropDownMenuDesktop.classList.add('header__form-city_opened');
  dropDownMenuDesktop.classList.remove('header__form-city_2');
}

export const dropDownMenuDesktopClose = function() {
  dropDownMenuDesktop.classList.remove('header__form-city_opened');
  dropDownMenuDesktop.classList.add('header__form-city_2');
}*/

export const dropDownMenuOpen = function() {
  dropDownMenu.classList.add('geo__list-container_opened');
}

export const dropDownMenuClose = function() {
  dropDownMenu.classList.remove('geo__list-container_opened');
}

export const dropDownMenuMobileOpen = function() {
  dropDownMenuMobile.classList.add('geo__mobile-wrapper_opened')

}
// export const dropDownMenuMobileOpen = function() {
//   dropDownMenuMobile.classList.remove('header__slide_content_cities_close')

// }
export const dropDownMenuMobileClose = function() {
  dropDownMenuMobile.classList.remove('geo__mobile-wrapper_opened')
}

// //изменение иконки в хедере при открытии/закрытии мобильного меню
// const toggleBurgerButtonIcon = (button, action) => {
//   const spanIcon = button.querySelector('.button__icon');
//   switch (action) {
//     case 'opening':
//       spanIcon.classList.remove('icon-menu-burger');
//       spanIcon.classList.add('icon-cross');
//       break;
//     case 'closing':
//       spanIcon.classList.remove('icon-cross');
//       spanIcon.classList.add('icon-menu-burger');
//       break;
//   }
// }
// попытка менять иконку
// export const mobileMenuSliderOpen = function(button) {
//   mobileMenuSlider.classList.add('header__slider_opened');
//   toggleBurgerButtonIcon(button, 'opening');
//   // headerMobileTop.classList.add('header__mobile-top_opened');
//   page.classList.add('page_type_no-scroll');
//   // document.querySelector('.header__wrapper_mobile').classList.add('header__wrapper_mobile_1')
// }
// export const mobileMenuSliderClose = function(button) {
//   mobileMenuSlider.classList.remove('header__slider_opened');
//   toggleBurgerButtonIcon(button, 'closing');
//   page.classList.remove('page_type_no-scroll');
//   // headerMobileTop.classList.remove('header__mobile-top_opened');
//   // document.querySelector('.header__wrapper_mobile').classList.remove('header__wrapper_mobile_1')
// }

export const mobileMenuSliderOpen = function() {
  mobileHeaderWrapper.classList.add('header__wrapper-mobile_opened');
  mobileMenuSlider.classList.add('header__slider_opened');
  // headerMobileTop.classList.add('header__mobile-top_opened');
  page.classList.add('page_type_no-scroll');
  // document.querySelector('.header__wrapper_mobile').classList.add('header__wrapper_mobile_1')
}

export const mobileMenuSliderClose = function() {
  // тут навесил доп проверку, чтобы эта функция могла отработать и на открытом меню вверху главной страницы
  if (document.querySelector('.page_id_index') && header.classList.contains('header__offset_type_index-side')) {
    header.classList.remove('header__offset_type_index-side');
    header.classList.add('header__offset');
    mobileMenuSlider.classList.remove('header__slider_opened');
    mobileHeaderWrapper.classList.remove('header__wrapper-mobile_opened');
    page.classList.remove('page_type_no-scroll');
  } else {
    mobileMenuSlider.classList.remove('header__slider_opened');
    mobileHeaderWrapper.classList.remove('header__wrapper-mobile_opened');
    page.classList.remove('page_type_no-scroll');
  }
}

// export const mobileMenuSliderClose = function() {
//   mobileMenuSlider.classList.remove('header__slider_opened');
//   mobileHeaderWrapper.classList.remove('header__wrapper-mobile_opened');
//   page.classList.remove('page_type_no-scroll');
//   // headerMobileTop.classList.remove('header__mobile-top_opened');
//   // document.querySelector('.header__wrapper_mobile').classList.remove('header__wrapper_mobile_1')
// }
// export const mobileMenuSliderOpen = function() {
//   mobileMenuSlider.classList.remove('header__slider_opened');
//   headerMobileTop.classList.remove('header__mobile-top_opened');
//   page.classList.add('page_type_no-scroll');
//   document.querySelector('.header__wrapper_mobile').classList.add('header__wrapper_mobile_1')
// }
// export const mobileMenuSliderClose = function() {
//   mobileMenuSlider.classList.add('header__slider_opened');
//   page.classList.remove('page_type_no-scroll');
//   headerMobileTop.classList.add('header__mobile-top_opened');
//   document.querySelector('.header__wrapper_mobile').classList.remove('header__wrapper_mobile_1')
// }

// Алексей -> end!

// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// ЗАКОММЕНТИЛ ЭТО, ТАК КАК УБРАЛИ АЛЬТЕРНАТИВНЫЙ ХЕДЕР НА ГЛАВНОЙ
// функция открытия мобильного меню в самом верху главной страницы
// задана проверка на наличие классов, которые присваиваются хедеру на старте,
// если условия соблюдены, то хедеру добавляем класс, который заставляет его выехать сборку вместе с менюшкой
// import { mobileHeaderWrapper } from '../components/constants.js';
// export const mobileMenuIndexTopOpen = function() {
//   if (header.classList.contains('header__offset') || header.classList.contains('header__offset_2')) {
//     header.classList.add('header__offset_type_index-side');
//     mobileHeaderWrapper.classList.add('header__wrapper-mobile_opened');
//     mobileMenuSlider.classList.add('header__slider_opened');
//     page.classList.add('page_type_no-scroll');
//   } else {
//     mobileHeaderWrapper.classList.add('header__wrapper-mobile_opened');
//     mobileMenuSlider.classList.add('header__slider_opened');
//     page.classList.add('page_type_no-scroll');
//   }
// }


// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
