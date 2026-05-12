// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   content.js                                         :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: elerazo- <elerazo-@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2026/05/12 19:28:02 by elerazo-          #+#    #+#             //
//   Updated: 2026/05/12 19:28:06 by elerazo-         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //
// --- CONFIGURACIÓN DE DATOS ---
const CONFIG = {
  provinciaText: "Barcelona", 
  nie: "Z2535872N",
  nombreCompleto: "JOSE ARMANDO ERAZO CHACON",
  pais: "HONDURAS"
};

function completarTramite() {
  
  // --- LÓGICA DE DETECCIÓN DE MENSAJE ---
  const cuerpoTexto = document.body.innerText;
  const mensajeNoHayCitas = "En este momento no hay citas disponibles";

  // CASO A: Aparece el mensaje de que NO hay citas -> Recarga en 10 minutos
  if (cuerpoTexto.includes(mensajeNoHayCitas)) {
    console.log("No hay citas. Programando recarga en 10 minutos...");
    clearInterval(interval); // Detenemos el llenado automático
    setTimeout(() => {
      window.location.reload();
    }, 600000); // 10 minutos (10 * 60 * 1000)
    return;
  }

  // CASO B: Estamos en la parte final pero NO hay mensaje de error -> ¡HAY CITA!
  // Si vemos el código de operación o estamos en selección de oficina, paramos todo.
  if (window.location.href.includes("citar") && 
      !cuerpoTexto.includes(mensajeNoHayCitas) && 
      !document.getElementById('txtIdCitado') && 
      !document.getElementById('tramiteGrupo[0]')) {
    console.log("¡CITA PROBABLEMENTE ENCONTRADA! Deteniendo script.");
    clearInterval(interval);
    return;
  }

  // 1. SELECCIÓN DE PROVINCIA (Solución mejorada)
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

  // 3. BOTÓN ENTRAR / PRESENTACIÓN SIN CL@VE
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

  // 5. BOTÓN FINAL: SOLICITAR CITA
  const btnSolicitar = document.getElementById('btnSubmit');
  if (btnSolicitar) {
    btnSolicitar.click();
  }
}

// Intentar ejecutar cada 1.5 segundos
const interval = setInterval(() => {
    completarTramite();
    // Quitamos la limpieza automática del intervalo para que pueda detectar el mensaje de "No hay citas" al final
}, 1500);
