// ФУНКЦИОНАЛ УНИВЕРСАЛЬНОЙ ВАЛИДАЦИИ ФОРМ (live validation)

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.



// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

if (document.querySelector('.page_id_for-participants')) { // ЕВГЕНИЙ - завернул пока все в if, чтобы убрать ошибку при сборке
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
function enableValidation({formSelector, fieldSelector, ...settings}) {
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

};



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




// Андрей -> end!

// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Алексей -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
