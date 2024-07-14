function obtenerDatos() {
  fetch("https://puertascucei.000webhostapp.com/mostrarCitasPuerta2.php")
    .then((response) => response.json())
    .then((data) => {
      // Procesa los datos recibidos y actualiza las tablas
      const tablaPasadas = document.querySelector("#tablaPasadas tbody");
      const tablaFuturas = document.querySelector("#tablaFuturas tbody");
      const tablaActuales = document.querySelector("#tablaActuales tbody");

      // Limpia las tablas antes de actualizarlas
      tablaPasadas.innerHTML = "";
      tablaFuturas.innerHTML = "";
      tablaActuales.innerHTML = "";

      if (data.length === 0) {
        // No hay datos, mostrar mensaje
        mostrarMensaje(tablaPasadas, "No hay citas para mostrar");
        mostrarMensaje(tablaFuturas, "No hay citas para mostrar");
        mostrarMensaje(tablaActuales, "No hay citas para mostrar");
        return;
      }

      const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      data.forEach((item) => {
        const row = document.createElement("tr");

        // Compara la hora de la cita con la hora actual
        const esHoraPasada = item.horaEntrada.localeCompare(horaActual) === -1;
        const esHoraActual = item.horaEntrada.localeCompare(horaActual) === 0;
        const esEnRango = item.horaEntrada.localeCompare(obtenerHoraEnRango(horaActual)) >= 0;

        // Agrega una clase CSS diferente según la hora
        if (esHoraPasada) {
          row.classList.add("hora-pasada");
          tablaPasadas.appendChild(row);
        } else if (esHoraActual || !esEnRango) {
          row.classList.add("hora-actual");
          tablaActuales.appendChild(row);
        } else {
          row.classList.add("hora-futura");
          tablaFuturas.appendChild(row);
        }

        row.innerHTML = `<td>${item.nombre}  ${item.apellido}</td><td>${item.marcaAuto}</td><td>${item.placaAuto}</td><td>${item.color}</td><td>${item.horaEntrada}</td><td>${item.moduloDirigido}</td>`;
      });
      // Hay datos, ocultar mensaje en la tabla correspondiente
      if (tablaPasadas.innerHTML == "") {
        mostrarMensaje(tablaPasadas, "No hay citas para mostrar");
      }
      if(tablaFuturas.innerHTML == ""){
        mostrarMensaje(tablaFuturas, "No hay citas para mostrar");
      }
      if(tablaActuales.innerHTML == ""){
        mostrarMensaje(tablaActuales, "No hay citas para mostrar");
      }
    })
    .catch((error) => console.error("Error al obtener los datos:", error));

  // Luego, verifica y elimina registros obsoletos
  fetch("https://puertascucei.000webhostapp.com/eliminarCitasObsoletasPuerta2.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo completar la solicitud");
      }
      return response.text(); // Leer la respuesta como texto
    })
    .catch((error) =>
      console.error("Error al realizar la eliminación de registros obsoletos:", error)
    );
}

function mostrarMensaje(tabla, mensaje) {
  tabla.innerHTML = `<tr><td colspan="6">${mensaje}</td></tr>`;
}

function ocultarMensaje(tabla) {
  tabla.innerHTML = "";
}

function obtenerHoraEnRango(horaActual) {
  const horaActualDate = new Date();
  horaActualDate.setMinutes(horaActualDate.getMinutes() + 5);
  return horaActualDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Llama a la función inicialmente al cargar la página
obtenerDatos();

setInterval(obtenerDatos, 30000); // 10000 milisegundos (30 segundo)