import {getCards, getCardById} from './api';
import {prepareCard, modalCreate, modalHandler, addCard, removeCards, addCardsToLocalStorage, getCardsFromLocaleStorage} from './event';
import { modalFilters, tabSwitcher, mapContainer, listContainer } from './constants.js';
import { openModal } from './modal.js';
import { createMap,showMap } from './map.js'
import { setFiltersEventListener } from './filters.js'
import { arrayValues } from './utils.js'

// ФУНКЦИОНАЛ СТРАНИЦЫ "КАТАЛОГ"

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.


// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Контроллер каталого секции cards_type_grid, сначала берет все карты, а потом передает их на рендер
export const catalogController = async (section, template) => {
  // Dmitry
  // инициализация контейнера список\карта и установка слушателя свитча табов
  initEventsContainer();
  setTabSwitchEventListener();
  // Dmitry -> end!
  const cards = await getCards();
  // Dmitry
  // сохраняем все карточки сразу при первой отрисовке в local Storage
  // вешаем на все кнопки таг фильтров слушателей, которые вызывают универсалный контроллер фильтрации
  addCardsToLocalStorage(cards);
  createMap();
  setFiltersEventListener();
  // Dmitry -> end!
  const preparedCards = prepareCard(cards, template);
  return addCard(preparedCards, section);
}

// Dmitry

// дергаем эту функцию как только обработали кнопки фильтрации для перерисовки карточек
export const renderCatalog = (section, template, filteredCards) => {
  removeCards(section);
  const cards = arrayValues(Object.values(filteredCards));
  const preparedCards = prepareCard({cards}, template);
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
  return addCard(preparedCards, section);
}

// Никита -> end!

// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// положение таба на переключателе
let isMap = false;

// переключение контейнера карта\список, если карта то актуализируем её
const handleTabEvent = (evt) => {
  evt.preventDefault();

  //переключаем табы на переключателе
  toggleTabSwitcher(evt);

  // переключаем отображение в контейнере карта\список
  if (!isMap) {
    isMap = true;
    mapContainer.classList.add('catalog__events-container_opened');
    listContainer.classList.remove('catalog__events-container_opened');

    showMap();

  } else {
      isMap = false;
      mapContainer.classList.remove('catalog__events-container_opened');
      listContainer.classList.add('catalog__events-container_opened');
    }
}

// переключение свитча табов
const toggleTabSwitcher = (evt) => {
  /* может сделать через перебор элементов свитча и в зависимости от актив вешать или нет*/
  evt.target.classList.add('tab-switcher__button_active');
  evt.target.removeEventListener('click', handleTabEvent);

  if (evt.target.nextElementSibling != null) {
    evt.target.nextElementSibling.classList.remove('tab-switcher__button_active');
    evt.target.nextElementSibling.addEventListener('click', handleTabEvent);
  } else {
    evt.target.previousElementSibling.classList.remove('tab-switcher__button_active');
    evt.target.previousElementSibling.addEventListener('click', handleTabEvent);
  }
}

// начальное состояние контейнера при попадании на каталог
function initEventsContainer() {
  mapContainer.classList.remove('catalog__events-container_opened');
  listContainer.classList.add('catalog__events-container_opened');
}

// слушатель свитча табов
function setTabSwitchEventListener() {
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

export  function setCatalogEventListener() {
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
