const recipeContainer = document.querySelector('.recipe'); // el "." es para indicar que es una clase, y se debe usar querySelector, si se buscara un "id" se utilizaría getElementById('nombre')
const icons = new URL('../img/icons.svg', import.meta.url).href; // Parcel v2
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
/*
The async keyword before a function makes the function return a promise.
This is true even if you return a normal value.
If the function returns a value, JavaScript automatically wraps that value in a Promise.*/
/* Paso 15.a:  
Crea una función asíncrona llamada showRecipe. En el try, crea una constante "resp",iguálala a un "await" para que espere el resultado de la función de búsqueda (fetch), la cual devolverá una promesa, y pásale como parámetro la siguiente URL válida para la API:*/ 
async function showRecipe() {
  try {
    //A2.4a,b,c
    const id = window.location.hash.slice(1);
    if (!id) return; // A2.6 PAraque no se quede esperando si no se recibe "id".
    renderSpinner(recipeContainer);
    
    console.log(id);
    
    // Paso 15.b : b. Una vez que tengas el resultado, es necesario convertirlo a JSON. Para ello, declara una constante data, que será igual a resp, utilizando el método json() (no olvides utilizar el await).
    // A2.4.d Modifica en la función de búsqueda la URL estática para que ahora reciba la URL dinámico, pasándole la variable ${id}.
    const resp = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    
    const data = await resp.json();
    if (!resp.ok)
      throw new Error(`Recipe not found (${resp.status})`);

    // Paso 15.c:
    console.log('RESPUESTA API');
    console.log(resp);
    console.log(data);
    
    // Paso 15.j: Para poder visualizar los datos que se necesitan desplegar en la pantalla, crea la variable recipe del tipo objeto e iguálala a data.data
    let recipe = data.data.recipe;

    // Paso 15.k: Ahora desestructura recipe para manejar la semántica camelCase, de la siguiente manera:
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // Paso 15.l: 
    console.log(recipe);
    
    // Paso 16 y 17:  Como puedes notar, no se visualiza el contenido de la consulta en la página. para hacerlo, ve al archivo index.html y copia desde la línea 161 a 253 al archivo controller.js dentro de la función en la variable markup. Utiliza template string (usar backticks --> ` `).
    const markup = `        
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map(ing => {
                return `
                  <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                      <use href="src/img/icons.svg#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity}</div>
                    <div class="recipe__description">
                      <span class="recipe__unit">${ing.unit}</span>
                      ${ing.description}
                    </div>
                  </li>`;
                })
              .join('')
            }
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;

    // Paso 18: Como puedes observar, aún se visualiza el mensaje inicial. Para quitarlo, utiliza el método innerHTML sobre recipeContainer y asígnale una cadena vacía.
    recipeContainer.innerHTML = '';
    // Paso 19: Para visualizar el nuevo contenido en la página, utiliza el método insertAdjacentHTML en el recipeContainer y pásale como parámetros afterbegin y la variable markup.
    recipeContainer.insertAdjacentHTML('afterbegin', markup); // Arg 1 posición y Arg 2, la variable
    // Paso 20: Recorre el arreglo recipe.ingredients y aplícale la función "map" para que se puedan visualizar cada uno de los elementos. Pásale como argumentos al map la función flecha img que envuelve al elemento de la lista con clase recipe_ingredient.
    
    
    // ¿Por qué está así directo $ñ{}
    
    
  }  
  
  catch(err) {
    alert(`Error: ${err}`);
  }

}

// showRecipe(); 
// A2.2


function renderSpinner(parentEl){
  const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`
  // console.log(parentEl);
      parentEl.innerHTML = '';    
  parentEl.insertAdjacentHTML('afterbegin', markup)
  // console.log(parentEl);
}

// A2.1,2 Con esto ahora se llamará a la función showRecipe cada que cambie el hash, por tanto, se puede eliminar la llamada a la función showRecipe.
// lo sustituye el paso 5.b 
// window.addEventListener('hashchange', showRecipe);
// A2.5a 
// window.addEventListener('load',showRecipe);

const eventos = ['hashchange','load'];
eventos.forEach((ev) => {
  addEventListener(ev,showRecipe);
});