import axios from 'axios';
// ТУТ БУДУТ ЗАПРОСЫ К ФЕЙКОВОМУ API

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.



// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const getCards = async () => {
  try {
    const response = await axios.get('https://run.mocky.io/v3/8312251d-5b23-4c72-8dc7-0a37d70b7ea0', {
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

export const getCardById = async (id) => {
  try {
    const response = await getCards();
    const cards = response.cards;
    return cards.filter((card) => card.id === id);
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
