import {getCards, getCardById} from './api';
import {prepareCard, modalCreate, modalHandler, addCard} from './event';
import {tabSwitcher, mapContainer, listContainer} from './constants';

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
  const preparedCards = prepareCard(cards, template);
  return addCard(preparedCards, section);
}

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

let isMap = false;
// здесь храниться объект карты
let myMap;

//==============================
// нас пнули из хедера, обновился город
// через слушатель, если карта существует уже, то обновляем карту
export function updateCityOnMap() {
  if (myMap) updateCity();
}

// обновление карты на новый город
const updateCity = () => {
  const selectedCity = localStorage.getItem('city');
  updateCoordsOnMap(selectedCity);
}
// =============================

// =============================
// map

const defaultMapZoom = 11;

const initMap = () => {
      // Создание карты.
      return new ymaps.Map(mapContainer.querySelector('.catalog__map-container'), {
          // Координаты центра карты.
          // Порядок по умолчанию: «широта, долгота».
          // Чтобы не определять координаты центра карты вручную,
          // воспользуйтесь инструментом Определение координат.
          center: [55.76, 37.64],
          // Уровень масштабирования. Допустимые значения:
          // от 0 (весь мир) до 19.
          zoom: defaultMapZoom
      });
}

// рендер карты в контейнере
// в первый раз - создаем карту (создаем её "ленивым подходом", асинхронно)
// в последующие - просто обновляем её отображение
const showMap = () => {
    //console.log(mapContainer.querySelector('.catalog__map-container'));
    if (myMap) {
      myMap.container.fitToViewport();
    } else {
      myMap = initMap();
      ymaps.ready(myMap);
      updateCity();
    }
    //console.log(myMap);
}

// Запрос координат в апи карты по имени
const getGeoByName = (name) => {
  return ymaps.geocode(name, {result: 1});
}

// установка карты на выбранный город
const updateCoordsOnMap = async (selectedCity) => {
  const res = await getGeoByName(selectedCity);
    // Выбираем первый результат геокодирования.
  const firstGeoObject = res.geoObjects.get(0);
  // Координаты геообъекта.
  myMap.setCenter(firstGeoObject.geometry.getCoordinates(), defaultMapZoom);
}
// =================================

// переключение контейнера карта\список, если карта то актуализируем её
const handleTabEvent = (evt) => {
    evt.preventDefault();
    toggleTabSwitcher(evt);
    if (!isMap) {
      isMap = true;
      mapContainer.classList.add('catalog__events-container_opened');
      listContainer.classList.remove('catalog__events-container_opened');
      showMap();
      // теперь пинают карту из хедера headerCitySelector.addEventListener('click', updateCity);
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

// работа фильтров
// также нужны скрипты и слушатели на кнопки в секции с карточками на главной странице (это связано, поэтому написал тут)

// инициализация яндекс карты при клике на нужный таб и все скрипты по теме карты
// (скрипты открытия модалок напишет Андрей в modal.js)

// Открытие модалки с кратким описанием мероприятия (поверх карты)

// расчет общего числа мероприятий в вывод в шапку блока

// установка слушателя открытия модалки с фильтрами поиска по каталогу в мобильной версии
// (скрипт открытия модалок пишет Андрей, поэтому пока в колбек временное название-заглушку openModalMobileFilters)


// Дмитрий -> end!


//-------------------------------------------------------------------------


// Андрей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Андрей -> end!

// Алексей - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Алексей -> end!

// Георгий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Георгий -> end!

// Евгений - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// Евгений -> end!

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
