import {modalController} from "./catalog";
import {openModal, closeModal} from "./modal";
// РАБОТА С МЕРОПРИЯТИЕМ

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.


// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Функция addCard принимает подготовленный массив карточек из функции prepareCard и добавляет их в cardGridSection
export const addCard = (cards, section) => {
  cards.forEach((card) => {
    section.append(card);
  })
}

// Функция собирает нужный формат карточек с помощью функции createCard и передает это дальше для рендера на странице в addCard
export const prepareCard = ({cards}, cardTemplate) => {
  return cards.map((card) => {
    return createCard(card, cardTemplate)
  });
}

// Функция которая собирает нужный формат для отрисовки модалки по клику на карточку.
export const modalCreate = ([card], modalTemplate) => {
  const location = card.location.shift();
  const modalElement = modalTemplate.querySelector('.modal').cloneNode(true);
  const modalButton = modalElement.querySelector('#modal__button-like');
  const addressButton = modalElement.querySelector('.table-lines__button');
  const addressButtonIcon = modalElement.querySelector('.button__icon').outerHTML;
  addressButton.innerHTML = `смотреть еще ${card.location.length - 1}${addressButtonIcon}`

  modalElement.dataset.id = card.id;
  modalElement.dataset.coordinates = location.coordinates;
  modalElement.querySelector('.event__image').src = card.image;
  modalElement.querySelector('.event__type').textContent = card.type;
  modalElement.querySelector('.event__date').textContent = `${card.date}, ${card.timeDuration}`;
  modalElement.querySelector('.event__title').textContent = card.name;
  modalElement.querySelector('.event__text').innerHTML = card.description;
  modalElement.querySelector('#table-lines__duration').textContent = card.duration;
  modalElement.querySelector('#table-lines__price').textContent = `${card.price} ₽`;
  modalElement.querySelector('#table-lines__place').textContent = card.placeName;
  modalElement.querySelector('#table-lines__address').innerHTML = `${location.address}${addressButton.outerHTML}`;
  modalElement.querySelector('#table-lines__phone').textContent = card.phone;

  if (cardLikeController(card.id)) {
    modalButton.innerHTML = modalLikeHandler(modalElement, true);
  } else {
    modalButton.innerHTML = modalLikeHandler(modalElement, false);
  }

  return modalElement;
}

// Функция которая принимает саму модалку и type (open, close), в зависимости от типа либо открывает модальное окно, либо закрывает его.
export const modalHandler = (modal, type) => {
  const modalButton = modal.querySelector('#modal__button-like');
  document.querySelector('.page').append(modal);
  modal.classList.add('modal_opened');

  switch (type) {
    case 'open':
      document.querySelector('.page').append(modal);
      openModal(modal);
      modalButton.addEventListener('click', modalClickHandler);
      break;
    case 'close':
      closeModal(modal);
      document.querySelector('.page').remove(modal);
      modalButton.removeEventListener('click', modalClickHandler);
  }
}

// Функция которая отвечает за интерктивность кнопки "хочу пойти", добавляя нужный текст и цвет лайка взависимости от ситуации
const modalClickHandler = async (event) => {
  const modal = event.target.closest('.modal_id_event-full');
  const modalId = modal.dataset.id;
  const card = document.querySelector(`[data-id="${modalId}"]`)
  const modalButton = event.target;

  if (cardLikeController(modalId)) {
    const likesArray = getStorageValueByKey('likes');
    removeLikeFromStorage(modalId, likesArray);
    modalButton.innerHTML = modalLikeHandler(modal, false);
    return cardLikeLocalController(card, 'delete');
  } else {
    addLikeToStorage(card);
    modalButton.innerHTML = modalLikeHandler(modal, true);
    return cardLikeLocalController(card, 'add');
  }
}

// Функция которая возвращает нужную разметку для кнопки "хочу пойти"
const modalLikeHandler = (modal, state) => {
  const modalButton = modal.querySelector('#modal__button-like');
  const modalButtonSpan = modalButton.querySelector('.event__icon-liked');

  switch (state) {
    case true:
      modalButtonSpan.classList.remove('icon-heart-filled')
      modalButtonSpan.classList.add('icon-heart')
      return `${modalButtonSpan.outerHTML}не хочу идти`;
    case false:
      modalButtonSpan.classList.remove('icon-heart')
      modalButtonSpan.classList.add('icon-heart-filled')
      return `${modalButtonSpan.outerHTML}хочу пойти`;
  }
}

// Функция которая создает нужный формат карточки для отрисовки ее на странице.
const createCard = (item, cardTemplate) => {
  const location = item.location.shift();
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const span = cardElement.querySelector('.card-control__icon');

  if (cardLikeController(item.id)) {
    span.classList.add('icon-heart-filled');
  } else {
    span.classList.add('icon-heart');
  }

  const dateContent = item.date.split(' ');
  const date = `${dateContent[0]} ${dateContent[1].substring(0, 3)}`

  cardElement.dataset.id = item.id;
  cardElement.dataset.coordinates = location.coordinates;
  cardElement.querySelector('.cards__item-img').src = item.image;
  cardElement.querySelector('.cards__item-img').alt = item.type;
  cardElement.querySelector('#cards__item-type').textContent = item.type;
  cardElement.querySelector('#cards__item-date').textContent = `${date}, ${item.timeDuration}`;
  cardElement.querySelector('.cards__item-title').textContent = item.name;
  cardElement.querySelector('.cards__item-description').textContent = item.description;
  cardElement.querySelector('#cards__item-address').textContent = location.address;
  cardElement.querySelector('#cards__item-count').textContent = `+ еще ${item.location.length - 1}`;

  return cardElement;
}

// Функция которая отвечает за изначальную отрисовку лайки при рендере, она используется при создании карточки в createCard, если лайк на карточке был, то добавит одну иконку, если нет то другую
const cardLikeController = (id) => {
  const likesArray = getStorageValueByKey('likes');

  if (likesArray === null) {
    return false;
  }

  return likesArray.some((element) => element === id);
}

// Функция которая отвечает за локальное добавления лайка (без перезагрузки страницы), то есть условно ajax, во время нажатии кнопки в зависимости от типа
const cardLikeLocalController = (card, type) => {
  const span = card.querySelector('.card-control__icon');
  switch (type) {
    case 'add':
      span.classList.remove('icon-heart');
      span.classList.add('icon-heart-filled');
      break;

    case 'delete':
      span.classList.remove('icon-heart-filled');
      span.classList.add('icon-heart');
      break;
  }
}

// рендер карточки мероприятия - готово

// лайк мероприятия (на карточке и внутри модалки с описанием) с сохранением в local storage

// Функция которая добавляет ID карточки в localStorage, для того чтобы в дальнейшем после перезагрузки страницы добавились лайки на те карточки которые были лайкнуты ранее
export const addLikeToStorage = (card) => {
  const id = card.dataset.id;
  if (!hasKeyInStorage('likes')) {
    localStorage.setItem('likes', JSON.stringify([]));
  }

  const likesArray = getStorageValueByKey('likes');
  if (hasLike(id, likesArray)) {
    cardLikeLocalController(card, 'delete');
    return removeLikeFromStorage(id, likesArray);
  }

  cardLikeLocalController(card, 'add');
  likesArray.push(id);
  localStorage.setItem('likes', JSON.stringify(likesArray));
}

// Функция которая удаляет ID той карточки на которой стоял лайк
const removeLikeFromStorage = (id, likesArray) => {
  const clearedArray = likesArray.filter((item) => item !== id);
  localStorage.setItem('likes', JSON.stringify(clearedArray));
}

// Функция которая отлавливает нажатия внутрии секции CARDS, и взависимости от нажатия производит какие-либо действия, если нажата кнопка лайка, то добавляет лайк, если нажато любое другое место, то открывает модалку
export const cardsClickController = (event) => {
  const target = event.target;
  const cardId = event.target.closest('.cards__item').dataset.id;
  const classList = Array.from(target.classList).join(' ');
  const likeRegex = /card-control/g;
  let card = null;
  if (document.querySelector('.page_id_index')) {
    if (classList.match(likeRegex)) {
      card = target.closest('.cards__item');
      return addLikeToStorage(card);
    }
  } else {
    if (classList.match(likeRegex)) {
      card = target.closest('.cards__item');
      return addLikeToStorage(card);
    } else {
      const modalTemplate = document.querySelector('#modal_id_event-full').content;
      return modalController(cardId, modalTemplate);
    }
  }
}

// Функция которая принимает массив с ID карточками на которых стоят лайки и сам ID карточки которую надо проверить конкретно, возвращает true false
const hasLike = (id, array) => {
  return array.indexOf(id) !== -1;
}


// Функция которая возвращает null если в localStorage нету key, в другом случае возвращает обьект по ключу key и его value
const getStorageValueByKey = (key) => {
  if (!hasKeyInStorage(key)) {
    return null;
  }

  return JSON.parse(localStorage.getItem(key));
}

// Функция которая проверяет есть ли ключ в localStorage
const hasKeyInStorage = (key) => {
  if (localStorage.getItem(key) === null) {
    return false;
  }
  return true;
}

// установка слушателя на кнопку "купить билет" для открытия модалки покупки (скрипт открытия модалок напишет Андрей)

// копирование ссылки внутри модалки с описанием мероприятия

// переход к просмотру "еще адресов" и рендер соответствующих карточек (верстку соберу к вечеру 30.08)


// Никита -> end!


//-------------------------------------------------------------------------


// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// Дмитрий -> end!

// Андрей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Андрей -> end!

// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Алексей -> end!

// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
