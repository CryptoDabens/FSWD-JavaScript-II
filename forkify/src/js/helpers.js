// Avance 2 pag 5 Paso 4.a.i En la carpeta js, crea un archivo helpers.js y agrega lo siguiente: Toma la declaración de res, la declaración de data y la validación del parámetro ok de res del archivo model.js de loadRecipe y llévalas al nuevo archivo helpers.js.

export async function getJSON(url) {
    try {
        const resp = await fetch(url);
        const data = await resp.json(); // parsea resp a JSONreturn (data);
        
        if (!resp.ok)
            throw new Error(`Recipe not found (${resp.status})`);
        
    return(data);
    } 

    catch (err) {
        throw err; // Se cambia el console.log por thorw para que el error suba hasta loadRecipe, que es quien tiene el contexto para manejarlo. Si no, no habría un "return" que pasar a Model.js -> loadRecipe(). 
        // El try/catch de getJSON no hace falta. Si getJSON no tiene catch, el error sube solo hasta loadRecipe. Pero la guía pide throw err en el catch, así que la versión con try/catch cumple el paso 4.a.vii.

    }
};

