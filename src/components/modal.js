// ФУНКЦИОНАЛ МОДАЛЬНЫХ ОКОН

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.


// Андрей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// полный функционал открытия модалки с навешиванием слушателей
export function openModal(modal) {
  modal.classList.add('modal_opened');
  modal.addEventListener('click', closeModalListener);
  document.addEventListener('keydown', handleEscClose);
}

// полный функционал закрытия модалки с удалением слушателей
export function closeModal(modal) {
  modal.classList.remove('modal_opened');
  modal.removeEventListener('click', closeModalListener);
  document.removeEventListener('keydown', handleEscClose);
}
// закрытие модалки по клику на оверлей
function closeModalListener(evt) {
  console.log(evt);
  if (evt.target.classList.contains('modal') || evt.target.parentElement.classList.contains('modal__close-button')) {
    closeModal(evt.target.closest('.modal_opened'));
  }
}
// закрытие модалки по нажатию на Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.modal_opened'));
  }
}

// Универсальный обработчик закрытия модалки по крестику

// Открытие модалки с формой пожертвования

// Открытие модалки с формой покупки билета



// Андрей -> end!


//-------------------------------------------------------------------------


// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Никита -> end!

// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Дмитрий -> end!

// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Алексей -> end!

// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
