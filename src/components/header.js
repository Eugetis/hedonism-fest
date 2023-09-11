import { modalFavoriteControllerRef, hasKeyInStorage, getStorageValueByKey } from './event.js'
// что-то по теме

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.



// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//выезжающий по оси Y хедер
/*window.addEventListener('scroll', function () {
  if (pageYOffset > 1500) {
    header.classList.add('header__offset_1')
    header.classList.remove('header__offset_2')
  } else if (pageYOffset <= 1500) {
    header.classList.remove('header__offset_1')
    header.classList.add('header__offset_2')
  }
});*/

// открытие дропдауна с выбором городов (список городов будем тянуть через запрос к API - сегодня подготовим)

// проброс выбранного города в хедер и в local storage

// открытие мобильного меню по клику на бургер

// открытие второго слайда мобильного меню по клику на название города

// выбор города на втором слайде мобильного меню, проброс в хедер, автоматический возврат на первый слайл мобильного меню

// установка слушателя клика на кнопку "Поддержать" - в коллбек временно написать слово-заглушку openModalDonation
// открытие модалок будет писать другой участник проекта (этот же слушатель нужен на кнпоке внутри мобильного меню)

// установка слушателя клика на кнопку "Хочу пойти" - должен быть возможен только при условии, что
// в local storage есть соответствующие данные (это сделаем ПОЗЖЕ)

// может вслывет что-то еще



// Алексей -> end!


//-------------------------------------------------------------------------


// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Никита -> end!

// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const setLikeInHeader = () => {
  const buttonFavorite = document.querySelector('#button__favorite_ref');
  const span = buttonFavorite.querySelector('.button__icon');
  span.classList.remove('icon-heart');
  span.classList.add('icon-heart-filled');
}

export const clearLikeInHeader = () => {
  const buttonFavorite = document.querySelector('#button__favorite_ref');
  const span = buttonFavorite.querySelector('.button__icon');
  span.classList.remove('icon-heart-filled');
  span.classList.add('icon-heart');
}

const headerFavoriteButton = document.querySelector('#button__favorite_ref');
headerFavoriteButton.addEventListener('click', evt => modalFavoriteControllerRef(evt));

export const updateLikeInHeader = () => {
  if (hasKeyInStorage('likes')) {
    const likesArray = getStorageValueByKey('likes');
    if (likesArray.length !== 0) {
      setLikeInHeader();  // Dmitry
    } else {
      clearLikeInHeader();  // Dmitry
    }
  }
}
// Дмитрий -> end!

// Андрей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Андрей -> end!

// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Алексей -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
