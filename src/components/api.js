import axios from 'axios';

// ТУТ БУДУТ ЗАПРОСЫ К ФЕЙКОВОМУ API

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.



// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Функция которая тянет все карточки с API
export const getCards = async () => {
  try {
    const response = await axios.get('https://run.mocky.io/v3/1f01d15e-af47-4ce9-a7d2-5040bebfd8f9', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e.message, + ' getCards')
  }
}
// Функция которая тянет города с API
export const getCities = async () => {
  try {
    const response = await axios.get('https://run.mocky.io/v3/7cdf8973-35bd-40dd-b6e8-3d95ac446576', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e.message, ' getCities')
  }
}
// Функция которая возвращает конкретную карточку по ID
export const getCardById = async (id) => {
  try {
    const response = await getCards();
    const cards = response.cards;
    return {cards: cards.filter((card) => card.id === id)};
  } catch (e) {
    console.log(e.message, ' getCardById');
  }
}


// Никита -> end!

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
