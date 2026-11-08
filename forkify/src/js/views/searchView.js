class SearchView {
    #parentEL = document.querySelector('.search'); // A3 pag 16 4.b.i
    
    // A3 pag 16 4.b.ii: Crea un método getQuery que retorne el 'valor' del elemento con la clase 'search__field' utilizando el método 'querySelector' del elemento padre.
    getQuery () {
        const query = this.#parentEL.querySelector('.search__field').value; // A3 pag 16 4.b.ii
        this.#clearInput(); // A3 pag 17 4.e.ii
        
        // Crea un método getQuery que retorne el valor del elemento con la clase      search__field utilizando el método querySelector del elemento padre. Crea un listener que va a escuchar el evento clic. 
        //this.#parentEL.addEventListener("click", getQuery);
        
        return query;
    }

    // Avance 3 pag 17 4.d.i.ii
    addHandlerSearch(handler) {
        // 4.d.ii.1
        this.#parentEL.addEventListener('submit', function(e) {
            e.preventDefault(); // .b.i
            handler(); // .b.ii
        });
    }

    #clearInput() { // A3 pag 17 4.e.i
        this.#parentEL.querySelector('.search__field').value = '';
    }
}

export default new SearchView(); // A3 pag 16 4.b.iv