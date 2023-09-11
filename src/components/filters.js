import { renderCatalog, showNoLikesPage, renderEventsContainer } from './catalog'
import { getCardsFromLocaleStorage, modalFavoriteController, getFavoriteEvents } from './event.js'
import { renderMapController } from './map.js'
import { eventDate, mapContainer } from './constants.js'

// ========================
// работа фильтров
// ========================
// слушатели кнопок фильтров
const activeTags = [];

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
        //
        if (button.id === 'button__favorite') {
          button.addEventListener('click', evt => favoriteClickController(evt));
        } else if ((button.id === 'button__all')) {
          button.addEventListener('click', evt => allClickController(evt));
        } else {
          button.addEventListener('click', evt => filterClickController(evt, activeTags));
        }
      });
      activeTags[subtitle.id] = activeTagsSet;        // сэт активных тагов данной группы фильтров в массив сетов групп фильтров
    });
  }
}
// ===================
// обработка кнопок
// ===================

// =============================
// обработка кнопки "Хочу пойти"
// =============================
// контроллер обработки нажатия на кнопку "Хочу пойти" таг фильтров
// в заключении дергает функцию обновления информации на страницах (список\карта)
export const favoriteClickController = async (evt) => {

  const target = evt.target;
  const button = target.closest('.tag-filter'); // нажатая кнопка фильтра
  const filtersGroup = button.closest('.catalog__filters-group') // группа фильтра, в которую входит кнопка
  const buttonAll = filtersGroup.querySelector('.tag-filter#button__all'); // селектор кнопки "все" в группе

  const activeTagsSet = activeTags.eventTags;        // сэт активных тагов группы фильтров "Тип события"

  const activeButtonState = Object.values(activeTagsSet);
  activeButtonState.push(buttonAll.textContent);
  // выключаем кнопку "Все""
  deactivateButtonAll(buttonAll);

  // тоглим кнопку "Хочу пойти", параллельно тоглим тэг в сете группы массива тэгов
  toggleButton(button); // тоглим отображения иконки закрытия кнопки и состояние кнопки

  await renderFavoriteCards();
}
// ==================================
// рендер контроллер
// ==================================
// рендерим инфо для "хочу пойти"
export const renderFavoriteCards = async () => {
  const favoriteCards = await getFavoriteCards();
  activateFavorite();
  const cards = Array.from(Object.values(favoriteCards));
  if (cards === null || cards.length === 0) {
    showNoLikesPage(document.querySelector('.catalog__constraints'));
  } else {
    modalFavoriteController(cards);
  }
}
// ===================================
// функция возвращающая отфильтрованный набор карточек
// ===================================
// возвращает набор лайкнутых карточек
const getFavoriteCards = async () => {
    const events = await getFavoriteEvents();
    return events.cards;
}
//
const activateFavorite = () => {
  const section = document.querySelector('.catalog__constraints').querySelector('.catalog__section');
  const buttonAll = section.querySelector('.tag-filter#button__all'); // кнопка "все" фильтров тип события

  const buttonFavoriteList = Array.from(document.querySelectorAll('.tag-filter#button__favorite'));
  buttonFavoriteList.forEach(buttonFavorite => {
    activateButtonFavorite(buttonFavorite);
  });
    deactivateButtonAll(buttonAll);
}
//
export const deactivateFavorite = () => {
  const buttonFavoriteList = Array.from(document.querySelectorAll('.tag-filter#button__favorite'));
  buttonFavoriteList.forEach(buttonFavorite => {
    deactivateButtonFavorite(buttonFavorite);
  });
  restoreFilterState();
}
//
export const restoreFilterState = () => {
  if (activeTags.eventTags.size === 0 && activeTags.dayTags.size === 0) {
    const buttonAllList = Array.from(document.querySelectorAll('.tag-filter#button__all'));
    buttonAllList.forEach(buttonAll => {
      const filtersGroup = buttonAll.closest('.catalog__filters-group') // группа фильтра, в которую входит кнопка
      const tagIconList = Array.from(filtersGroup.querySelectorAll('.tag-filter__icon'));
      const subtitle = filtersGroup.closest('.catalog__section').querySelector('.catalog__subtitle');

      activateButtonAll(buttonAll);
      deactivateButtonsExceptAll(tagIconList, activeTags[subtitle.id]);
    });
    renderAllCards();
  } else {
    renderFilterCards();
  }
}

// =============================
// обработка кнопки "все"
// =============================
// контроллер обработки нажатия на кнопку "все" таг фильтров или на кнопку "смотреть все события" на странице "ой"
// в заключении дергает функцию обновления информации на страницах (список\карта)
export const allClickController = (evt) => {
  const target = evt.target;
  let button;
  if (target.classList.contains('additional-section__button')) {
    const section = target.closest('.catalog__constraints').querySelector('.catalog__subtitle#eventTags').closest('.catalog__section');
    button = section.querySelector('.tag-filter#button__all'); // кнопка "все" фильтров тип события
  } else {
    button = target;//.querySelector('.tag-filter'); // нажатая кнопка "все" фильтра
  }
  const filtersGroup = button.closest('.catalog__filters-group') // группа фильтра, в которую входит кнопка
  const tagIconList = Array.from(filtersGroup.querySelectorAll('.tag-filter__icon'));
  // селектор для доставания ключа группы фильтров из верстки
  const subtitle = filtersGroup.closest('.catalog__section').querySelector('.catalog__subtitle');
  const activeTagsSet = activeTags[subtitle.id];        // сэт активных тагов данной группы фильтров

  // клик по кнопке "все"
  activateButtonAll(button);

  // пробегаем по всем активным кнопкам, т.е. у которых активна иконка закрытия, делаем их неактивными и удаляем таги из сета группы массива тагов
  deactivateButtonsExceptAll(tagIconList, activeTagsSet);

  renderAllCards();
}
//
export const getAllCards = () => {
  const cards = getCardsFromLocaleStorage();
  return cards;
}
//
export const renderAllCards = () => {
  renderCardController(getAllCards());
  renderMapController(getAllCards(), mapContainer);
  renderEventsContainer(document.querySelector('.catalog__constraints').querySelector('.tab-switcher'));
}

// =============================
// обработка кнопок фильтров
// =============================
// контроллер обработки нажатий на кнопки таг фильтров
// в заключении дергает функцию обновления информации на страницах (список\карта)
export const filterClickController = (evt) => {
  const target = evt.target;
  const button = target.closest('.tag-filter'); // нажатая кнопка фильтра
  const filtersGroup = button.closest('.catalog__filters-group') // группа фильтра, в которую входит кнопка
  const buttonAll = filtersGroup.querySelector('.tag-filter#button__all'); // селектор кнопки "все" в группе
  const tagIconList = Array.from(filtersGroup.querySelectorAll('.tag-filter__icon'));
  // селектор для доставания ключа группы фильтров из верстки
  const subtitle = filtersGroup.closest('.catalog__section').querySelector('.catalog__subtitle');
  const activeTagsSet = activeTags[subtitle.id];        // сэт активных тагов данной группы фильтров

  // клик по кнопке
  toggleTagButtonInSet(button, activeTagsSet);     // тоглим тэг кнопки в сетеданной группы
  deactivateButtonAll(buttonAll); // удаляем из сета данной группы тэг "все" // делаем кнопку "все" неактивной

  toggleButton(button); // тоглим отображения иконки закрытия кнопки и состояние кнопки

  // состояние нажатой кнопки отработано, сет активных тэгов данной группы фильтров в массиве тэгов обновлен отн нажатой кнопки
  // если сет активных тэгов данной группы фильтров стал пустой, активируем кнопку "все"
  if (activeTagsSet.size === 0) {
    activateButtonAll(buttonAll);
    deactivateButtonsExceptAll(tagIconList, activeTagsSet);
    renderAllCards();
  } else {
    renderFilterCards();
  }

}
//
export const renderFilterCards = () => {
  renderCardController(getFilterCards());
  renderMapController(getFilterCards(), mapContainer);
  renderEventsContainer(document.querySelector('.catalog__constraints').querySelector('.tab-switcher'));
}
//
export const getFilterCards = () => {
  const cards = getCardsFromLocaleStorage();
  const tags = ['лекции', 'мастер-классы', 'кафе', 'музеи', 'экскурсии', 'доставка', 'магазины'];

  let filteredCardsByDay = [];
  let filteredCards = [];

  if (activeTags['dayTags'].size !== 0) {
    activeTags['dayTags'].forEach(day => {
      let dayContent, res;
      if (day === 'сегодня') {
        dayContent = eventDate[0].substring(0, 6);
      } else if (day === 'завтра') {
        dayContent = eventDate[1].substring(0, 6);
      } else if (day === 'послезавтра') {
        dayContent = eventDate[2].substring(0, 6);
      } else {
        dayContent = day.split(', ')[1];
      }
      res = cards.filter(card => {
        const dateContent = card.date.split(' ');
        const date = `${dateContent[0].padStart(2,'0')} ${dateContent[1].substring(0, 3)}`;
        return dayContent.substring(0, 6).includes(date);
      });
      if (res.length) {
        filteredCardsByDay.push(...res);
      }
    });
  } else {
    filteredCardsByDay = cards;
  }

  activeTags['eventTags'].forEach(event => {
    let res;
    res = filteredCardsByDay.filter(card => {
        return event.includes(card.type)
    });
    if (res.length) {
      filteredCards.push(...res);
    }
    if (event === 'разное') {
      cards.forEach(card => {
        for (let i = 0; i < tags.length; i++) {
          if ( tags[i] === card.type) {
            return
          }
        }
        filteredCards.push(card);
      });
    }
  });

  return filteredCards;
}

// также нужны скрипты и слушатели на кнопки в секции с карточками на главной странице (это связано, поэтому написал тут)

//
const activateButton = (button, activeTagsSet) => {
  button.classList.add('tag-filter_type_selected');  // делаем кнопку активной
  activeTagsSet.add(button.textContent);              // в соответствующий сет группы сохраняем тэг кнопки
};
//
const deactivateButton = (button, activeTagsSet) => {
  activeTagsSet.delete(button.textContent);        // удаляем из сета данной группы тэг кнопки
  button.classList.remove('tag-filter_type_selected');       // делаем кнопку неактивной
};
//
const activateButtonAll = (button) => {
  button.classList.add('tag-filter_type_selected');  // делаем кнопку активной
};
//
const deactivateButtonAll = (button) => {
  button.classList.remove('tag-filter_type_selected');       // делаем кнопку неактивной
};
//
export const toggleButton = (button) => {
  button.querySelector('.tag-filter__icon').classList.toggle('tag-filter__icon_type_hidden'); // тоглим отображения иконки закрытия кнопки
  button.classList.toggle('tag-filter_type_selected');  // тоглим состояние кнопки
}
//
export const activateButtonFavorite = (button) => {
  button.querySelector('.tag-filter__icon').classList.remove('tag-filter__icon_type_hidden'); // тоглим отображения иконки закрытия кнопки
  button.classList.add('tag-filter_type_selected');  // тоглим состояние кнопки
}
//
export const deactivateButtonFavorite = (button) => {
  button.querySelector('.tag-filter__icon').classList.add('tag-filter__icon_type_hidden'); // тоглим отображения иконки закрытия кнопки
  button.classList.remove('tag-filter_type_selected');  // тоглим состояние кнопки
}
//
const deactivateButtonsExceptAll = (tagIconList, activeTagsSet) => {
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

// получаем набор отфильтрованных карточек и делаем рендеринг
export const renderCardController =  (filteredCards) => {
  const cardGridSection = document.querySelector('.cards_type_grid');
  const cardTemplate = cardGridSection.querySelector('#card').content;
  renderCatalog(cardGridSection, cardTemplate, filteredCards);
}
