// En Model.js se interactua con la API
// Aquí se escribirá el modelo completo y tendrá objetos para la receta, la búsqueda y los marcadores y una función para cargar las recetas.

import { API_URL, RES_PER_PAGE } from './config.js'; // importa la URL de la API endpoint y la variable para los resultados por página, por default 10.
import { getJSON } from './helpers.js';

// Objeto state que, a su vez, tendrá dentro de él un objeto recipe vacío y un objeto search.
// Se exporta este objeto "state" para que lo pueda visualizar el controller.js. 
export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
    },
};

// Función asíncrona loadRecipe que será la encargada de obtener la receta de la API. Se exporta para el controller.js
export async function loadRecipe(id) {

    try {
        const data = await getJSON(`${API_URL}${id}`);
        const recipe = data.data.recipe;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
    }

    catch (err) {
        throw err;
    }
}

export async function loadSearchResults(query) {
    try {
        const data = await getJSON(`${API_URL}?search=${query}`);
        const results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
        state.search.query = query;
        state.search.results = results;
    }

    catch (err) {
        console.log(`${err}💥💥💥💥`);
        throw err;
    }
}

export function getSearchResultsPage(page = state.search.page) {
    state.search.page = +page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
}