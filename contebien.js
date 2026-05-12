// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   content.js                                         :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: elerazo- <elerazo-@student.42.fr>          +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2026/05/12 19:02:03 by elerazo-          #+#    #+#             //
//   Updated: 2026/05/12 19:02:08 by elerazo-         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //
// --- CONFIGURACIÓN DE DATOS ---
const CONFIG = {
  provinciaText: "Barcelona",
  nie: "Z2535872N",
  nombreCompleto: "JOSE ARMANDO ERAZO CHACON",
  pais: "HONDURAS"
};

// Función para generar un tiempo de espera "humano" aleatorio
function delayHumano(min = 800, max = 1500) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function completarTramite() {
  const cuerpoPagina = document.body.innerText;
  const mensajeNoCitas = "En este momento no hay citas disponibles";
  
  // Detección de cita (Freno de emergencia)
  if (window.location.href.includes("citar") && !cuerpoPagina.includes(mensajeNoCitas)) {
      if (document.querySelector('.mf-main--info') || cuerpoPagina.includes("Seleccione la oficina")) {
          console.log("¡CITA DETECTADA! Pausando automatización...");
          return;
      }
  }

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
        }, delayHumano()); // Tiempo aleatorio
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
    }, delayHumano());
    return;
  }

  // 3. BOTÓN ENTRAR
  const btnEntrar = document.getElementById('btnEntrar');
  if (btnEntrar) {
    setTimeout(() => btnEntrar.click(), delayHumano(500, 1000));
    return;
  }

  // 4. FORMULARIO DE DATOS PERSONALES
  const campoNIE = document.getElementById('txtIdCitado');
  if (campoNIE && campoNIE.value === "") { 
    campoNIE.value = CONFIG.nie;
    document.getElementById('txtDesCitado').value = CONFIG.nombreCompleto;

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
    }, delayHumano(1100, 1800)); // Un poco más lento aquí para simular escritura
    return;
  }

  // 5. BOTÓN FINAL: SOLICITAR CITA
  const btnSolicitar = document.getElementById('btnSubmit');
  if (btnSolicitar) {
    if (cuerpoPagina.includes(mensajeNoCitas) || !cuerpoPagina.includes("Cod. Oper.")) {
        setTimeout(() => btnSolicitar.click(), delayHumano(600, 1200));
    }
  }
}

// Ejecución con intervalo variable para no ser predecible
(function loopVariable() {
    completarTramite();
    let proximoPaso = delayHumano(1200, 2000); 
    setTimeout(loopVariable, proximoPaso);
})();
