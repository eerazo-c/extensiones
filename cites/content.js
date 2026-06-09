// --- CONFIGURACIÓN DE DATOS ---
const CONFIG = {
  provinciaText: "Barcelona", 
  nie: "Z3599295F",
  nombreCompleto: "IRIK ELIZABETH TORRES MARTINEZ",
  pais: "HONDURAS"
};

function completarTramite() {
  
  const cuerpoTexto = document.body.innerText;
  const mensajeNoHayCitas = "En este momento no hay citas disponibles";
 
  // 1. SELECCIÓN DE PROVINCIA
  const selectProvincia = document.querySelector('select[name="provincia"]') || document.getElementById('form');
  if (selectProvincia && selectProvincia.tagName === 'SELECT' && !document.getElementById('tramiteGrupo[0]')) {
    for (let i = 0; i < selectProvincia.options.length; i++) {
      if (selectProvincia.options[i].text.includes(CONFIG.provinciaText)) {
        selectProvincia.selectedIndex = i;
        selectProvincia.dispatchEvent(new Event('change', { bubbles: true }));
        setTimeout(() => {
          const btnAceptar = document.getElementById('btnAceptar');
          if (btnAceptar) btnAceptar.click();
        }, 700);
        return;
      }
    }
  }

  // 2. SELECCIÓN DE TRÁMITE
  const selectTramite = document.getElementById('tramiteGrupo[0]');
  if (selectTramite) {
    for (let i = 0; i < selectTramite.options.length; i++) {
      if (selectTramite.options[i].text.includes("TOMA DE HUELLAS")) {
        selectTramite.selectedIndex = i;
        selectTramite.dispatchEvent(new Event('change', { bubbles: true }));
        break;
      }
    }
    setTimeout(() => {
        document.getElementById('btnAceptar')?.click();
    }, 700);
    return;
  }

  // 3. BOTÓN ENTRAR
  const btnEntrar = document.getElementById('btnEntrar');
  if (btnEntrar) {
    btnEntrar.click();
    return;
  }

  // 4. FORMULARIO DE DATOS PERSONALES
  const campoNIE = document.getElementById('txtIdCitado');
  if (campoNIE && campoNIE.value === "") { 
    campoNIE.value = CONFIG.nie;
    const campoNombre = document.getElementById('txtDesCitado');
    if (campoNombre) campoNombre.value = CONFIG.nombreCompleto;
    const selectPais = document.getElementById('txtPaisNac');
    if (selectPais) {
        for (let i = 0; i < selectPais.options.length; i++) {
            if (selectPais.options[i].text.toUpperCase().includes(CONFIG.pais)) {
                selectPais.selectedIndex = i;
                break;
            }
        }
    }
    setTimeout(() => {
        document.getElementById('btnEnviar')?.click();
    }, 700);
    return;
  }

  // 5. BOTÓN FINAL: SOLICITAR CITA (Solo se pulsa si NO está el mensaje de error)
  const btnSolicitar = document.getElementById('btnSubmit');
  if (btnSolicitar && !cuerpoTexto.includes(mensajeNoHayCitas)) {
    btnSolicitar.click();
  }
 // --- LÓGICA DE DETECCIÓN PARA PARAR (ÉXITO) ---
  // Solo paramos si el script detecta que estamos eligiendo oficina o fecha
  if (cuerpoTexto.includes("Seleccione la oficina") || cuerpoTexto.includes("Cita para el día")) {
    console.log("¡CITA ENCONTRADA! Deteniendo script para que elijas.");
    clearInterval(interval);
    return;
  }

  // --- LÓGICA PARA RECARGAR (FALLO) ---
  if (cuerpoTexto.includes(mensajeNoHayCitas)) {
    console.log("No hay citas. Recargando en 10 minutos...");
    clearInterval(interval);
    setTimeout(() => {
      window.location.reload();
    }, 600000); //test -> 6000000
    return;
  }

}

// Intervalo principal
const interval = setInterval(() => {
    completarTramite();
}, 1500);
