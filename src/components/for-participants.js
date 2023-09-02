// ФУНКЦИОНАЛ НА СТРАНИЦЕ "УЧАСТНИКАМ"

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.


// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const hidden = 'hidden';

// открываем конструкцию if-else (иначе сыпятся ошибки, что элементы не найдены)
if (document.querySelector('.page_id_for-participants')) {

  const contentSection = document.querySelector('.participants__container_type_content');
  const formSection = document.querySelector('.participants__container_type_form');
  const openFormBtn = document.querySelector('#open-form-btn');
  const formParticipants = document.querySelector('.form');
  const fieldsets = Array.from(formParticipants.querySelectorAll('.form__step'));



// открытие формы
function openForm() {
    contentSection.classList.add(hidden)
    formSection.classList.remove(hidden)
    formParticipants.classList.remove(hidden)
    showField(fieldsets[0])
}
// закрытие формы
function closeForm() {
    contentSection.classList.remove(hidden)
    formSection.classList.add(hidden)
    formParticipants.classList.add(hidden)
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
// DRAG and DROP
// инициализация зоны для дропа
const dropArea = document.getElementById('drop-area')

// мб в байтах
const BYTES_IN_MB = 1048576

// полученный файл
let fileInstance

// отмена поведения событий по умолчанию
Array.from(['dragenter', 'dragover', 'dragleave', 'drop']).forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
    return false
}
// подсвечивание области для перетаскивания
Array.from(['dragenter', 'dragover']).forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})
Array.from(['dragleave', 'drop']).forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})
function highlight(e) {
    dropArea.classList.add('form__upload-container_dragover')
}
function unhighlight(e) {
    dropArea.classList.remove('form__upload-container_dragover')
}

dropArea.addEventListener('drop', evt => {
    fileInstance = evt.dataTransfer.files[0]
    if (fileInstance.size > 5 * BYTES_IN_MB) {
      alert('Принимается файл до 5 МБ')
      return false
    }
    if (fileInstance.type.startsWith('image/')) {
      console.log(fileInstance)
    } else {
      alert('Можно загружать только изображения в формате .jpeg')
      return false
    }
})


} // это закрытие конструкции if-else

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
