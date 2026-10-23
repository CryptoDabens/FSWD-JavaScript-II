const xhr = new XMLHttpRequest(); // Objeto para hacer la petición


function onRequestHandler() {
    if (this.readyState === 4 && this.status === 200) { // 4 & 200 son códigos (Leer)
        const data = JSON.parse(this.response); // Parsear JSON a objeto JS
        mostrarTabla(data);
    }
}

function mostrarTabla(comentarios) {
    let tablaHTML = `
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
      `;

    comentarios.forEach(c => {
        tablaHTML += `
          <tr>
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.body}</td>
          </tr>
        `;
    });

    tablaHTML += `</tbody></table>`;
    document.getElementById("tabla-comentarios").innerHTML = tablaHTML;
}

xhr.addEventListener("load", onRequestHandler); // primer parámetro
xhr.open("GET", "https://jsonplaceholder.typicode.com/comments"); // primer parámetro es el tipo de petición; el segundo es la fuente
xhr.send();