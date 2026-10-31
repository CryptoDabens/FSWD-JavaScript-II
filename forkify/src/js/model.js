// Modelo.js
// Aquí se escribirá el modelo completo y tendrá objetos para la receta, la búsqueda y los marcadores y una función para cargar las recetas. Para realizar esta funcionalidad, haz lo siguiente: 
// a. En la carpeta js, crea el archivo model.js y dentro del cuerpo del objeto agrega lo siguiente: 
// i.Un objeto state que, a su vez, tendrá dentro de él un objeto recipe vacío.
// ii. Exporta este estado para que lo pueda visualizar el controlador. 
// iii. Crea la función asíncrona loadRecipe que será la encargada de obtener la receta de la API.
// iv. Exporta la función loadRecipe.

export const state = { recipe: {} };

export async function loadRecipe(id) {
    
    
    //Avance 2: Paso 1.a.v.1.a.b.c
    try {
        const resp = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);

        const data = await resp.json(); // parsea resp a JSON
        if (!resp.ok)
            throw new Error(`Recipe not found (${resp.status})`);

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
        alert(`Error: ${err}`);

    }
}