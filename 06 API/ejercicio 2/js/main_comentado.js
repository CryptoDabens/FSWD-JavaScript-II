// ======================================
// PASO 6: Obtener el formulario del DOM
// ======================================

// Seleccionamos el formulario usando su clase CSS
// querySelector devuelve el primer elemento que coincida
const formEl = document.querySelector('.form');


// ======================================
// PASO 7: Escuchar el evento "submit"
// ======================================

// El evento submit se dispara cuando el usuario
// presiona el botón de enviar del formulario
formEl.addEventListener('submit', event => {

  // Evita que el navegador recargue la página
  // (comportamiento por defecto de los formularios)
  event.preventDefault();


  // ======================================
  // PASO 8: Capturar los datos del formulario
  // ======================================

  // FormData crea un objeto con todos los campos
  // del formulario (name + value)
  const formData = new FormData(formEl);

  // Convertimos FormData en un objeto normal de JavaScript
  // para poder enviarlo como JSON
  const data = Object.fromEntries(formData);


  // ======================================
  // PASOS 9 y 10: Enviar datos con fetch (PUT)
  // ======================================

  fetch('https://jsonplaceholder.typicode.com/posts/1', {

    // PUT se usa para actualizar un recurso existente
    method: 'PUT',

    // Indicamos que enviaremos datos en formato JSON
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },

    // Convertimos el objeto JavaScript a texto JSON
    body: JSON.stringify(data)
  })


  // ======================================
  // PASO 11: Procesar la respuesta de la API
  // ======================================

  // Convertimos la respuesta en formato JSON
  .then(response => response.json())

  // Mostramos los datos recibidos desde la API
  .then(data => {
    console.log('Respuesta de la API:', data);
  })

  // Capturamos cualquier error que ocurra
  .catch(error => {
    console.error('Error:', error);
  });
});


// ============================================================================
//   Puntos clave a recordar:
// ============================================================================   
// 1. querySelector permite seleccionar elementos del DOM
//    usando selectores CSS.
// 2. El evento "submit" de un formulario se puede
//    escuchar para capturar el envío de datos.
// 3. FormData facilita la recolección de datos
//    de formularios HTML.
// 4. fetch permite enviar peticiones HTTP de manera
//    sencilla, incluyendo métodos como PUT para
//    actualizar recursos en una API.
// ============================================================================