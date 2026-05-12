// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   content.js                                         :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: elerazo- <elerazo-@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2026/05/12 18:46:57 by elerazo-          #+#    #+#             //
//   Updated: 2026/05/12 18:47:28 by elerazo-         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //
// --- CONFIGURACIÓN DE DATOS ---
const CONFIG = {
  provinciaText: "Barcelona", // Buscamos por texto para ser más precisos
  nie: "Z2535872N",
  nombreCompleto: "JOSE ARMANDO ERAZO CHACON",
  pais: "HONDURAS"
};

function completarTramite() {
  
  // 1. SELECCIÓN DE PROVINCIA (Solución mejorada)
  const selectProvincia = document.querySelector('select[name="provincia"]') || document.getElementById('form');
  
  // Si estamos en la primera página y existe el select de provincias
  if (selectProvincia && selectProvincia.tagName === 'SELECT' && !document.getElementById('tramiteGrupo[0]')) {
    
    for (let i = 0; i < selectProvincia.options.length; i++) {
      if (selectProvincia.options[i].text.includes(CONFIG.provinciaText)) {
        selectProvincia.selectedIndex = i;
        
        // Lanzamos el evento "change" para que la página sepa que elegimos Barcelona
        selectProvincia.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Esperamos un momento y damos a aceptar
        setTimeout(() => {
          const btnAceptar = document.getElementById('btnAceptar');
          if (btnAceptar) btnAceptar.click();
        }, 500);
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
    }, 500);
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
  if (campoNIE && campoNIE.value === "") { // Solo si está vacío para evitar bucles
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
    }, 500);
    return;
  }

  // 5. BOTÓN FINAL: SOLICITAR CITA
  const btnSolicitar = document.getElementById('btnSubmit');
  if (btnSolicitar) {
    btnSolicitar.click();
  }
}

// Intentar ejecutar cada segundo por si la página carga lento
const interval = setInterval(() => {
    completarTramite();
    // Si llegamos al botón final, podemos limpiar el intervalo
    if (document.getElementById('btnEnviar')) clearInterval(interval);
}, 6000);
