import {getCards, getCardById} from './api';
import {
  prepareCard,
  modalCreate,
  modalHandler,
  addCard,
  removeCards,
  addCardsToLocalStorage,
  getEventsListFromCards
} from './event';
import { modalFilters, tabSwitcher, mapContainer, eventsList } from './constants.js';
import { openModal } from './modal.js';
import { createMap, showMap, disableMapClicks, enableMapClicks } from './map.js'
import { setFiltersEventListener, deactivateFavorite } from './filters.js'

// ФУНКЦИОНАЛ СТРАНИЦЫ "КАТАЛОГ"

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.

// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Контроллер каталого секции cards_type_grid, сначала берет все карты, а потом передает их на рендер
export const catalogController = async (section, template) => {
  // Dmitry
  // инициализация контейнера список\карта и установка слушателя свитча табов
  initEventsContainer(tabSwitcher);
  setTabSwitchEventListener(tabSwitcher);
  // Dmitry -> end!
  const cards = await getCards();
  // Dmitry
  // получаем список событий из карточек в eventsList
  getEventsListFromCards(cards, eventsList);
  // по нему инициализируем кнопки фильтров Тип события
  //todo? -> initEventsFilterButtons(eventsList);
  // сохраняем все карточки сразу при первой отрисовке в local Storage
  // вешаем на все кнопки таг фильтров слушателей, которые вызывают универсалный контроллер фильтрации
  addCardsToLocalStorage(cards);
  createMap(mapContainer);
  setFiltersEventListener();
  // Dmitry -> end!
  const preparedCards = prepareCard(cards, template);
  return addCard(preparedCards, section);
}

// Dmitry

// дергаем эту функцию как только обработали кнопки фильтрации для перерисовки карточек
export const renderCatalog = (section, template, filteredCards) => {
  removeCards(section);
  const preparedCards = prepareCard({cards: filteredCards}, template);
  return addCard(preparedCards, section);
}
// Dmitry -> end!

// получение (нужен запрос к API в api.js) и вставка карточек мероприятий в грид (рендер - в events.js)

// Открытие модалки с полным описанием мероприятия

// Контроллер открывания модалки, который вызывается в момент клика по карточке в секции CARDS, в нее передается ID кликнутой карточки
// Затем идет запрос на получение всех данных с API именно этой карточки, затем мы получаем нужный формат модального окна со всеми нужными данными в переменную preparedModal
// Затем мы передаем preparedModal в modalHandler c type open, внутри modalHandler эта карточка добавляется в секции на странице и открывается
export const modalController = async (id, template) => {
  const card = await getCardById(id);
  const preparedModal = modalCreate(card, template);
  modalHandler(preparedModal, 'open');
}

export const generalCardController = async (section, template) => {
  const cards = await getCards();
  const preparedCards = prepareCard(cards, template);
  const cardsFiltered = getCardsByCount(preparedCards, 5);
  return addCard(cardsFiltered, section);
}

const getCardsByCount = (cards, count) => {
  const cardsByCount = [];

  for (let i = 0; i < count; i ++) {
    cardsByCount.push(cards[i]);
  }

  return cardsByCount;
}

// Никита -> end!

// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// переключаем отображение в контейнере карта\список
const toggleContainerView = (target) => {
  const mapContainer = target.querySelector('.catalog__events-container_type_map');
  const listContainer = target.querySelector('.catalog__events-container_type_grid');

  if (listContainer.classList.contains('catalog__events-container_opened')) {
    mapContainer.classList.add('catalog__events-container_opened');
    listContainer.classList.remove('catalog__events-container_opened');
    showMap();
    enableMapClicks(mapContainer);
  } else {
    mapContainer.classList.remove('catalog__events-container_opened');
    listContainer.classList.add('catalog__events-container_opened');
    disableMapClicks(mapContainer);
  }
}
//
export const setDefaultContainerView = (target) => {
  const mapContainer = target.querySelector('.catalog__events-container_type_map');
  const listContainer = target.querySelector('.catalog__events-container_type_grid');
  mapContainer.classList.remove('catalog__events-container_opened');
  listContainer.classList.add('catalog__events-container_opened');
  disableMapClicks(mapContainer);
}
//
export const showNoLikesPage = (target) => {
  const mapContainer = target.querySelector('.catalog__events-container_type_map');
  const listContainer = target.querySelector('.catalog__events-container_type_grid');
  const noLikesContainer = target.querySelector('.catalog__events-container_type_no-events')

  mapContainer.classList.remove('catalog__events-container_opened');
  listContainer.classList.remove('catalog__events-container_opened');
  noLikesContainer.classList.add('catalog__events-container_opened');

  disableMapClicks(mapContainer);
}
// переключение контейнера карта\список, если карта то актуализируем её
const handleTabEvent = (evt) => {
  evt.preventDefault();

  const target = evt.target.closest('.catalog__content') || evt.target.closest('.favourites-list');
  const noLikesContainer = document.querySelector('.catalog__events-container_type_no-events')
  const inModal = target.classList.contains('favourites-list');

  //переключаем табы на переключателе
  toggleTabSwitcher(evt);

  if (!noLikesContainer.classList.contains('catalog__events-container_opened')) {
    if (!inModal) {
      noLikesContainer.classList.remove('catalog__events-container_opened');
    }
    toggleContainerView(target);
  }
}

// переключение свитча табов
const toggleTabSwitcher = (evt) => {
  const buttonList = evt.target.closest('.tab-switcher').querySelectorAll('.tab-switcher__button');

  buttonList.forEach(button => {
    if (button.classList.contains('tab-switcher__button_active')) {
      button.classList.remove('tab-switcher__button_active');
      button.addEventListener('click', handleTabEvent);
    } else {
      button.removeEventListener('click', handleTabEvent);
      button.classList.add('tab-switcher__button_active');
    }
  });
}

const setDefaultTabSwitcher = (target) => {
  const buttonList = target.querySelectorAll('.tab-switcher__button');
  buttonList.forEach(button => {
    if (button.textContent === 'список') {
      button.removeEventListener('click', handleTabEvent);
      button.classList.add('tab-switcher__button_active');
    } else {
      button.classList.remove('tab-switcher__button_active');
      button.addEventListener('click', handleTabEvent);
    }
  });
}

export const renderEventsContainer = (tabSwitcher) => {
  const target = tabSwitcher.closest('.catalog__content') || tabSwitcher.closest('.favourites-list');
  const inModal = target.classList.contains('favourites-list');

  if (!inModal) {
    const noLikesContainer = target.querySelector('.catalog__events-container_type_no-events')
    noLikesContainer.classList.remove('catalog__events-container_opened');
  }
  setDefaultContainerView(target);
  setDefaultTabSwitcher(target);
}

// начальное состояние контейнера при попадании на каталог или в модалку (определяет табСвитчер)
export const initEventsContainer = (tabSwitcher) => {
  const target = tabSwitcher.closest('.catalog__content') || tabSwitcher.closest('.favourites-list');
  const inModal = target.classList.contains('favourites-list');

  if (!inModal) {
    const noLikesContainer = target.querySelector('.catalog__events-container_type_no-events')
    noLikesContainer.classList.remove('catalog__events-container_opened');

    const buttonViewAll = noLikesContainer.querySelector('.additional-section__button');
    buttonViewAll.addEventListener('click', deactivateFavorite);
  }

  setDefaultContainerView(target);
  setDefaultTabSwitcher(target);
}

// слушатель свитча табов
export const setTabSwitchEventListener = (tabSwitcher) => {
  const buttonList = Array.from(tabSwitcher.querySelectorAll('.tab-switcher__button'));
  buttonList.forEach((button) => {
      if (!button.matches('.tab-switcher__button_active')) {
        button.addEventListener('click', handleTabEvent);
      }
    });
  }

// инициализация яндекс карты при клике на нужный таб и все скрипты по теме карты
// (скрипты открытия модалок напишет Андрей в modal.js)

// Открытие модалки с кратким описанием мероприятия (поверх карты)

// расчет общего числа мероприятий в вывод в шапку блока

// установка слушателя открытия модалки с фильтрами поиска по каталогу в мобильной версии
// (скрипт открытия модалок пишет Андрей, поэтому пока в колбек временное название-заглушку openModalMobileFilters)


// Дмитрий -> end!


//-------------------------------------------------------------------------


// Андрей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const catalogFiltersButton = document.querySelector('.catalog__mob-filters-button');

export function setCatalogEventListener() {
  catalogFiltersButton.addEventListener('click', () => {
    openModal(modalFilters);
  });
}


// Андрей -> end!

// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Алексей -> end!

// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
