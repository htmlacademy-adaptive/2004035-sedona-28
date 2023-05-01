const menuButton = document.querySelector('.navigation__button');
const navigationList = document.querySelector('.navigation__list');

const onMenuButtonClick = () => {
  menuButton.classList.toggle('navigation-button--open');
  navigationList.classList.toggle('navigation__list--open');
}

const loadJavaScript = () => {
  const nojs = document.querySelector('.nojs');
  const nojsHeader = document.querySelector('.nojs__header');
  const nojsNavigationButton = document.querySelector('.nojs__navigation-button');
  const nojsNavigationList = document.querySelector('.nojs__navigation-list');
  const nojsMapImg = document.querySelector('.nojs__map-img');
  const nojsMapFrame = document.querySelector('.nojs__map-frame');

  nojs.classList.remove('nojs');
  nojsHeader.classList.remove('nojs__header');
  nojsNavigationButton.classList.remove('nojs__navigation-button');
  nojsNavigationList.classList.remove('nojs__navigation-list');
  if (nojsMapFrame && nojsMapImg) {
    nojsMapImg.remove();
    nojsMapFrame.style.display = 'block';
  }
};

loadJavaScript();
menuButton.addEventListener('click', onMenuButtonClick);
