const {cardTemplate, cardGridSection} = require('./constants');
// РАБОТА С МЕРОПРИЯТИЕМ

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.


// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const addCard = (cards) => {
  cards.forEach((card) => {
    cardGridSection.append(card);
  })
}

export const prepareCard = ({cards}) => {
  const preparedCards = cards.map((card) => {
    return createCard(card)
  })

  addCard(preparedCards);
}

const createCard = (item) => {
  const location = item.location.shift();
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  // Необходимо написать проверку есть-ли лайк на карточке

  cardElement.dataset.id = item.id;
  cardElement.dataset.coordinates = location.coordinates;
  cardElement.querySelector('.cards__item-img').src = item.image;
  cardElement.querySelector('.cards__item-img').alt = item.type;
  cardElement.querySelector('#cards__item-type').textContent = item.type;
  cardElement.querySelector('#cards__item-date').textContent = `${item.date}, ${item.timeDuration}`;
  cardElement.querySelector('.cards__item-title').textContent = item.name;
  cardElement.querySelector('.cards__item-description').textContent = item.description;
  cardElement.querySelector('#cards__item-address').textContent = location.address;
  cardElement.querySelector('#cards__item-count').textContent = `+ еще ${item.location.length}`;

  return cardElement;
}

// рендер карточки мероприятия

// лайк мероприятия (на карточке и внутри модалки с описанием) с сохранением в local storage

// установка слушателя на кнопку "купить билет" для открытия модалки покупки (скрипт открытия модалок напишет Андрей)

// копирование ссылки внутри модалки с описанием мероприятия

// переход к просмотру "еще адресов" и рендер соответствующих карточек (верстку соберу к вечеру 30.08)


// Никита -> end!


//-------------------------------------------------------------------------


// Дмитрий - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



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
