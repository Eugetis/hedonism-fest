// ФУНКЦИОНАЛ НА СТРАНИЦЕ "УЧАСТНИКАМ"

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.


// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const contentSection = document.querySelector('.participants__container_type_content')
const formSection = document.querySelector('.participants__container_type_form')
const openFormBtn = document.querySelector('#open-form-btn')
const form = document.querySelector('.form')
const fieldsets = Array.from(form.querySelectorAll('.form__step'))
const hidden = 'hidden'

// открытие формы
function openForm() {
    contentSection.classList.add(hidden)
    formSection.classList.remove(hidden)
    form.classList.remove(hidden)
    showField(fieldsets[0])
}
// закрытие формы
function closeForm() {
    contentSection.classList.remove(hidden)
    formSection.classList.add(hidden)
    form.classList.add(hidden)
    fieldsets.forEach(field => hideField(field))
}
// отобразить филсет
function showField(field) {
    field.classList.remove(hidden)
}
// скрыть филдсет
function hideField(field) {
    field.classList.add(hidden)
}
// скрипт перелистывания шагов формы
function handleScroll(evt) {
    //найти текущий филсет
    const currentField = evt.target.closest('.form__step')
    // поиск подходящей кнопки по data-атрибуту
    if(evt.target.dataset.action === 'back') {
        hideField(currentField)
        showField(currentField.previousElementSibling)
    } else if(evt.target.dataset.action === 'continue') {
        hideField(currentField)
        showField(currentField.nextElementSibling)
    } else if(evt.target.dataset.action === 'cancel') {
        closeForm()
    } else if(evt.target.dataset.action === 'submit') {
        // handleFormSubmit()
        closeForm()
    }
}

// установка слушателя клика на кнопку для открытия формы
openFormBtn.addEventListener('click', openForm)

// установка слушателей клика на кнопки внутри формы для навигации между шагами
function setListeners() {
    fieldsets.forEach(field => {
        // найти все кнопки каждого филдсета
        const btns = Array.from(field.querySelectorAll('.button'))
        // установить на каждую кнопку слушатель
        btns.forEach(btn => {
            btn.addEventListener('click', handleScroll)
            // изменение текста кнопки в зависимости от своей позиции
            if(btn.dataset.action === 'back') btn.textContent = 'назад'
            if(btn.dataset.action === 'submit') btn.textContent = 'отправить'
        })
    })
}
setListeners()

// инициализация установки валидатора формы (нужно обход всех форм на странице, потому что будет еще форма пожертвования в модалке)

// функция отправки формы (обсудить, что делаем, скорее всего отправим на фейковый API)
function handleFormSubmit(evt) {
    evt.preventDefault()
}
// ОСНОВНЫЕ ТРЕБОВАНИЯ К ВАЛИДАЦИИ - см. в ТЗ в Notion



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
