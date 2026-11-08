const icons = new URL('../../img/icons.svg', import.meta.url).href;

class View {
    _data;
    render(data) { // 2.b.i.3
        // A3 p19 P5.iii
        if(!data || (Array.isArray(data) && data.length === 0)) {
            return this.renderError();            
        }
        this._data = data; // 2.b.i.4
        const markup = this._generateMarkup(); // 2.b.i.5
        this._clean(); // 2.b.i.9.b
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clean() { // 2.b.i.9.a
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`

        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup)

    }

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
        this._clean(); // 2.b.i.9.b
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

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
        this._clean();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}


export default View;