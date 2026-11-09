import View from "./View.js";
const icons = new URL('../../img/icons.svg', import.meta.url).href;

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    
    addHandlerClick(handler) {
      this._parentElement.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn--inline'); // busca el botón más cercano al elemento clicado
        if (!btn) return; // si el clic no fue en un botón, no hagas nada. Evita un error. La guía no lo pide, pero sin esta línea btn.dataset falla.
        const goToPage = btn.dataset.goto; // lee el atributo data-goto que pusiste en el HTML del botón.
        console.log(goToPage); // lo que pide la guía en 4.a.iv
      });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        if (curPage === 1 && numPages > 1) {
            return `
            <button class="btn--inline pagination__btn--next" data-goto="${curPage + 1}">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
        `}

        if (curPage === numPages && curPage > 1) {
            return `
            <button class="btn--inline pagination__btn--prev" data-goto="${curPage - 1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>`
        }
    
        if (curPage != numPages && curPage != 1 && curPage < numPages) {
            return `
            <button class="btn--inline pagination__btn--prev" data-goto="${curPage - 1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next" data-goto="${curPage + 1}">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>`
        }

        if (curPage === 1 && numPages === 1) {
            return '';
        }
        
        return ''; // Si no se cumple ninguna condición, retornaria undefined
    }
}

export default new PaginationView (); // A4 p22 P4.a.v: Exporta un nuevo objeto de PaginationView por defecto. Sin esta línea, el controlador no puede importar la vista.