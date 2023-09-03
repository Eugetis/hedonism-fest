import { renderCatalog } from './catalog';
import { getCardsFromLocaleStorage } from './event.js'
import { renderMapController } from './map.js'

// ========================
// работа фильтров
// также нужны скрипты и слушатели на кнопки в секции с карточками на главной странице (это связано, поэтому написал тут)
// let filteredCards = {};

// функция делающая отфильтрованные карточки, вызывается контроллером таг фильтров после обработки нажатия на кнопку фильтра
export const getFilteredCards = (activeTags) => {
  const cards = getCardsFromLocaleStorage();
  const keys = activeTags.keys();
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
// инициализация слушателей кнопок таг фильтров
export const setFiltersEventListener = () => {
  if (document.querySelector('.page_id_catalog')) {
    const filtersGroups = document.querySelectorAll('.catalog__filters-group');

    filtersGroups.forEach(filtersGroup  => {
      const subtitle = filtersGroup.closest('.catalog__section').querySelector('.catalog__subtitle');
      const filterButtons = filtersGroup.querySelectorAll('.tag-filter')
      const filterButtonsList = Array.from(filterButtons);

      activeTags[subtitle.id] = new Set;
      filterButtonsList.forEach(button => {
        button.addEventListener('click', evt => filtersClickController(evt, activeTags));

        if (button.classList.contains('tag-filter_type_all')) {
          activeTags[subtitle.id].add(button.textContent);
        }
      });
    });
  }
}

// контроллер обработки нажатия на любую кнопку таг фильтров
// в заключении дергает функцию обновления информации на странице (список\карта)
export const filtersClickController = (evt, activeTags) => {
  console.log(activeTags);

  const target = evt.target;
  const button = target.closest('.tag-filter');
  const filtersGroup = button.closest('.catalog__filters-group')
  const buttonAll = filtersGroup.querySelector('.tag-filter_type_all');

  const subtitle = filtersGroup.closest('.catalog__section').querySelector('.catalog__subtitle');
  if (button.textContent === buttonAll.textContent) {
    buttonAll.classList.add('tag-filter_type_selected');
    activeTags[subtitle.id].add(button.textContent);

    const tagIconList = Array.from(filtersGroup.querySelectorAll('.tag-filter__icon'));
    tagIconList.forEach(tagIcon => {
      tagIcon.classList.add('tag-filter__icon_type_hidden');
      tagIcon.closest('.tag-filter').classList.remove('tag-filter_type_selected');
      activeTags[subtitle.id].delete(tagIcon.closest('.tag-filter').textContent);
    });
  } else {
    if (!activeTags[subtitle.id].delete(button.textContent)) {
      activeTags[subtitle.id].add(button.textContent);
    }
    activeTags[subtitle.id].delete(buttonAll.textContent);
    buttonAll.classList.remove('tag-filter_type_selected');

    button.querySelector('.tag-filter__icon').classList.toggle('tag-filter__icon_type_hidden');
    button.classList.toggle('tag-filter_type_selected');
  }

  console.log('activeTags -> ');
  console.log(activeTags);

  renderCardController(activeTags);
  renderMapController(activeTags);

}

// получаем набор отфильтрованных карточек и делаем рендеринг
export const renderCardController =  (activeTags) => {

  const filteredCards = getFilteredCards(activeTags);

  const cardGridSection = document.querySelector('.cards_type_grid');
  const cardTemplate = cardGridSection.querySelector('#card').content;
  renderCatalog(cardGridSection, cardTemplate, filteredCards);
}
