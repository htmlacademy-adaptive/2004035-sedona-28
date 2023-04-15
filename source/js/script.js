const menuInput = document.querySelector('.navigation-button__input');
const navigationList = document.querySelector('.navigation__list');

const onMenuInputChange = () => {
  navigationList.classList.toggle('navigation__list--open');
  navigationList.classList.toggle('navigation__list--close');
}

const loadJavaScript = () => {
  const nojsHeader = document.querySelector('.nojs__header');
  const nojsNavigationButton = document.querySelector('.nojs__navigation-button');
  const nojsNavigationList = document.querySelector('.nojs__navigation__list');

  nojsHeader.classList.remove('nojs__header');
  nojsNavigationButton.classList.remove('nojs__navigation-button');
  nojsNavigationList.classList.remove('nojs__navigation__list');
};

loadJavaScript();
menuInput.addEventListener('change', onMenuInputChange);
