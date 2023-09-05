import { getFilteredCards } from './filters.js'
import { arrayValues, logError } from './utils.js'
import { getCardsFromLocaleStorage, modalAddressHandler } from "./event.js"
import { openModal, closeModal } from './modal.js';
import {modalController} from "./catalog";

// здесь храниться объект карты
let myMap;
export const defaultMapZoom = 11;


// отдельная геоколлекция для геоданных из карточек
let myGeoCollection;
// кластеризатор
let myClusterer;

// =============================
// map
function initMap(mapContainer) {
  // Создание карты.
  myMap = new ymaps.Map(mapContainer.querySelector('.catalog__map-container'), {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.76, 37.64],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: defaultMapZoom
  });
  initMapContent();
  myMap.container.fitToViewport();
  addEventGeoObjects();
  // return myMap;
}

const initMapContent= () => {
  updateCity();
  initGeoEventsOnMap();
}

export const moveMapNode = (selectorFrom, selectorTo) => {
  selectorTo.append(selectorFrom);
  showMap();
}

// Преобразуем координаты курсора мыши в геокоординаты
const coordPageToGlobal = (coords) => {
  const projection = myMap.options.get('projection');
  return projection.fromGlobalPixels(
    myMap.converter.pageToGlobal(coords), myMap.getZoom()
    ).join(', ');
}

// Преобразуем географические координаты в пиксели окна браузера
const coordGlobalToPage = (coords) => {
  const projection = myMap.options.get('projection');
  return myMap.converter.globalToPage(
    projection.toGlobalPixels(coords, myMap.getZoom()));
}

//
const handleButtonCustomBalloon = (evt, id, modalSelector) => {
  closeModal(modalSelector);
  modalSelector.remove();
  // Здесь надо вызвать модалку с передачей ей id карточки --> modal.....Handler(evt, id);
  const modalTemplate = document.querySelector('#modal_id_event-full').content;
  modalController(id, modalTemplate);
}
//
const openCustomBalloon = (object, position) => {
  const mapModal = document.querySelector('#map-modal').content;
  const mapModalTemplate = mapModal.querySelector('.modal_id_event-mobile-preview').cloneNode(true);
  const page = document.querySelector('.page_id_catalog');
  let left = position[0];
  let top = position[1];
  console.log(position);

  // const modalSelector = document.querySelector('.modal_id_event-mobile-preview');
  const modalContainer = mapModalTemplate.querySelector('.modal__container');

  const sidebar = document.querySelector('.catalog__section_type_grow');
  const sidebarWidth = sidebar.clientWidth;
  const mobileWidth = 767; // точка перехода с мобайл на десктоп

  const htmlContainer = myMap.container.getParentElement();

  const htmlContainerlWidth = htmlContainer.clientWidth;
  const htmlContainerHeight = htmlContainer.clientHeight;

  const modalWidth = modalContainer.scrollWidth;
  const modalHeight = modalContainer.scrollHeight;

  if ((left + modalWidth) > htmlContainerlWidth + sidebarWidth) {
    left -= modalWidth;
  }
  if ((top + modalHeight) > htmlContainerHeight) {
    top -= modalHeight;
  }

  if (htmlContainerlWidth + sidebarWidth > mobileWidth) {
    modalContainer.style.position = "absolute";
    modalContainer.style.top = `${top}px`;
    modalContainer.style.left = `${left}px`;
  }

  const type = modalContainer.querySelector(".preview_id_type");
  const title = modalContainer.querySelector(".preview__title");
  const desc = modalContainer.querySelector(".preview__description");
  const address = modalContainer.querySelector(".preview_id_address");
  const addressPlus = modalContainer.querySelector(".preview_id_address-plus");

  let geoObject = {};
  if (object.options.getName() === 'cluster') {
    const geoObjects = object.getGeoObjects();
    geoObject = geoObjects[0];
  } else {
    geoObject = object;
  }
  const geoData = Object.values(geoObject.properties.get("data"));

  type.textContent = geoData[1].type;
  title.textContent = geoData[2].title;
  desc.textContent = geoData[3].desc;
  address.textContent = geoData[5].addressPlus[0].address;
  const addresses = geoData[5].addressPlus.length-1;
  addressPlus.textContent = `+ ещё ${addresses > 0 ? addresses : '' }`;

  const button = modalContainer.querySelector(".button");

  button.addEventListener('click', evt => handleButtonCustomBalloon(evt, geoData[0].id, mapModalTemplate));

  page.append(mapModalTemplate);
  openModal(mapModalTemplate);
}
//
function addEventGeoObjects() {
  myMap.geoObjects.events.add('click', function (e) {
    // Получение ссылки на дочерний объект, на котором произошло событие.
    var object = e.get('target');
    // Получение позиции дочернего объекта, на котором произошло событие.
    const position = e.get('domEvent').get('position');
    openCustomBalloon(object, position);
  });
}

// рендер карты в контейнере
// в первый раз - создаем карту (создаем её "ленивым подходом", асинхронно)
export const createMap = async (mapContainer) => {
  if (!myMap) ymaps.ready(initMap(mapContainer));
}

// в последующие - просто обновляем её отображение
export const showMap = () => {
  if (myMap) {
    myMap.container.fitToViewport();
  }
  else {
    logError('объект карты не существует!');
  }
}
export const updateMap = () => {
    if (myMap) {
      updateCity();
      showMap();
    } else {
      logError('объект карты не существует!');
    }
}

//==============================
// нас пнули из хедера, обновился город
// через слушатель, если карта существует уже, то обновляем карту
export function updateCityOnMap() {
  if (myMap) updateCity();
  else logError('объект карты не существует!');
}

const getCoordSelectedCity = () => {
  const selectedCity = localStorage.getItem('city');
  return getCoordsByName(selectedCity);
}
// установка карты на выбранный город
const updateCity = async () => {
  setCenterZoomMap(await getCoordSelectedCity(), defaultMapZoom);
  showMap();
}
// =============================

// Получение геоинформации из апи карты по названию
const getGeoByName = (name) => {
  return ymaps.geocode(name, {result: 1});
}

// Запрос координат в апи карты по названию
const getCoordsByName = async (selectedCity) => {
  const res = await getGeoByName(selectedCity);

  // Выбираем первый результат геокодирования.
  const firstGeoObject = res.geoObjects.get(0);

  // Координаты геообъекта.
  return firstGeoObject.geometry.getCoordinates();
}

// установка центра карты по указанным координатам
const setCenterMap = async (coords) => {
  await myMap.setCenter(coords);
}
// установка центра карты по указанным координатам и зуму
const setCenterZoomMap = async (coords, zoom) => {
  await myMap.setCenter(coords, zoom);
}

// ====================================
//
const typeToIcon = {
  'разное': require('../images/icons/event/event-icon-other.svg'),
  'лекции': require('../images/icons/event/event-icon-workshop-lectures.svg'),
  'мастер-классы': require('../images/icons/event/event-icon-workshop-lectures.svg'),
  'кофе': require('../images/icons/event/event-icon-coffee.svg'),
  'музеи': require('../images/icons/event/event-icon-museum-tour.svg'),
  'экскурсии': require('../images/icons/event/event-icon-museum-tour.svg'),
  'доставка': require('../images/icons/event/event-icon-other.svg'),
  'магазины': require('../images/icons/event/event-icon-shop.svg')
}

// формируем массив объектов с геоинфо и из данных карточек
const getGeoObjsFromCards = (cards) => {
  const infoGeoObjs = [];

  cards.forEach(card => {
    // console.log(card);
    card.location.forEach( l => {
      const coord = l.coordinates.split(', ');
      const infoGeoObj = {
        balloonContent: String,
        balloonContentBody: String,
        clusterCaption: String,

        iconLayout: 'default#image',
        iconImageHref: String,
        icon_imagesize: [36, 36],
        iconImageOffset: [0, 0],

        id: card.id,
        type: card.type,
        name: card.name,
        date: card.date,
        timeDuration: card.timeDuration ,
        coords: [],
        location: card.location
      }

      if (card.type in typeToIcon) {
        infoGeoObj.iconImageHref = typeToIcon[card.type];
      }
      else {
        infoGeoObj.iconImageHref = typeToIcon['разное'];
      }
      infoGeoObj.balloonContent = card.type;
      infoGeoObj.balloonContentBody = `${card.id}<br>${card.name}<br>${card.date}<br>${card.timeDuration}`;
      infoGeoObj.clusterCaption = card.type;

      infoGeoObj.coords = coord;

      infoGeoObjs.push(infoGeoObj);

    });

  });

  return infoGeoObjs;
}

// готовим и добавляем геоинфо из геоинфообъекта в (кластеризатор или геоколлекцию)
const addInfoGeoObjToCollectioner = (infoGeoObj, collection) => {
  const balloonProp = {
    // balloonContent: infoGeoObj.balloonContent,
    // balloonContentBody: infoGeoObj.balloonContentBody,
    // clusterCaption: infoGeoObj.clusterCaption
  };
  const placemarkProp = {
    iconLayout: infoGeoObj.iconLayout,
    iconImageHref: infoGeoObj.iconImageHref,
    icon_imagesize: infoGeoObj.icon_imagesize,
    iconImageOffset: infoGeoObj.iconImageOffset
  };

  const myPlaceMark = new ymaps.Placemark(infoGeoObj.coords, balloonProp, placemarkProp);

  myPlaceMark.properties.set({
    data: [
      { id: infoGeoObj.id },
      { type: infoGeoObj.type },
      { title: infoGeoObj.name },
      { desc: `${infoGeoObj.date}, ${infoGeoObj.timeDuration}` },
      { address: infoGeoObj.coords },
      { addressPlus: infoGeoObj.location },
    ]
  });
  myPlaceMark.options.set({}, {}, { hideIconOnBalloonOpen: false,  openBalloonOnClick: false });

  collection.add(myPlaceMark);
}

// добавление коллекции (кластеризатора или геоколлекции) на карту
function addCollectionToMap(collection, map) {
  map.geoObjects.add(collection);
}

// добавление геоданных из карточек на карту
const addCardsInfoToMap = (cards, collection) => {
  const infoGeoObjs = getGeoObjsFromCards(cards);
  infoGeoObjs.forEach(infoGeoObj => {
    addInfoGeoObjToCollectioner(infoGeoObj, collection);
  });
  addCollectionToMap(collection, myMap);
}

// первичное добавление геоданных из всех карточек на карту
const initGeoEventsOnMap = () => {
  const cards = getCardsFromLocaleStorage();
  //myGeoCollection = createGeoCollection();
  myClusterer = createClusterer();
  //addCardsInfoToMap(cards, myGeoCollection);
  addCardsInfoToMap(cards, myClusterer);
};

// получаем набор отфильтрованных карточек и делаем рендеринг
export const renderMapController =  (activeTags) => {
  const filteredCards = getFilteredCards(activeTags);
  const cards = arrayValues(Object.values(filteredCards));

  //clearCollectioner(myGeoCollection);
  clearCollectioner(myClusterer);
  addCardsInfoToMap(cards, myClusterer);
}

// =================================

// очистка геоколлекции
function clearCollectioner(collection) {
  collection.removeAll();
}
// создаем объект своей геоколлекции
const createGeoCollection = () => {
  return  new ymaps.GeoObjectCollection({}, {
    // preset: 'islands#redCircleIcon', //все метки красные
    draggable: false, // и их не можно перемещать
    // strokeWidth: 4
  });
}
// создаем объект своего кластеризатора
const createClusterer = () => {
  const clusterIcons = [{
      href: require('./../images/icons/event/event-icon-zoom.svg'),
      size: [36, 36],
    // Отступ, чтобы центр картинки совпадал с центром кластера.
    offset: [-18, -18]
    }];
    return new ymaps.Clusterer( { clusterIcons: clusterIcons,
                                  clusterHideIconOnBalloonOpen:false,
                                  clusterDisableClickZoom:true,
                                  clusterOpenBalloonOnClick:false
                                } );
}

// ==================

