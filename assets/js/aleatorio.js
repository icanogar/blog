// assets/js/aleatorio.js
// Función para ir a un post aleatorio
function irAPostAleatorio(event) {
  // Prevenimos el comportamiento normal del enlace (ir a '/aleatorio/')
  event.preventDefault();
  
  // Array con los datos de los posts. Esto lo genera Jekyll.
  // Debes INYECTAR estos datos desde Liquid. Mira el paso 3.
  if (!window.todosLosPosts || window.todosLosPosts.length === 0) {
    console.error('No hay posts disponibles o los datos no se cargaron.');
    // Si falla, dejamos que el enlace siga su curso normal (a '/aleatorio/')
    return;
  }
  
  const indice = Math.floor(Math.random() * window.todosLosPosts.length);
  const postElegido = window.todosLosPosts[indice];
  window.location.href = postElegido.url;
}

// Esperamos a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  const enlaceAleatorio = document.getElementById('enlace-aleatorio');
  if (enlaceAleatorio) {
    enlaceAleatorio.addEventListener('click', irAPostAleatorio);
  }
});