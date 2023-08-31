import {getCards, getCardById} from './api';
import {prepareCard, modalCreate, modalHandler} from './event';
import {tabSwitcher, mapContainer, listContainer} from './constants';

// ФУНКЦИОНАЛ СТРАНИЦЫ "КАТАЛОГ"

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.


// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const catalogController = async () => {
  // Dmitry
  initEventsContainer();
  setTabSwitchEventListener();
  // Dmitry -> end!
  const cards = await getCards();
  prepareCard(cards);
}

// получение (нужен запрос к API в api.js) и вставка карточек мероприятий в грид (рендер - в events.js)

// Открытие модалки с полным описанием мероприятия
export const modalController = async (id) => {
  const card = await getCardById(id);
  const preparedModal = modalCreate(card);
  modalHandler(preparedModal, 'open');
}


// Никита -> end!

// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// переключение табов
let isMap = false;
let myMap;
let selectedCity;

//==============================
// получаем текст выбранного option (город) из селектора в хедере
// через слушатель и обновляем карту

const headerCitySelector = document.querySelector('.header__city-select');

const getCity = () => {
  selectedCity = headerCitySelector.selectedOptions[0].textContent;
  updateCoordsOnMap(selectedCity);
}

// слушателя вешаем при первом показе карты
// headerCitySelector.addEventListener('change', getCity);
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

//export const catalogController = async () => {
const showMap = () => {
    console.log(mapContainer.querySelector('.catalog__map-container'));
    if (myMap) {
      myMap.container.fitToViewport();
    } else {
      myMap = initMap();
      ymaps.ready(myMap);
      getCity();
    }
    console.log(myMap);
}

const getGeoByName = (name) => {
  // Поиск координат
  return ymaps.geocode(name, {result: 1});
}

const updateCoordsOnMap = async (selectedCity) => {
  const res = await getGeoByName(selectedCity);
    // Выбираем первый результат геокодирования.
  const firstGeoObject = res.geoObjects.get(0);
  // Координаты геообъекта.
  myMap.setCenter(firstGeoObject.geometry.getCoordinates(), defaultMapZoom);
}
// =================================

const handleTabEvent = (evt) => {
    evt.preventDefault();
    toggleTabSwitcher(evt);
    if (!isMap) {
      isMap = true;
      // mapContainer.style.display = 'flex';
      // listContainer.style.display = 'none';
      mapContainer.classList.add('catalog__events-container_opened');
      listContainer.classList.remove('catalog__events-container_opened');
      showMap();
      headerCitySelector.addEventListener('change', getCity);
    } else {
      isMap = false;
      // mapContainer.style.display = 'none';
      // listContainer.style.display = 'grid';
      mapContainer.classList.remove('catalog__events-container_opened');
      listContainer.classList.add('catalog__events-container_opened');
    }
}

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

function initEventsContainer() {
  mapContainer.classList.remove('catalog__events-container_opened');
  listContainer.classList.add('catalog__events-container_opened');
}

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
