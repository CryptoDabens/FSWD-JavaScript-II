import View from "./View";
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
    const curPage = this._data.page;

    _generateMarkup() {
        if (curPage === 1 && this._data.results.lenght > 1) {
            return `
            <button class="btn--inline pagination__btn--next">
            <span>"Page ${curPage + 1}"</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
        `}

        if (curPage === this._data.results.lenght > 1 && curPage > 1) {
            return `
            <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>`
        }
    
        if (curPage != this._data.results.lenght && curPage != 1 && curPage < this._data.results.lenght) {
            return `
            <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next">
            <span>"Page ${curPage + 1}"</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>`
        }

        if (curPage === 1 && this._data.results.lenght === 1) {
            return '';
        }
    }
}