import {cardTemplate, cardGridSection, modalTemplate} from './constants';
import {modalController} from "./catalog";
// РАБОТА С МЕРОПРИЯТИЕМ

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.


// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const addCard = (cards) => {
  cards.forEach((card) => {
    cardGridSection.append(card);
  })
}

export const prepareCard = ({cards}) => {
  const preparedCards = cards.map((card) => {
    return createCard(card)
  })

  addCard(preparedCards);
}

export const modalCreate = ([card]) => {
  const location = card.location.shift();
  const modalElement = modalTemplate.querySelector('.modal').cloneNode(true);

  modalElement.dataset.id = card.id;
  modalElement.dataset.coordinates = card.coordinates;
  modalElement.querySelector('.event__image').src = card.image;
  modalElement.querySelector('.event__type').textContent = card.type;
  modalElement.querySelector('.event__date').textContent = `${card.date}, ${card.timeDuration}`;
  modalElement.querySelector('.event__title').textContent = card.name;
  modalElement.querySelector('.event__text').innerHTML = card.description;
  modalElement.querySelector('#table-lines__duration').textContent = card.duration;
  modalElement.querySelector('#table-lines__price').textContent = `${card.price} ₽`;
  modalElement.querySelector('#table-lines__place').textContent = card.placeName;
  modalElement.querySelector('#table-lines__address').textContent = location.address;
  modalElement.querySelector('#table-lines__phone').textContent = card.phone;
  modalElement.querySelector('.button').textContent = `смотреть еще ${card.location.length -1}`;

  return modalElement;
}

export const modalHandler = (modal, type) => {
  document.querySelector('.page').append(modal);
  modal.classList.add('modal_opened');

  switch (type) {
    case 'open':
      document.querySelector('.page').append(modal);
      modal.classList.add('modal_opened');
      break;
    case 'close':
      modal.classList.remove('modal_opened');
      document.querySelector('.page').remove(modal);
  }
}

const createCard = (item) => {
  const location = item.location.shift();
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const span = cardElement.querySelector('.card-control__icon');

  if (cardLikeController(item.id)) {
    span.classList.add('icon-heart-filled');
  } else {
    span.classList.add('icon-heart');
  }

  cardElement.dataset.id = item.id;
  cardElement.dataset.coordinates = location.coordinates;
  cardElement.querySelector('.cards__item-img').src = item.image;
  cardElement.querySelector('.cards__item-img').alt = item.type;
  cardElement.querySelector('#cards__item-type').textContent = item.type;
  cardElement.querySelector('#cards__item-date').textContent = `${item.date}, ${item.timeDuration}`;
  cardElement.querySelector('.cards__item-title').textContent = item.name;
  cardElement.querySelector('.cards__item-description').textContent = item.description;
  cardElement.querySelector('#cards__item-address').textContent = location.address;
  cardElement.querySelector('#cards__item-count').textContent = `+ еще ${item.location.length - 1}`;

  return cardElement;
}

const cardLikeController = (id) => {
  const likesArray = getStorageValueByKey('likes');

  return likesArray.some((element) => element === id);
}

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

const removeLikeFromStorage = (id, likesArray) => {
  const clearedArray = likesArray.filter((item) => item !== id);
  localStorage.setItem('likes', JSON.stringify(clearedArray));
}

export const cardsClickController = (event) => {
  const target = event.target;
  const cardId = event.target.closest('.cards__item').dataset.id;
  const classList = Array.from(target.classList).join(' ');
  const likeRegex = /card-control/g;
  let card = null;
  if (classList.match(likeRegex)) {
    card = target.closest('.cards__item');
    return addLikeToStorage(card);
  } else {
    return modalController(cardId);
  }
}

const hasLike = (id, array) => {
  return array.indexOf(id) !== -1;
}

const getStorageValueByKey = (key) => {
  if (!hasKeyInStorage(key)) {
    return null;
  }

  return JSON.parse(localStorage.getItem(key));
}

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
