import axios from 'axios';

// ТУТ БУДУТ ЗАПРОСЫ К ФЕЙКОВОМУ API

// Если вдруг кому-то нужно что-то дописать в этом файле, помимо основного ответственного за эту функциональность,
// лучше это делать внизу, где указаны имена. Если нужно что-то писать прямо посреди чужого кода, то отделяйте
// свой код комментариями со своим именем перед и после вставляемого кода.



// Никита - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const getCards = async () => {
  try {
    const response = await axios.get('https://run.mocky.io/v3/e782198a-ac8f-4097-a5fc-83db97ed561b', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data;
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

    return response.data;
  } catch (e) {
    console.log(e.message, ' getCities')
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
