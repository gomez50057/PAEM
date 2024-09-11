// src/utils/home.js
// home.js

// Función para obtener el texto de la descripción basado en la zona seleccionada
export const getTextoDescripcion = (zonaSeleccionada) => {
  switch (zonaSeleccionada) {
    case 'ZMP':
      return 'Las Comisiones de la Zona Metropolitana de Pachuca son órganos auxiliares del Consejo, cuya labor consiste en informar, desahogar, proponer, recomendar, analizar, investigar, opinar y evaluar los Asuntos Metropolitanos que corresponden a la problemática sectorial que atiende cada Comisión en particular.';
    case 'ZMTula':
      return 'Las Comisiones de la Zona Metropolitana de Tula tienen la responsabilidad de coordinar y gestionar iniciativas relacionadas con el desarrollo sostenible, el manejo ambiental, y la planificación urbana que afecta a la región metropolitana de Tula.';
    case 'ZMTulancingo':
      return 'Las Comisiones de la Zona Metropolitana de Tulancingo se encargan de analizar y promover políticas que favorezcan el desarrollo económico y social de la región, enfocándose en temas de infraestructura, movilidad, y servicios públicos.';
    case 'ZMVM':
      return 'Las Comisiones del Valle de México son órganos auxiliares del Consejo, cuya labor consiste en informar, desahogar, proponer, recomendar, analizar, investigar, opinar y evaluar los Asuntos Metropolitanos que corresponden a la problemática sectorial que atiende cada Comisión en particular.';
    default:
      return 'Las Comisiones son órganos auxiliares del Consejo, cuya labor consiste en informar, desahogar, proponer, recomendar, analizar, investigar, opinar y evaluar los Asuntos Metropolitanos que corresponden a la problemática sectorial que atiende cada Comisión en particular.';
  }
};

// Función para obtener el título de la zona basado en la zona seleccionada
export const getTituloZona = (zonaSeleccionada) => {
  switch (zonaSeleccionada) {
    case 'ZMP':
      return 'Pachuca';
    case 'ZMTula':
      return 'Tula';
    case 'ZMTulancingo':
      return 'Tulancingo';
    case 'ZMVM':
      return 'Valle de México';
    default:
      return 'Valle de México';
  }
};

// Función para obtener el texto del objetivo basado en la zona seleccionada
export const getTextoObjetivo = (zonaSeleccionada) => {
  switch (zonaSeleccionada) {
    case 'ZMP':
      return 'Proporcionar un punto de acceso de información que permita consultar y administrar los acuerdos generados dentro de las comisiones metropolitanas de Pachuca.';
    case 'ZMTula':
      return 'Proporcionar un punto de acceso de información que permita consultar y administrar los acuerdos generados dentro de las comisiones metropolitanas de Tula.';
    case 'ZMTulancingo':
      return 'Proporcionar un punto de acceso de información que permita consultar y administrar los acuerdos generados dentro de las comisiones metropolitanas de Tulancingo.';
    case 'ZMVM':
      return 'Proporcionar un punto de acceso de información que permita consultar y administrar los acuerdos generados dentro de las comisiones metropolitanas del Valle de México.';
    default:
      return 'Proporcionar un punto de acceso de información que permita consultar y administrar los acuerdos generados dentro de las comisiones metropolitanas del Valle de México.';
  }
};

// Función para obtener las imágenes basadas en la zona seleccionada
// home.js

export const getImages = (zonaSeleccionada) => {
  switch (zonaSeleccionada) {
    case 'ZMP':
      return [
        'https://via.placeholder.com/250?text=Pachuca+1',
        'https://via.placeholder.com/250?text=Pachuca+2',
        'https://via.placeholder.com/250?text=Pachuca+3',
        'https://via.placeholder.com/250?text=Pachuca+4'
      ];
    case 'ZMTula':
      return [
        'https://via.placeholder.com/250?text=Tula+1',
        'https://via.placeholder.com/250?text=Tula+2',
        'https://via.placeholder.com/250?text=Tula+3',
        'https://via.placeholder.com/250?text=Tula+4'
      ];
    case 'ZMTulancingo':
      return [
        'https://via.placeholder.com/250?text=Tulancingo+1',
        'https://via.placeholder.com/250?text=Tulancingo+2',
        'https://via.placeholder.com/250?text=Tulancingo+3',
        'https://via.placeholder.com/250?text=Tulancingo+4'
      ];
    case 'ZMVM':
      return [
        'https://via.placeholder.com/250?text=Valle+de+Mexico+1',
        'https://via.placeholder.com/250?text=Valle+de+Mexico+2',
        'https://via.placeholder.com/250?text=Valle+de+Mexico+3',
        'https://via.placeholder.com/250?text=Valle+de+Mexico+4'
      ];
    default:
      // Asegúrate de que siempre se devuelva un arreglo, incluso si no hay zona seleccionada
      return [
        'https://via.placeholder.com/250?text=Default+1',
        'https://via.placeholder.com/250?text=Default+2',
        'https://via.placeholder.com/250?text=Default+3',
        'https://via.placeholder.com/250?text=Default+4'
      ];
  }
};


// Función para determinar si se usa "de" o "del"
export const getPreposicion = (zonaSeleccionada) => {
  return zonaSeleccionada === 'ZMVM' ? 'del' : 'de';
};
