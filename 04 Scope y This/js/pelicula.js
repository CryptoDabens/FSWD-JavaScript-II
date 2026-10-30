class Pelicula {

    static listaGeneros = [
        "Acción", "Adultos", "Animación", "Autobiografía", "Aventura",
        "Ciencia ficción", "Cine negro", "Comedia", "Concursos de televisión", "Crimen",
        "Deportes", "Documental", "Drama", "Familiar", "Fantasía",
        "Guerra", "Historia", "Musicales", "Misterio", "Noticias",
        "Películas de vaqueros", "Programa de entrevistas", "Reality shows",
        "Romance", "Suspenso", "Terror"
    ];

    // Método estático
    static generosAceptados() {
        console.info(`Los géneros aceptados son: ${Pelicula.listaGeneros.join(", ")}`);
    }

    constructor({ id, titulo, director, estreno, pais, generos, calificacion }) {
        this.id = id;
        this.titulo = titulo;
        this.director = director;
        this.estreno = estreno;
        this.pais = pais;
        this.generos = generos;
        this.calificacion = calificacion;

        this.validarIMDB(id);
        this.validarPais(pais);
        this.validarTitulo(titulo);
        this.validarDirector(director);
        this.validarEstreno(estreno);
        this.validarGenero(generos);
        this.validarCalificacion(calificacion);
    }

    // Método para validar la longitud de la cadena, valida que no esté vacía y que sea tipo string.
    validarCadena(propiedad, valor) {
        if (!valor) {
            console.warn(`${propiedad} "${valor}" está vacío`);
            return false;
        }

        if (typeof valor !== "string") {
            console.error(`${propiedad} "${valor}" no es una cadena de texto`);
            return false;
        }

        return true;
    }

    // Método para validar que el id cumpla con la validación de Cadena (no vacío, tipo string), contenga 9 caracteres, 2 primeros caracteres sean letras minúsculas y 7 caracteres numéricos.
    validarIMDB(id) {
        if (this.validarCadena('IMDB id', id)) {
            if (!(/^[a-z]{2}[0-9]{7}$/.test(id))) {
                console.error(`IMBD id ${id} no es válido. Debe tener nueve caracteres: los dos primeros letras minúsculas y los siete restantes números`);
            }
        }
        return true;
    }

    // Método que valida que la cadena sea menor a un parámetro de longitud de caracteres especificado.
    validarLongitudCadena(propiedad, valor, longitud) {
        if (valor.length > longitud) {
            console.error(`${propiedad} "${valor}" excede el número de caracteres permitidos (${longitud})`);
            return false;
        }
        return true;
    }

    // Método que valida que el título cumpla con la validación de Cadena y Longitud de Cadena, segun el paráetro de longitud definido para título (100 caracteres)
    validarTitulo(titulo) {
        if (this.validarCadena("Titulo", titulo)) {
            if (this.validarLongitudCadena("Titulo", titulo, 100)) {
                return true;
            }
        }
        console.error(`Título ${titulo} no es válido`);
        return false;
    }

    // Método que valida que el título cumpla con la validación de Cadena y Longitud de Cadena, segun el paráetro de longitud definido para título (50 caracteres)
    validarDirector(director) {
        if (this.validarCadena("Director", director)) {
            if (this.validarLongitudCadena("Director", director, 50)) {
                return true;
            }
        }
        console.error(`Director ${director} no es válido`);
        return false;
    }

    // Método que valida que la propiedad tenga un valor numérico
    validarNumero(propiedad, valor) {
        if (!valor) {
            console.warn(`${propiedad} "${valor}" está vacío`);
            return false;
        }

        if (typeof valor !== "number") {
            console.error(`${propiedad} "${valor}" no es un número`);
            return false;
        }

        return true;
    }

    // Métdo que valida que el año de estreno sea numérico y tenga 4 caracteres.
    validarEstreno(estreno) {
        if (this.validarNumero("Año de estreno", estreno)) {
            if (!/^\d{4}$/.test(estreno)) {
                console.error(`Año de estreno "${estreno}" no es válido, debe ser un número de 4 dígitos`);
                return false;
            }
            return true;
        }
        return false;
    }

    // Método que valida el arreglo: que no este vacío, que sea tipo arreglo, que tenga elementos, que cada elemento del arreglo sea una cadena "(string)

    validarArreglo(propiedad, valor) {
        if (!valor) {
            console.warn(`${propiedad} "${valor}" está vacío`);
            return false;
        }

        if (!Array.isArray(valor)) {
            console.error(`${propiedad} "${valor}" no es un arreglo`);
            return false;
        }

        if (valor.length === 0) {
            console.error(`${propiedad} "${valor}" no tiene elementos`);
            return false;
        }

        for (let elemento of valor) {
            if (typeof elemento !== "string") {
                console.error(`${propiedad} contiene un elemento no válido "${elemento}" no es una cadena de texto`);
                return false;
            }
        }

        return true;
    }

    // Método para validar pais sea un arreglo válido utilizando el método validarArreglo
    validarPais(pais) {
        return this.validarArreglo("Pais", pais);
    }

    // Método para validar genero, que esté dentro de los generos válidos en el arreglo estático.
    validarGenero(generos) {
        if (this.validarArreglo("Géneros:", generos)) {
            for (let genero of generos) {
                if (!Pelicula.listaGeneros.includes(genero)) {
                    console.error(
                        `Género ${genero} no es aceptado.
                        Géneros recibidos: ${generos.join(", ")}`
                    );
                    Pelicula.generosAceptados();
                    return false;

                }
            }
        }
    }

    // PAso 10: Método para validar calificación con decimales.
    validarCalificacion(calificacion) {
        if (this.validarNumero("Calificación:", calificacion)) {
            if (calificacion < 0 || calificacion > 10) {
                console.error(`La calificacion "${calificacion}" debe estar en un rango entre 0 y 10`);
                return false;
            } else {
                this.calificacion = parseFloat(calificacion.toFixed(1));
                return true;
            }
        }

    }

    // Paso 11: Método crear ficha técnica
    fichaTecnica() {
        console.info(
            `📽️ Ficha técnica:
            ID: ${this.id}
            Título: ${this.titulo}
            Director: ${this.director}
            Año de estreno: ${this.estreno}
            País(es): ${this.pais.join(", ")}
            Género(s): ${this.generos.join(", ")}
            Calificación: ${this.calificacion}`
        );
    }

}



const pelicula = new Pelicula({
    id: "tt1234567",
    titulo: "Nombre de la Película",
    director: "Nombre del Director",
    estreno: 2020,
    pais: ["México"],
    generos: ["Drama"],
    calificacion: 8.5
});

pelicula.fichaTecnica();

const peliculasData = [
  {
    id: "tt1234567",
    titulo: "Inception 2",
    director: "Christopher Nolan",
    estreno: 2011,
    pais: ["Estados Unidos", "Reino Unido"],
    generos: ["Acción", "Ciencia ficción", "Suspenso"],
    calificacion: 8.8
  },
  {
    id: "tt2345678",
    titulo: "The Matrix",
    director: "Lana Wachowski",
    estreno: 1999,
    pais: ["Estados Unidos"],
    generos: ["Acción", "Ciencia ficción"],
    calificacion: 8.7
  },
  {
    id: "tt3456789",
    titulo: "Interstellar",
    director: "Christopher Nolan",
    estreno: 2014,
    pais: ["Estados Unidos", "Reino Unido"],
    generos: ["Aventura", "Drama", "Ciencia ficción"],
    calificacion: 8.6
  }
];

peliculasData.forEach(peliculaData => {
    const pelicula = new Pelicula(peliculaData);
    pelicula.fichaTecnica();
});





