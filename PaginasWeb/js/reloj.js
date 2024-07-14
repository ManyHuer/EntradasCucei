function actualizarReloj() {
  const reloj = document.getElementById("reloj");
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, "0");
  const minutos = ahora.getMinutes().toString().padStart(2, "0");
  const segundos = ahora.getSeconds().toString().padStart(2, "0");

  const horaActual = `${horas}:${minutos}:${segundos}`;
  reloj.textContent = horaActual;
}

setInterval(actualizarReloj, 1000); // Actualiza el reloj cada segundo
actualizarReloj(); // Actualiza el reloj inmediatamente
