class SearchView {
    _parentEL = document.querySelector('.search');

    // Método getQuery retorna el valor del elemento con la clase 'search__field' utilizando el método 'querySelector' del elemento padre.
    getQuery() {
        const query = this._parentEL.querySelector('.search__field').value;
        this._clearInput();

        return query;
    }

    addHandlerSearch(handler) {
        this._parentEL.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }

    _clearInput() {
        this._parentEL.querySelector('.search__field').value = '';
    }
}

export default new SearchView();