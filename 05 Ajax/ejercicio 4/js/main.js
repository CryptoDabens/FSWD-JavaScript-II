let xmlDoc;

window.onload = function () {
    console.log("Cargando datos...");
    fetch("data/codigos.xml")
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            xmlDoc = parser.parseFromString(data, "text/xml");
            cargarEstados();
        })
        .catch(error => console.error("Error al cargar el archivo XML:", error));
};

function cargarEstados() {
    console.log("Cargando estados...");
    let estados = new Set();
    let registros = xmlDoc.getElementsByTagName("table");
    
    for (let r of registros) {
        let estado = r.getElementsByTagName("d_estado")[0].textContent;
        estados.add(estado);
    }

    let lista = Array.from(estados).sort();
    let select = document.getElementById("estados");

    lista.forEach(e => {
        let opt = document.createElement("option");
        opt.value = e;
        opt.textContent = e;
        console.log(`Agregando estado: ${e}`);
        select.appendChild(opt);
    });
}

function cargarMunicipios() {
    const municipioSelect = document.getElementById("municipios");
    municipioSelect.innerHTML = '<option value="">Selecciona un municipio</option><option value="TODOS">TODOS</option>';

    let estadoSeleccionado = document.getElementById("estados").value;
    if (!estadoSeleccionado) return;

    let registros = xmlDoc.getElementsByTagName("table");
    let municipios = new Set();

    // estadoSeleccionado = "Veracruz"

    // ["Veracruz", "Alvarado", ...]
    // ["Veracruz", "Boca del Río", "Carranza", ...]
    // ["Veracruz", "Córdoba", "Fortín de las Flores", ...]
    // ["Veracruz", "Córdoba", "Gavilanes", ...]
    // ["Veracruz", "Córdoba", "Huiloapan de Cuauhtémoc", ...]

    // Objeto SET municipios = { "Alvarado", "Boca del Río", "Córdoba", ... }
    for (let r of registros) {
        let estado = r.getElementsByTagName("d_estado")[0].textContent;
        if (estado === estadoSeleccionado) {
            let municipio = r.getElementsByTagName("D_mnpio")[0].textContent;
            municipios.add(municipio);
        }
    }

    let lista = Array.from(municipios).sort();
    lista.forEach(m => {
        let opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        municipioSelect.appendChild(opt);
    });
}

function mostrarDatos() {
  let estado = document.getElementById("estados").value;
  let municipio = document.getElementById("municipios").value;
  let registros = xmlDoc.getElementsByTagName("table");

  let rows = "";

  for (let r of registros) {
    let estElem = r.getElementsByTagName("d_estado")[0];
    let estXML = estElem ? estElem.textContent : "";

    let munElem = r.getElementsByTagName("D_mnpio")[0];
    let munXML = munElem ? munElem.textContent : "";

    if (estXML === estado && (municipio === "TODOS" || municipio === munXML)) {
      let codigoElem = r.getElementsByTagName("d_codigo")[0];
      let codigoXML = codigoElem ? codigoElem.textContent : "";

      let asentamientoElem = r.getElementsByTagName("d_asenta")[0];
      let asentamientoXML = asentamientoElem ? asentamientoElem.textContent : "";

      let ciudadElem = r.getElementsByTagName("d_ciudad")[0];
      let ciudadXML = ciudadElem ? ciudadElem.textContent : "";

      let oficinaElem = r.getElementsByTagName("c_oficina")[0];
      let oficinaXML = oficinaElem ? oficinaElem.textContent : "";

      rows += `<tr>
        <td>${codigoXML}</td>
        <td>${asentamientoXML}</td>
        <td>${ciudadXML}</td>
        <td>${munXML}</td>
        <td>${estXML}</td>        
        <td>${oficinaXML}</td>
      </tr>`;
    }
  }

  let tablaHTML = `<table>
    <thead>
      <tr>
        <th onclick="ordenarTabla(0)">Código Postal</th>
        <th onclick="ordenarTabla(1)">Asentamiento</th>
        <th onclick="ordenarTabla(2)">Ciudad</th>
        <th onclick="ordenarTabla(3)">Municipio</th>
        <th onclick="ordenarTabla(4)">Estado</th>
        <th onclick="ordenarTabla(5)">Clave Oficina</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>`;

  document.getElementById("tabla").innerHTML = tablaHTML;
}


function ordenarTabla(colIndex) {
    let table = document.querySelector("table");
    let rows = Array.from(table.rows).slice(1); // Excluye el encabezado
    let sorted = rows.sort((a, b) =>
        a.cells[colIndex].innerText.localeCompare(b.cells[colIndex].innerText)
    );
    let tbody = table.tBodies[0];
    tbody.innerHTML = "";
    sorted.forEach(row => tbody.appendChild(row));
}

