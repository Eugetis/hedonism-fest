import {modalController, setTabSwitchEventListener, initEventsContainer} from "./catalog";
import {openModal, closeModal, removeModal} from "./modal";
import {getCardById} from "./api";
// РАБОТА С МЕРОПРИЯТИЕМ

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.


// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Функция addCard принимает подготовленный массив карточек из функции prepareCard и добавляет их в cardGridSection
export const addCard = (cards, section, type = 'default', cardsCount) => {
  if (type === 'count') {
    return cards.forEach((card) => {
      if (section.childElementCount !== cardsCount) {
        section.append(card);
      } else {
        return null;
      }
    })
  }

  return cards.forEach((card) => {
    section.append(card);
  })
}

// Dmitry
// удаление всех карточек из контейнера (для перерисовки при отработке фильтров)
export const removeCards = (section) => {
    const cardItemList = section.querySelectorAll('.cards__item');
    cardItemList.forEach(card => {
      card.replaceWith();
    });
}
// Dmitry -> end!

// Функция собирает нужный формат карточек с помощью функции createCard и передает это дальше для рендера на странице в addCard
export const prepareCard = ({cards}, cardTemplate, type = 'default') => {
  if (type === 'address') {
    const [card] = cards;
    const cardsCount = card.location.length - 1;
    const cardLocation = card.location.splice(1, cardsCount);
    const result = [];

    for (let i = 0; i < cardsCount; i++) {
      const location = cardLocation.shift();
      const cardContent = createAddressCard(card, cardTemplate, location);
      result.push(cardContent);
    }

    return result;
  }
  return cards.map((card) => {
    return createCard(card, cardTemplate)
  });
}

// Функция которая собирает нужный формат для отрисовки модалки по клику на карточку.
export const modalCreate = ({cards}, modalTemplate) => {
  const [card] = cards;
  const location = card.location.shift();
  const modalElement = modalTemplate.querySelector('.modal').cloneNode(true);
  const modalButton = modalElement.querySelector('#modal__button-like');
  const addressButton = modalElement.querySelector('.table-lines__button');
  const addressButtonIcon = modalElement.querySelector('.icon-arrow-right').outerHTML;
  addressButton.innerHTML = `смотреть еще ${card.location.length}${addressButtonIcon}`

  modalElement.dataset.id = card.id;
  modalElement.dataset.coordinates = location.coordinates;
  modalElement.dataset.price = `${card.price}`
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

export const modalFavoriteController = (event) => {
  if (!event.target.closest('.page_id_catalog')) {
    return window.location.href = 'http://localhost:8080/catalog.html?event=favorite';
  }
  const modal = document.querySelector('#modal-favorite').content;
  modalFavoriteHandler(modal, 'open');
}

// export const modalFavoriteRedirect = () => {
//   const modal = document.querySelector('#modal-favorite').content;
// }

export const catalogRedirectController = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const action = queryParams.get("event");

  if (action === 'favorite') {
    const modal = document.querySelector('#modal-favorite').content;
    modalFavoriteHandler(modal, 'open');
    return null;
  }

  if (action) {
    const template = document.querySelector('#modal_id_event-full').content;
    const card = await getCardById(action);
    const preparedModal = modalCreate(card, template);
    return modalHandler(preparedModal, 'open');
  }
}

export const modalFavoriteHandler = async (modal, type) => {
  const page = document.querySelector('.page');
  const modalTemplate = modal.querySelector('.modal_id_favourites').cloneNode(true);
  const modalBackButton = modalTemplate.querySelector('#button__back');
  const modalTabSwitcher = modalTemplate.querySelector('.tab-switcher'); // Dmitry
  const modalMapContainer = modalTemplate.querySelector('.catalog__events-container_type_map'); // Dmitry
  const mapContainer = document.querySelector('.catalog__events-container_type_map').querySelector('.catalog__map-container');
  const mapContainerClone = mapContainer.cloneNode(true);
  console.log(mapContainer, mapContainerClone)
  const catalogGridContainer = modalTemplate.querySelector('.cards_type_grid');
  const cardTemplate = document.querySelector('.cards_type_grid').querySelector('#card').content;
  switch (type) {
    case 'open':
      const events = await getFavoriteEvents();
      const preparedCards = prepareCard(events, cardTemplate);
      addCard(preparedCards, catalogGridContainer, 'count', preparedCards.length ? preparedCards.length : 0);
      modalMapContainer.append(mapContainerClone);
      page.append(modalTemplate);
      openModal(modalTemplate); // Dmitry
      modalBackButton.addEventListener('click', modalBackHandler);
      initEventsContainer(modalTabSwitcher); // Dmitry
      setTabSwitchEventListener(modalTabSwitcher); // Dmitry

      break;
    case 'close':
      closeModal(modal);
      removeModal(modal); // Dmitry
      modalBackButton.removeEventListener('click', modalBackHandler);
      document.removeEventListener('click', modalFavoriteController);
  }
}

const getFavoriteEvents = async () => {
  const eventsFromStorage = getStorageValueByKey('likes');
  const result = {cards: []};
  if (!eventsFromStorage) {
    return result;
  }

  for (let i = 0; i < eventsFromStorage.length; i++) {
    const {cards} = await getCardById(eventsFromStorage[i]);
    const [card] = cards;
    result.cards.push(card);
  }

  return result;
}

// Функция которая принимает саму модалку и type (open, close), в зависимости от типа либо открывает модальное окно, либо закрывает его.
export const modalHandler = (modal, type) => {
  const modalButton = modal.querySelector('#modal__button-like');
  const modalCopyButton = modal.querySelector('.event__shares-button');
  const modalAddressButton = modal.querySelector('#button__address');
  const modalBackButton = modal.querySelector('#button__back');
  const modalBuyButton = modal.querySelector('#modal__button-buy');

  document.querySelector('.page').append(modal);

  switch (type) {
    case 'open':
      document.querySelector('.page').append(modal);
      openModal(modal, true); // Dmitry
      modalButton.addEventListener('click', modalClickHandler);
      modalCopyButton.addEventListener('click', modalCopyHandler);
      modalAddressButton.addEventListener('click', modalAddressHandler);
      modalBackButton.addEventListener('click', modalBackHandler);
      modalBuyButton.addEventListener('click', modalBuyHandler);
      break;
    case 'close':
      closeModal(modal);
      removeModal(modal); // Dmitry
      modalButton.removeEventListener('click', modalClickHandler);
      modalCopyButton.removeEventListener('click', modalCopyHandler);
      modalAddressButton.removeEventListener('click', modalAddressHandler);
      modalBackButton.removeEventListener('click', modalBackHandler);
      modalBuyButton.removeEventListener('click', modalBuyHandler);
  }
}

const modalBuyHandler = (event) => {
  const currentModal = event.target.closest('.modal_id_event-full');
  const currentPrice = currentModal.dataset.price;
  const paymentModalTemplate = document.querySelector('#payment-modal').content;
  modalPaymentCreate(currentPrice, paymentModalTemplate);
}

const modalPaymentCreate = (price, template) => {
  const currency = '&#x20bd';
  const page = document.querySelector('.page_id_catalog');
  const modalPaymentTemplate = template.querySelector('.modal_id_payment').cloneNode(true);
  const priceContent = modalPaymentTemplate.querySelector('#price');
  modalPaymentTemplate.dataset.price = price;
  priceContent.innerHTML = price + ' ' + currency;

  page.append(modalPaymentTemplate);
  openModal(modalPaymentTemplate);
  priceChangerHandler(modalPaymentTemplate);
}

const priceChangerHandler = (modal) => {
  const input = modal.querySelector('#amount-input');
  const inputForm = modal.querySelector('.form__amount-wrapper');

  inputForm.addEventListener('click', (event) => {
    const target = event.target;

    if (target.id === 'increment' || target.classList.contains('icon-plus-small')) {
      inputStateManager('increment', input);
    }

    if (target.id === 'decrement' || target.classList.contains('icon-minus-small')) {
      inputStateManager('decrement', input);
    }

    triggerInputChangeEvent(input);
  })

  input.addEventListener('input', (event) => inputHandler(event, modal, input))
}

const inputHandler = (event, modal) => {
  const target = event.target;
  let count = Number(target.value);
  const price = modal.dataset.price;
  const priceContent = modal.querySelector('#price');

  if (!event.target.value) {
    count = 1;
  }

  priceContent.innerHTML = `${Number(price) * count} &#8381;`
}

const inputStateManager = (state, input) => {
  const inputPrevValue = input.value;

  if (state === 'decrement' && Number(input.value) === 1) {
    return null;
  }

  switch (state) {
    case 'increment':
      input.value = String(Number(inputPrevValue) + 1);
      input.placeholder = input.value;
      break;

    case 'decrement':
      input.value = String(Number(inputPrevValue) - 1);
      input.placeholder = input.value;
      break;
  }
}

const triggerInputChangeEvent = (input) => {
  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });
  input.dispatchEvent(event);
}

const modalBackHandler = (event) => {
  if (event.target.closest('.modal_id_favourites')) {
    const modal = event.target.closest('.modal_id_favourites');
    return closeModal(modal);
  }
  const modal = event.target.closest('.modal_id_event-full');
  const favoriteList = modal.querySelector('.favourites-list');
  favoriteList.classList.remove('favourites-list_opened');
}

export const modalAddressHandler = async (event, id) => {
  const modal = event.target.closest('.modal_id_event-full');
  const modalContainer = modal.querySelector('.catalog__events-container_type_grid').querySelector('.cards_type_grid');
  const catalogGridContainer = document.querySelector('.cards_type_grid');
  const modalId = modal.dataset.id;
  const favoriteList = modal.querySelector('.favourites-list');
  const cardTemplate = catalogGridContainer.querySelector('#card').content;

  const cards = await getCardById(modalId);
  const cardCount = cards.cards[0].location.length - 1;
  const preparedCards = prepareCard(cards, cardTemplate, 'address');
  addCard(preparedCards, modalContainer, 'count', cardCount);
  favoriteList.classList.add('favourites-list_opened');
}

const modalCopyHandler = (event) => {
  const modal = event.target.closest('.modal_id_event-full');
  const modalId = modal.dataset.id;
  const currentLocation = `${window.location.href}?event=${modalId}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(currentLocation).then(r => 'Текст скопирован').catch(e => console.error(e.message));
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
  const modalButtonSpan = modalButton.querySelector('.button__icon');

  switch (state) {
    case true:
      modalButtonSpan.classList.remove('icon-heart')
      modalButtonSpan.classList.add('card-control__icon_color_red', 'icon-heart-filled')
      return `${modalButtonSpan.outerHTML}хочу пойти`;
    case false:
      modalButtonSpan.classList.add('icon-heart')
      modalButtonSpan.classList.remove('card-control__icon_color_red', 'icon-heart-filled')
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
  cardElement.dataset.type = item.type;
  cardElement.dataset.coordinates = location.coordinates;
  cardElement.querySelector('.cards__item-img').src = item.image;
  cardElement.querySelector('.cards__item-img').alt = item.type;
  cardElement.querySelector('#cards__item-type').textContent = item.type;
  cardElement.querySelector('#cards__item-date').textContent = `${date}, ${item.timeDuration}`;
  cardElement.querySelector('.cards__item-title').textContent = item.name;
  cardElement.querySelector('.cards__item-description').textContent = item.description;
  cardElement.querySelector('#cards__item-address').textContent = location.address;
  cardElement.querySelector('#cards__item-count').textContent = `+ еще ${item.location.length}`;

  return cardElement;
}

const createAddressCard = (item, cardTemplate, location) => {
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
  cardElement.dataset.type = item.type;
  cardElement.dataset.coordinates = location.coordinates;
  cardElement.querySelector('.cards__item-img').src = item.image;
  cardElement.querySelector('.cards__item-img').alt = item.type;
  cardElement.querySelector('#cards__item-type').textContent = item.type;
  cardElement.querySelector('#cards__item-date').textContent = `${date}, ${item.timeDuration}`;
  cardElement.querySelector('.cards__item-title').textContent = item.name;
  cardElement.querySelector('.cards__item-description').textContent = item.description;
  cardElement.querySelector('#cards__item-address').textContent = location.address;

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
  if (target.classList.contains('cards_type_grid')) {
    return null;
  }
  const cardId = event.target.closest('.cards__item').dataset.id;
  const classList = Array.from(target.classList).join(' ');
  const likeRegex = /card-control/g;
  let card = null;
  if (document.querySelector('.page_id_index') || document.querySelector('.page_id_404') || document.querySelector('.page_id_thanks-for-application') || document.querySelector('.page_id_thanks-for-support')) {
    if (classList.match(likeRegex)) {
      card = target.closest('.cards__item');
      return addLikeToStorage(card);
    }
    return window.location.href = 'http://localhost:8080/catalog.html?event=' + cardId;
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

catalogRedirectController();


// установка слушателя на кнопку "купить билет" для открытия модалки покупки (скрипт открытия модалок напишет Андрей)

// копирование ссылки внутри модалки с описанием мероприятия

// переход к просмотру "еще адресов" и рендер соответствующих карточек (верстку соберу к вечеру 30.08)


// Никита -> end!

//-------------------------------------------------------------------------


// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// для фильтрации карточки берутся из local Storage, кладутся туда сразу при получении с сервера при первой отрисовке
export const addCardsToLocalStorage = ({cards}) => {
  if (!hasKeyInStorage('cards')) {
    localStorage.setItem('cards', JSON.stringify([]));
  }

    localStorage.setItem('cards', JSON.stringify(Array.from(cards)));
}

export const getCardsFromLocaleStorage = () => {
  return getStorageValueByKey('cards');
}


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
