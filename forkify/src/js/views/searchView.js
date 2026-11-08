class SearchView {
    #parentEL = document.querySelector('.search'); // A3 pag 16 4.b.i

    // A3 pag 16 4.b.ii: Crea un método getQuery que retorne el 'valor' del elemento con la clase 'search__field' utilizando el método 'querySelector' del elemento padre.
    getQuery () {
        return this.#parentEL.querySelector('.search__field').value;
    }

    // Crea un método getQuery que retorne el valor del elemento con la clase      search__field utilizando el método querySelector del elemento padre. Crea un listener que va a escuchar el evento clic. 
    
    this.#parentEL.addEventListener("click", getQuery);
    
}


export default new SearchView(); // A3 pag 16 4.b.iv