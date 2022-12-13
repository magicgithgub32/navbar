import { DOCUMENTATION } from './constants'
import './style.css'

const toggleButton = document.querySelector('#menu-toggle');
const inputSearch = document.querySelector('#menu-search');
const menuContentElement = document.querySelector('#menu-content');
const searchBlockElement = document.querySelector('#menu-content > .search');
const favouritesListElement = document.querySelector(
  '#menu-content > .favourites'
  );


const getDocumentationTemplate = (title, url) => {
  return `<li class="favourite-element">
  <a href="${url}" target="_blank">${title}</a>
</li>
`; 
};

const generateList = (listId, elements) => {
  const ulElement = document.createElement('ul');
  ulElement.id = listId;

  elements.forEach((element) => {
    const docTemplate = getDocumentationTemplate(element.title, element.url);
    ulElement.innerHTML += docTemplate;
  });

  return ulElement;
};

  const setUpFavouritesList = () => {
const favourites = DOCUMENTATION.filter((doc) => doc.favourite);
const favouritesUl = generateList('favourites-list', favourites);
favouritesListElement.append(favouritesUl);

favourites.forEach((favourite) => {
  const favouriteTemplate = getDocumentationTemplate(favourite.title, favourite.url);
  favouritesUl.innerHTML += favouriteTemplate;
});

favouritesListElement.append(favouritesUl);
};

const normalizeText = text => text.trim().toLowerCase();

const handleSearch = (event) => {
  const { value } = event.target;

  const normalizedValue = normalizeText(value);

  const filteredDocumentation = DOCUMENTATION.filter(doc => {
    const normalizedTitle = normalizeText(doc.title);
    return normalizedTitle.includes(normalizedValue);

  });

  const searchUl = generateList('search-list', filteredDocumentation);


  const previousUl = document.querySelector('#search-list') 
    if (previousUl) {
      previousUl.remove();
    }
  
  searchBlockElement.append(searchUl);
};

const handleToggleMenu = () => {
  menuContentElement.classList.toggle('menu-content--open');
};

toggleButton.addEventListener('click', handleToggleMenu);
inputSearch.addEventListener('input', handleSearch);

setUpFavouritesList();