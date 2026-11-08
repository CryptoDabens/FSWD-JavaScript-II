// Avance 2 pag Paso 3.c
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// Modelo.js
// Aquí se escribirá el modelo completo y tendrá objetos para la receta, la búsqueda y los marcadores y una función para cargar las recetas. Para realizar esta funcionalidad, haz lo siguiente: 
// a. En la carpeta js, crea el archivo model.js y dentro del cuerpo del objeto agrega lo siguiente: 
// i.Un objeto state que, a su vez, tendrá dentro de él un objeto recipe vacío.
// ii. Exporta este estado para que lo pueda visualizar el controlador. 
export const state = { 
    recipe: {}, ;
    // A3 pag 16 P2.a
    search: { 
        query: '',
        results: [],
       }, 
};

// iii. Crea la función asíncrona loadRecipe que será la encargada de obtener la receta de la API.
// iv. Exporta la función loadRecipe.
export async function loadRecipe(id) {
    
    
    // Avance 2: Paso 1.a.v.1.a.b.c
    try {
        // Avance 2: Paso 1.a.v.1.a.b.d
        // const resp = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`); // Valor anterior
        // Valor nuevo:
        /* Las siguientes const se quedan obsoleta por Avance 2 pag 5 paso 4.a.viii
        // const resp = await fetch(`${API_URL}${id}`);
        // const data = await resp.json(); 
        // if (!resp.ok)
           // throw new Error(`Recipe not found (${resp.status})`);
        */
        
        // Avance 2 pag 5 paso 4.a.viii
        const data = await getJSON(`${API_URL}${id}`); // <-- El argumento `${API_URL}${id}` se recibe en helpers.js como parámetro de la función getJSON() 
                
        // Paso 1.a.v.3.b. Declara como const el objeto recipe (en controller.js es "let" y con "const" no funciona).    
        const recipe = data.data.recipe;

        // Paso 1.a.v.1-d.i: luego Paso 1.a.v.3.c
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
        // Paso 1.a.v.1-d.ii: 
        console.log(state.recipe); //Paso 1.a.v.3.c: se antepone "state" al objeto "recipe"
    }

    // Paso 2:1.a.v.2: 
    catch (err) {
        throw err; //alert(`${err}💥💥💥💥`); // A3 pag 14 P2.c

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
            console.log(state.search.results); // A3 pag 16 2.b.ii
        }
        
        catch (err) {
            console.log(`${err}💥💥💥💥`); // A3 pag 15 1.e
            throw err; // A3 pag 15 1.f
        }
}

// Prueba del paso 1.g; quítala cuando el controlador llame a la función (paso 3.a)
loadSearchResults('pizza'); // A3 pag 15 1.g