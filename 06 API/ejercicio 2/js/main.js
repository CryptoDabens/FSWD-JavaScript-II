const formEl = document.querySelector('.form'); // Obtiene el primer elemento con clase="form" (el punto indica clase, si no lleva punto se refiere a un elemento (p) por ejemplo)

formEl.addEventListener('submit',event => {
    event.preventDefault()
    
    const formData = new FormData(formEl) 
    const data = Object.fromEntries(formData)
}
);

// Petición 
fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data) // Paso 10
}) // Termina petición

// Inicia asincronía
    .then(response => response.json()) //Paso 11
    .then(data => console.log('Respuesta de la API:', data)) // este data es diferente al data del JSON.stringify
    .catch(error => console,error('Error:', error));
    