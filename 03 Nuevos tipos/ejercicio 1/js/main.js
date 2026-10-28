// Función flecha para quitar duplicados con validaciones
const quitarDuplicados = (arr = undefined) => {
    // 1. Validar que se haya ingresado un parámetro
    if (arr === undefined) {
        return console.error("No ingresaste un arreglo");
    }

    // 2. Validar que sea un arreglo
    if (!Array.isArray(arr)) {
        return console.error("El valor que ingresaste no es un arreglo");
    }

    // 3. Validar que no esté vacío
    if (arr.length === 0) {
        return console.error("El arreglo está vacío");
    }

    // 4. Validar que tenga al menos dos elementos
    if (arr.length === 1) {
        return console.error("El arreglo debe tener al menos dos elementos");
    }

    // 5. Mostrar resultado con método filter
    console.info({
    original: arr,
    sinDuplicados: arr.filter((valor, indice, self) => self.indexOf(valor) === indice)
    });
    // valor: el elemento actual
    // indice: la posición actual
    // self: el arreglo completo (arr)
    // arr[3,5,3]

    // 6. Alternativa mejorada con Set (comentada inicialmente)
    console.info({
        original: arr,
        sinDuplicados: [...new Set(arr)]
    });


    // Quitar duplicados
    return [...new Set(arr)];
};

// Ejemplo de uso
console.log(quitarDuplicados([1, 2, 3, 2, 4, 1, 5]));
// Resultado: [1, 2, 3, 4, 5]

quitarDuplicados(); // a. undefined
quitarDuplicados({}); // b. objeto vacio
quitarDuplicados([]); // c. arreglo vacio
quitarDuplicados([2]); // d. solo 1 elemento
quitarDuplicados(["10","X","X","2","10",10,true,true]); // e. duplicados variados

