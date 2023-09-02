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
import {dropDownMenu} from '../components/constants.js';

export const dropDownMenuOpen = function() {
  dropDownMenu.classList.add('header__form-city_opened');
}

export const dropDownMenuClose = function() {
  dropDownMenu.classList.remove('header__form-city_opened');
}


// Алексей -> end!

// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
