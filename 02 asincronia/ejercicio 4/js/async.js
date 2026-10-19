function cuadradoAsincrona(valor) {
    return new Promise
    ( (resolve, reject) => 
        {
            if (typeof valor !== "number") 
                {
                    reject(`Error, el valor ingresado ${valor} no es un número`);
                    return;
                }
                setTimeout 
                ( () => {  
                    resolve({ value: valor, result: valor * valor });
                    }, Math.random() * 1000
                );
        }
    )
    ;
}




async function funcionAsincronaDeclarada() {
    try {
        console.log("Inicio Aync Function");

        let obj = await cuadradoAsincrona(0);
        console.log(`Async Function: ${obj.value}, ${obj.result}`);

        // Repetir para números del 1 al 5

        console.log("Fin Async Function");
    }   catch (erro) { 
        console.error(error);
    }
}


funcionAsincronaDeclarada();