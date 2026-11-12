import { TIMEOUT_SEC } from './config.js';

// constante "timeout" accesible desde model.js a través de la función getJSON
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJSON(url) {
  try {
    const fetchPro = fetch(url);
    const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await resp.json(); // parsea resp a JSONreturn (data);

    if (!resp.ok)
      throw new Error(`Recipe not found (${resp.status})`);

    return (data);
  }

  catch (err) {
    throw err; // throw hace que el error suba hasta loadRecipe, que es quien tiene el contexto para manejarlo. Si no, no habría un "return" que pasar a Model.js -> loadRecipe(). El catch de getJSON no hace falta. Si getJSON no tiene catch, el error sube solo hasta loadRecipe.

  }
};

