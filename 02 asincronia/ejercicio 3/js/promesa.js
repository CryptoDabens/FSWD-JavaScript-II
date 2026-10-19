function cuadradoPromesa(valor) {
    if (typeof valor !== 'number') {
        return Promise.reject(`Error, el valor "${valor}" ingresado no es un número`);
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                value: valor, 
                resultado: valor * valor });
        }, Math.random() * 1000);
    }); 
}

cuadradoPromesa(0)
    .then(obj => {
        console.log('Inicia Promesa');
        console.log(`Promesa: ${obj.value}, ${obj.resultado}`);
        return cuadradoPromesa("a");
    })
    .then(obj => {
        console.log(`Promesa: ${obj.value}, ${obj.resultado}`);
        return cuadradoPromesa(2);
    })
    .then(obj => {
        console.log(`Promesa: ${obj.value}, ${obj.resultado}`);
        return cuadradoPromesa(3);
    })
    .then(obj => {
        console.log(`Promesa: ${obj.value}, ${obj.resultado}`);
        return cuadradoPromesa(4);
    })
    .then(obj => {
        console.log(`Promesa: ${obj.value}, ${obj.resultado}`);
        return cuadradoPromesa(5);
    })
    .then(obj => {
        console.log(`Promesa: ${obj.value}, ${obj.resultado}`);
        console.log('Fin de la promesa');
    })
    .catch(err => console.log(err)
);