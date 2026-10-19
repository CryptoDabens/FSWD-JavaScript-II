function cuadradoCallback(valor, callback) {
    let delay = Math.random() * 1000;
    setTimeout(() => {
        callback(valor, valor * valor);
    }, delay);
};

cuadradoCallback (0, (valor, resultado) => {
        console.log('Inicia Callback');
        console.log(`Callback: ${valor}, ${resultado}`);

        cuadradoCallback (1, (valor, resultado) => {
            console.log(`Callback: ${valor}, ${resultado}`);

            cuadradoCallback (2, (valor, resultado) => {
                console.log(`Callback: ${valor}, ${resultado}`);
                
                cuadradoCallback (3, (valor, resultado) => {
                    console.log(`Callback: ${valor}, ${resultado}`);

                    cuadradoCallback (4, (valor, resultado) => {
                        console.log(`Callback: ${valor}, ${resultado}`);
                        
                        cuadradoCallback (5, (valor, resultado) => {
                            console.log(`Callback: ${valor}, ${resultado}`);
                        });
                    
                    });
                });
            });
        });
    });