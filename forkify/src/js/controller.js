import * as model from './model.js'; // Importa todas las funciones, constantes y variables como un objeto de nombre "model".
import recipeView from './views/RecipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/ResultsView.js';
import paginationView from './views/paginationView.js';

// Avance 1. Inicio
const recipeContainer = document.querySelector('.recipe'); // busca en el HTML | El "." es para indicar que es una "class" y se debe usar querySelector. Si se buscara un "id" se utilizaría getElementById('nombre').
const icons = new URL('../img/icons.svg', import.meta.url).href; // fuente de iconos 

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // Para que no se quede esperando si no se recibe "id".
    recipeView.renderSpinner(); // 
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  }

  catch (err) {
    recipeView.renderError(); // alert(`Error: ${err}`); sustituido por A3 pag 14 P2.b
  }
}

function controlPagination(goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage)); // 1. Renderiza los nuevos resultados de la página correspondiente 
  paginationView.render(model.state.search); // 2. Renderiza los nuevos botones de navegación (anterior / siguiente)
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search); // Se pasa model.state.search porque paginationView necesita page, results y resultsPerPage, y los tres están dentro de search
  }
  catch (err) {
    console.log(err); // A3 pag 16 3.a.ii
  }
}

init();