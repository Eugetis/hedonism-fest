const scrollPageButton = document.querySelector('.floating-button_type_up');

function showScrollBtn() {
  scrollPageButton.classList.remove('floating-button_hide');
}

function hideScrollBtn() {
  scrollPageButton.classList.add('floating-button_hide');
}

export function addScrollListener() {
  window.addEventListener('scroll', () => {
    if (!document.querySelector('.modal_opened')) {
      // определяем величину прокрутки
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // если страница прокручена больше чем на 1000px, то делаем кнопку видимой, иначе скрываем
      scrollY > 1000 ? showScrollBtn() : hideScrollBtn();
    }
  });
  scrollPageButton.addEventListener('click', () => {
    // переместим в начало страницы
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  })
}
