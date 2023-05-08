const menuButton = document.querySelector('.navigation__button');
const navigationList = document.querySelector('.navigation__list');

const onMenuButtonClick = () => {
  menuButton.classList.toggle('navigation-button--open');
  navigationList.classList.toggle('navigation__list--open');
}

const loadJavaScript = () => {
  const nojs = document.querySelector('.nojs');
  const nojsMapImg = document.querySelector('.nojs__map-img');
  const map = document.querySelector('.map');

  nojs.classList.remove('nojs');
  if (map && nojsMapImg) {
    nojsMapImg.remove();
    map.style.display = 'block';
  }
};

loadJavaScript();
menuButton.addEventListener('click', onMenuButtonClick);
