function revelarElementosOcultos() {
  // En vez de '*', buscamos SOLO en etiquetas de texto donde se suelen meter las trampas
  const elementos = document.querySelectorAll('span, b, i, em, strong');

  elementos.forEach(el => {
    // Si el elemento ya fue modificado por nosotros, nos lo saltamos para evitar bucles
    if (el.dataset.detectado === "true") return;

    const estilo = window.getComputedStyle(el);

    // Convertimos el tamaño de fuente a número (ej: "1px" -> 1, "0px" -> 0)
    const tamanoNumero = parseFloat(estilo.fontSize);

    // 1. CONDICIÓN DE TAMAÑO: Si mide entre 0px y 4px, es sospechosamente pequeño
    const esTamanoSospechoso = tamanoNumero >= 0 && tamanoNumero <= 4;

    // 2. CONDICIÓN DE COLOR: Si es blanco (en cualquier formato)
    const esColorBlanco = estilo.color === "rgb(255, 255, 255)" || estilo.color === "#ffffff";

    // Si es una etiqueta pequeña, blanca y diminuta... ¡Es una trampa!
    if (esTamanoSospechoso && esColorBlanco) {
      
      // Marcamos el elemento para que el script sepa que ya lo procesó y no toque al padre
      el.dataset.detectado = "true";

      // Aplicamos los estilos solo a la trampa
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("font-size", "15px", "important");
      el.style.setProperty("color", "red", "important");
      el.style.setProperty("background-color", "#ffffcc", "important");
      el.style.setProperty("border", "1px solid red", "important");
      el.style.setProperty("display", "inline-block", "important");
    }
  });
}

// Ejecutar al cargar y mantener la vigilancia
revelarElementosOcultos();
const observer = new MutationObserver(revelarElementosOcultos);
observer.observe(document.body, { childList: true, subtree: true });





/*

function revelarElementosOcultos() {
  // Seleccionamos todos los elementos de la página
  const elementos = document.querySelectorAll('*');

  elementos.forEach(el => {
    const estilo = window.getComputedStyle(el);

    // Verificamos las condiciones exactas:
    // 1. Opacidad 0
    // 2. Tamaño de fuente 0px
    // 3. Color blanco (en rgb es 255, 255, 255)
    if (
      estilo.opacity === "0" &&
      estilo.fontSize === "1px" &&
      (estilo.color === "rgb(255, 255, 255)" || estilo.color === "#ffffff")
    ) {
      // Aplicamos los nuevos estilos
      el.style.setProperty("opacity", "5", "important");
      el.style.setProperty("font-size", "15px", "important");
      el.style.setProperty("color", "red", "important");
      
      // Opcional: un borde para que sepas qué se cambió
      el.style.border = "1px solid red";
    }
  });
}

// Ejecutar al cargar y cada vez que el DOM cambie (por si hay carga dinámica)
revelarElementosOcultos();
const observer = new MutationObserver(revelarElementosOcultos);
observer.observe(document.body, { childList: true, subtree: true });
*/
