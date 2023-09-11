// ФУНКЦИОНАЛ УНИВЕРСАЛЬНОЙ ВАЛИДАЦИИ ФОРМ (live validation)

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.



// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/*if (document.querySelector('.page_id_for-participants')) { // ЕВГЕНИЙ - завернул пока все в if, чтобы убрать ошибку при сборке
  function showInputError(inputElement, {inputErrorClass}) {
    inputElement.classList.add(inputErrorClass);
}
function hideInputError(inputElement, {inputErrorClass}) {
    inputElement.classList.remove(inputErrorClass);
}

function isValid(fieldElement, inputElement, {...settings}) {
    // if (inputElement.validity.patternMismatch) inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    // else inputElement.setCustomValidity("");

    if(!inputElement.validity.valid) showInputError(inputElement, {...settings})
    else hideInputError(inputElement, {...settings});
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
    if(hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}
// установка валидации на филдсет
function setEventListeners(fieldElement, {inputSelector, submitButtonSelector, ...settings}) {
    const inputList = Array.from(fieldElement.querySelectorAll(inputSelector))
    const buttonElement = fieldElement.querySelector(submitButtonSelector)
    toggleButtonState(inputList, buttonElement, {...settings})
    inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
        isValid(fieldElement, inputElement, {...settings});
        toggleButtonState(inputList, buttonElement, {...settings});
    }));
}
// установка валидации на всю форму и филдсеты
export function enableValidation({formSelector, fieldSelector, ...settings}) {
    const form = document.querySelector(formSelector)
    const fieldList = Array.from(form.querySelectorAll(fieldSelector))
    fieldList.forEach(fieldElement => {
        setEventListeners(fieldElement, {...settings})
    })
}

enableValidation({
    formSelector: '.form',
    fieldSelector: '.form__step-container',
    inputSelector: '.form__field',
    submitButtonSelector: '.button__submit',
    inactiveButtonClass: 'button_type_disabled',
    inputErrorClass: 'form__field_type_error',
});

}; */



// предлагаю брать за основу наработки из проекта Место

// показ ошибки валидации поля

// скрытие ошибки валидации поля

// проверка валидности поля и показать ошибку, если необходимо

// установка валидатора на форму

// проверка наличия невалидного поля

// управление активностью кнопки сабмита

// установка валидатора на все формы на странице

// Функция сброса ошибок при открытии модальных окон

// что-то еще необходимое



// Георгий -> end!


//-------------------------------------------------------------------------


// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Никита -> end!

// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Дмитрий -> end!

// Андрей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const enableButton = (buttonElement, settings) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(settings.inactiveButtonClass);
};

const disableButton = (buttonElement, settings) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
export const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, settings) => {
  if (inputElement.classList.contains('form__field_type_input') ||  inputElement.classList.contains('form__field_type_textarea')) {
    if (inputElement.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement, settings);
    }
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    if (inputElement.classList.contains('form__field_type_input') ||  inputElement.classList.contains('form__field_type_textarea')){
      return !inputElement.validity.valid;
    }
    if (inputElement.classList.contains('form__field_type_select')){
      return !inputElement.value;
    }
  })
};



const toggleButtonState = (inputList, buttonElement, settings) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableButton(buttonElement, settings);
  } else {
    // иначе сделай кнопку активной
    enableButton(buttonElement, settings);
  }
};



const setEventListeners = (formElement, settings) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  if(inputList.length > 0) {
    toggleButtonState(inputList, buttonElement, settings);
    formElement.addEventListener('reset', () => {
      disableButton(buttonElement, settings)
    });
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  }
};



const enableFieldSetValidation = (formElement, settings) => {
  const fieldSetList = Array.from(formElement.querySelectorAll('.form__step-container'));
  fieldSetList.forEach((fieldSet) => {
    setEventListeners(fieldSet, settings);
  });
};

export const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {

    if(formElement.classList.contains('form_type_modal')) {
      setEventListeners(formElement, settings);
    }
    else {
      enableFieldSetValidation(formElement, settings);
    }
  });
};



// Андрей -> end!

// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Алексей -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
