import { getFilteredCards } from './filters.js'
import { arrayValues, logError } from './utils.js'
import { getCardsFromLocaleStorage } from "./event.js"
import { mapContainer } from './constants.js'

// здесь храниться объект карты
let myMap;
export const defaultMapZoom = 11;


// отдельная геоколлекция для геоданных из карточек
let myGeoCollection;
// кластеризатор
let myClusterer;

// =============================
// map
const initMap = () => {
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
  return myMap;
}

const initMapContent= () => {
  updateCity();
  initGeoEventsOnMap();
}

// рендер карты в контейнере
// в первый раз - создаем карту (создаем её "ленивым подходом", асинхронно)
export const createMap = async () => {
  // myMap = initMap();
  // ymaps.ready(myMap);
  // ymaps.ready(initMap);
  myMap = await initMap();
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
  setCenterMap(await getCoordSelectedCity());
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
  await myMap.setCenter(coords, defaultMapZoom);
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

        // id: String,
        // type: String,
        // tags: String,
        //location: [],
        // date: String,
        // city: String,
        // name: String,
        // timeDuration: String,
        // duration: String,
        // description: String
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

        location: [],
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

      infoGeoObj.location = coord;

      infoGeoObjs.push(infoGeoObj);
    });

  });

  return infoGeoObjs;
}

// готовим и добавляем геоинфо из геоинфообъекта в (кластеризатор или геоколлекцию)
const addInfoGeoObjToCollectioner = (infoGeoObj, collection) => {
  const balloonProp = {
    balloonContent: infoGeoObj.balloonContent,
    balloonContentBody: infoGeoObj.balloonContentBody,
    clusterCaption: infoGeoObj.clusterCaption
  };
  const placemarkProp = {
    iconLayout: infoGeoObj.iconLayout,
    iconImageHref: infoGeoObj.iconImageHref,
    icon_imagesize: infoGeoObj.icon_imagesize,
    iconImageOffset: infoGeoObj.iconImageOffset
  };
  collection.add(new ymaps.Placemark(infoGeoObj.location, balloonProp, placemarkProp));
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
    return new ymaps.Clusterer( { clusterIcons: clusterIcons } );
}
