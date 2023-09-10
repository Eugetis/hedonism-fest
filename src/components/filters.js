import { renderCatalog, showNoLikesPage } from './catalog'
import { getCardsFromLocaleStorage, modalFavoriteController, getFavoriteEvents } from './event.js'
import { renderMapController } from './map.js'
import { eventDate } from './constants.js'
import { getCards } from './api.js'

// ========================
// работа фильтров
// также нужны скрипты и слушатели на кнопки в секции с карточками на главной странице (это связано, поэтому написал тут)
// let filteredCards = {};

// функция возвращает набор массивов карточек разложенных по категориям
const categorizeCards = (cards) => {
  const arrangedCards = {};
  cards.forEach(card => {
    arrangedCards[card.type] = card;
  });
  return arrangedCards;
}

const getFavoriteCards = async (activeTags) => {
  if (Array.from(activeTags.eventTags).includes('хочу пойти')) {
    const events = await getFavoriteEvents();
    return categorizeCards(events.cards);
  }
}
// функция делающая отфильтрованные карточки, вызывается контроллером таг фильтров после обработки нажатия на кнопку фильтра
export const getFilteredCards = async (activeTags) => {
  const cards = getCardsFromLocaleStorage();
  const keys = activeTags.keys();

  //eventDate

  let filteredCardsByDay = {};
  let filteredCards = {};

  activeTags['dayTags'].forEach(day => {
    let res = {};
    if (day.localeCompare('все') === 0) {
      res = cards;
    } else {
      res = cards.filter(card => {
        const dateContent = card.date.split(' ');
        const date = `${dateContent[0].padStart(2,'0')} ${dateContent[1].substring(0, 3)}.`
        const dayContent = day.split(', ');
        return dayContent.includes(date);
      });
    }
    console.log(res);
    if (res.length) {
      filteredCardsByDay = res;
    }
    return res;
  })

  activeTags['eventTags'].forEach(event => {
    let res = {};
    if (event.localeCompare('все') === 0) {
      res = filteredCardsByDay;
    } else {
      res = filteredCardsByDay.filter(card => {
        return event.includes(card.type)
      });
    }
    console.log(res);
    if (res.length) {
      filteredCards[event] = res;
    }
    return res;
  })
  console.log(filteredCards);
  return filteredCards;
}

const activeTags = [];
// todo?
// инициализация тагов кнопок в группе фильтров тип события в верстке
// исходя из категорий в карточках
// export const initEventsFilterButtons = (eventsList) => {

//   if (document.querySelector('.page_id_catalog')) {
//     const filtersGroups = document.querySelectorAll('.catalog__filters-group');
//     // перебираем все секции груп фильтров (2 десктопные и 2 мобильные)
//     filtersGroups.forEach(filtersGroup  => {
//       // достаем кнопки фильтров в конкретной группе
//       const subtitle = filtersGroup.closest('.catalog__section').querySelector('.catalog__subtitle');
//       if (subtitle === 'eventTags') {

//       }
//     });
//   }
// }
// инициализация слушателей кнопок таг фильтров
export const setFiltersEventListener = () => {
  if (document.querySelector('.page_id_catalog')) {
    const filtersGroups = document.querySelectorAll('.catalog__filters-group');

    // перебебираем все секции груп фильтров (2 десктопные и 2 мобильные)
    filtersGroups.forEach(filtersGroup  => {
      // достаем кнопки фильтров в конкретной группе
      const subtitle = filtersGroup.closest('.catalog__section').querySelector('.catalog__subtitle');
      const filterButtons = filtersGroup.querySelectorAll('.tag-filter')
      const filterButtonsList = Array.from(filterButtons);

      // вешаем слушатели на каждую кнопку, функция-обработчик для всех общая,
      // в обработчик контекстом передаем массив сетов, в каждом сете будем хранить активные таги группы
      // ключ сета = название группы фильтров (берем из верстки), [сет событий, сет дней]
      // для десктопа и мобилы каждый сет один на двоих
      const activeTagsSet = new Set;
      filterButtonsList.forEach(button => {
        // пока костыль
        if (button.id === 'button__favorite') {
          // button.addEventListener('click', evt => modalFavoriteController(evt));
          button.addEventListener('click', evt => favoriteClickController(evt, activeTags));
        } else {
          button.addEventListener('click', evt => filtersClickController(evt, activeTags));
        }

        // при навешивании слушателя кнопки "все", в сет группы прописываем таг "все" (начальное сотояние группы фильтров)
        if (button.classList.contains('tag-filter_type_all')) {
          activeTagsSet.add(button.textContent);
        }
      });
      activeTags[subtitle.id] = activeTagsSet;        // сэт активных тагов данной группы фильтров в массив сетов групп фильтров
    });
  }
}

//
const activateButton = (button, activeTagsSet) => {
  button.classList.add('tag-filter_type_selected');  // делаем кнопку активной
  activeTagsSet.add(button.textContent);              // в соответствующий сет группы сохраняем тэг кнопки
};
//
const disableButton = (button, activeTagsSet) => {
  activeTagsSet.delete(button.textContent);        // удаляем из сета данной группы тэг кнопки
  button.classList.remove('tag-filter_type_selected');       // делаем кнопку неактивной
};
//
export const toggleButton = (button) => {
  button.querySelector('.tag-filter__icon').classList.toggle('tag-filter__icon_type_hidden'); // тоглим отображения иконки закрытия кнопки
  button.classList.toggle('tag-filter_type_selected');  // тоглим состояние кнопки
}
//
const disableButtonsExceptAll = (tagIconList, activeTagsSet) => {
  // пробегаем по всем активным кнопкам, т.е. у которых активна иконка закрытия, делаем их неактивными и удаляем таги из сета группы массива тагов
  tagIconList.forEach(tagIcon => {
    tagIcon.classList.add('tag-filter__icon_type_hidden');                        // прячем иконку закрытия
    tagIcon.closest('.tag-filter').classList.remove('tag-filter_type_selected');  // снимаем стиль "выбранная" с кнопки
    activeTagsSet.delete(tagIcon.closest('.tag-filter').textContent);             // в массиве в сете данной группы удаляем таг
  });
}
const toggleTagButtonInSet = (button, activeTagsSet) => {
  if (!activeTagsSet.delete(button.textContent)) {    // пробуем удалить тэг этой кнопки из сета массива тагов
    activeTagsSet.add(button.textContent);            // удалять нечего - значит кнопка будет активной при тогле, записываем в сет тэг
  }                                                             // если удалился - значит кнопка будет неактивной после тогла, из сета тэг убрали
}
//
// контроллер обработки нажатия на любую кнопку таг фильтров
// в заключении дергает функцию обновления информации на страницах (список\карта)
export const filtersClickController = (evt, activeTags) => {
  console.log(activeTags);

  const target = evt.target;
  const button = target.closest('.tag-filter'); // нажатая кнопка фильтра
  const filtersGroup = button.closest('.catalog__filters-group') // группа фильтра, в которую входит кнопка
  const buttonAll = filtersGroup.querySelector('.tag-filter_type_all'); // селектор кнопки "все" в группе
  const tagIconList = Array.from(filtersGroup.querySelectorAll('.tag-filter__icon'));

  // селектор для доставания ключа группы фильтров из верстки
  const subtitle = filtersGroup.closest('.catalog__section').querySelector('.catalog__subtitle');
  const activeTagsSet = activeTags[subtitle.id];        // сэт активных тагов данной группы фильтров

  if (button.textContent === buttonAll.textContent) {     // если клик по кнопке "все"
    activateButton(buttonAll, activeTagsSet);

    // пробегаем по всем активным кнопкам, т.е. у которых активна иконка закрытия, делаем их неактивными и удаляем таги из сета группы массива тагов
    disableButtonsExceptAll(tagIconList, activeTagsSet);
  } else {                                                        // клик по любой кнопке, кроме "все", тоглим её, параллельно тоглим тэг в сете группы массива тэгов
    toggleTagButtonInSet(button, activeTagsSet);     // тоглим тэг кнопки в сетеданной группы
    disableButton(buttonAll, activeTagsSet); // удаляем из сета данной группы тэг "все" // делаем кнопку "все" неактивной

    toggleButton(button); // тоглим отображения иконки закрытия кнопки и состояние кнопки
  }

  // состояние нажатой кнопки отработано, сет активных тэгов данной группы фильтров в массиве тэгов обновлен отн нажатой кнопки
  // если сет активных тэгов данной группы фильтров стал пустой, активируем кнопку "все"
  if (activeTagsSet.size === 0) {
    activateButton(buttonAll, activeTagsSet);
    disableButtonsExceptAll(tagIconList, activeTagsSet);
  }

  console.log('activeTags -> ');
  console.log(activeTags);

  renderCardController(activeTags);
  renderMapController(activeTags);

}

// контроллер обработки нажатия на кнопку "Хочц пойти" таг фильтров
// в заключении дергает функцию обновления информации на страницах (список\карта)
export const favoriteClickController = async (evt, activeTags) => {
  console.log(activeTags);

  const target = evt.target;
  const button = target.closest('.tag-filter'); // нажатая кнопка фильтра
  const filtersGroup = button.closest('.catalog__filters-group') // группа фильтра, в которую входит кнопка
  const buttonAll = filtersGroup.querySelector('.tag-filter_type_all'); // селектор кнопки "все" в группе
  const tagIconList = Array.from(filtersGroup.querySelectorAll('.tag-filter__icon'));

  // селектор для доставания ключа группы фильтров из верстки
  const subtitle = filtersGroup.closest('.catalog__section').querySelector('.catalog__subtitle');
  const activeTagsSet = activeTags[subtitle.id];        // сэт активных тагов данной группы фильтров

  { // клик по кнопке "Хочу пойти}"
    disableButton(buttonAll, activeTagsSet);
    // пробегаем по всем активным кнопкам, т.е. у которых активна иконка закрытия, делаем их неактивными и удаляем таги из сета группы массива тагов
    disableButtonsExceptAll(tagIconList, activeTagsSet);
  }
  { // клик по любой кнопке, кроме "все", тоглим её, параллельно тоглим тэг в сете группы массива тэгов
    toggleTagButtonInSet(button, activeTagsSet);     // тоглим тэг кнопки в сетеданной группы
    toggleButton(button); // тоглим отображения иконки закрытия кнопки и состояние кнопки
  }

  // состояние нажатой кнопки отработано, сет активных тэгов данной группы фильтров в массиве тэгов обновлен отн нажатой кнопки

  console.log('activeTags -> ');
  console.log(activeTags);

  const favoriteCards = await getFavoriteCards(activeTags);

  favoriteController(favoriteCards);
  // renderMapController(activeTags);

}

export const favoriteController = (favoriteCards) => {
  const cards = Array.from(Object.values(favoriteCards));
  if (cards === null || cards.length === 0) {
    showNoLikesPage(document.querySelector('.catalog__constraints'));
  }
}

// получаем набор отфильтрованных карточек и делаем рендеринг
export const renderCardController =  async (activeTags) => {

  const filteredCards = await getFilteredCards(activeTags);

  const cardGridSection = document.querySelector('.cards_type_grid');
  const cardTemplate = cardGridSection.querySelector('#card').content;
  renderCatalog(cardGridSection, cardTemplate, filteredCards);
}


// export const modalFavoriteController = (event) => {
//   const filterGroup = document.querySelector('#eventTags');
//   const buttonFavorite = filterGroup.closest('.catalog__section').querySelector('#button__favorite');
//   const buttonAll = filterGroup.closest('.catalog__section').querySelector('.tag-filter_type_all')
//   toggleButton(buttonFavorite);
//   toggleButton(buttonAll);
//   if (checkFavorites()) {
//     initEventsContainer(document.querySelector('.catalog__constraints').querySelector('.tab-switcher'));
//     if (!event.target.closest('.page_id_catalog')) {
//       return window.location.href = 'http://localhost:8080/catalog.html?event=favorite';
//     }
//     const modal = document.querySelector('#modal-favorite').content;
//     modalFavoriteHandler(modal, 'open');
//   } else {
//     showNoLikesPage(document.querySelector('.catalog__constraints'));
//   }
// }

// export const checkFavorites = () => {
//   const filterGroup = document.querySelector('#eventTags');
//   const buttonFavorite = filterGroup.closest('.catalog__section').querySelector('#button__favorite');
//   const likesArray = getStorageValueByKey('likes');
//   if (likesArray === null || likesArray.length === 0) {
//     console.log(!buttonFavorite.classList.contains('tag-filter_type_selected'));
//     return !(buttonFavorite.classList.contains('tag-filter_type_selected'));
//   }
//   return true;
// }
