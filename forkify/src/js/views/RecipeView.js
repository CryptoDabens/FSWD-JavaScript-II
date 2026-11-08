import Fraction from 'fraction.js';

const icons = new URL('../../img/icons.svg', import.meta.url).href; // 2.b.i.11.d

// Avance 2 pag 3, Paso 2.b
class RecipeView {
  #parentElement = document.querySelector('.recipe'); // 2.b.i.1
  #data; // 2.b.i.2
  _errorMessage = 'We could not find that recipe. Please try another one!'; // Avance 4 pag 14 Paso 2.a.ii, ¿porqué no se pone "const _error;Message"?  --> Porque renderError(message = this._errorMessage) necesita leer el texto desde la instancia, no desde una variable local. Un parámetro por defecto se evalúa en el momento de llamar a la función, y en ese momento this apunta al objeto RecipeView. Por eso el valor tiene que vivir como propiedad de la clase. Si lo declaras con "const" o "let" fuera de la clase, no se puede acceder a él desde dentro de la clase.  -- > _errorMessage no existe en el alcance del parámetro, porque el const queda dentro del cuerpo de la función, que todavía no se ha ejecutado cuando se evalúa el parámetro. Y si pones "const" fuera de la clase, this._errorMessage tampoco lo encuentra, porque no es una propiedad del objeto.
  _message = "Start by searching for a recipe or an ingredient. Have fun!";

  render(data) { // 2.b.i.3
    this.#data = data; // 2.b.i.4
    const markup = this.#generateMarkup(); // 2.b.i.5
    this.#clean(); // 2.b.i.9.b
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup() { // 2.b.i.6, 7, 8
    return `        
        <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this.#data.ingredients
        .map(ing => {
          return `
                  <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                      <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ''}</div>
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
            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }

  #clean() { // 2.b.i.9.a
    this.#parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`

    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup)

  }
  // Avance 3 pag 14 Paso 1.b: En el archivo recipeView.js crea el método addHandlerRender dentro de la clase RecipeView y debajo del renderSpinner. Envíale como parámetro un handler y en el cuerpo, pega el código copiado del archivo controller.js
  addHandlerRender(handler) {
    const eventos = ['hashchange', 'load'];
    eventos.forEach(ev => {
      window.addEventListener(ev, handler); // Avance 3 pag 14 Paso 1.c cambiar el parámetro de la función anónima a handler, que es la función que se envía desde controller.js y que tiene el contexto para ejecutar controlRecipes.
    });
  }

  // Avance 3 pag 14 Paso 2, a. i-vii
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p> 
      </div>`;
    this.#clean(); // 2.b.i.9.b
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);  
  }

  // Avance 3 pag 15 Paso 3, a-c
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p> 
      </div>`;
    this.#clean();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);  
  }

}

export default new RecipeView(); // Avance 2 pag 4 2.b.ii
