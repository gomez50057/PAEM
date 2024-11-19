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
      return 'La Zona Metropolitana de Pachuca es una región clave en el desarrollo urbano del estado de Hidalgo, conformada por los municipios de Epazoyucan, Mineral de la Reforma, Mineral del Monte, Pachuca de Soto, San Agustín Tlaxiaca, Zapotlán de Juárez y Zempoala. Esta área representa una integración funcional y territorial que facilita la planificación conjunta en aspectos económicos, sociales y de infraestructura, promoviendo un crecimiento ordenado y sostenible que mejora la calidad de vida de sus habitantes.';
    case 'ZMTula':
      return 'La Zona Metropolitana de Tula es una región estratégica en el estado de Hidalgo, integrada por los municipios de Atitalaquia, Atotonilco de Tula, Tlahuelilpan, Tlaxcoapan y Tula de Allende. Esta zona destaca por su importancia económica, social y territorial, promoviendo la colaboración intermunicipal para un desarrollo urbano ordenado y sostenible, así como para el fortalecimiento de la infraestructura y los servicios que beneficien a sus habitantes.';
    case 'ZMTulancingo':
      return 'La Zona Metropolitana de Tulancingo, ubicada en el estado de Hidalgo, está conformada por los municipios de Cuautepec de Hinojosa, Santiago Tulantepec de Lugo Guerrero y Tulancingo de Bravo. Esta región representa una integración estratégica para impulsar el desarrollo económico, social y urbano, fortaleciendo la infraestructura y servicios, y promoviendo un crecimiento sostenible que beneficie a los habitantes de los municipios que la integran';
    case 'ZMVM':
      return 'La Zona Metropolitana del Valle de México es una de las áreas urbanas más grandes y dinámicas de México, conformada por municipios del Estado de México, Hidalgo y alcaldías de la Ciudad de México. En el Estado de México incluye Acolman, Amecameca, Apaxco, Atenco, Atizapán de Zaragoza, Atlautla, Axapusco, Ayapango, Chalco, Chiautla, Chicoloapan, Chiconcuac, Chimalhuacán, Coacalco de Berriozábal, Cocotitlán, Coyotepec, Cuautitlán, Cuautitlán Izcalli, Ecatepec de Morelos, Ecatzingo, Huehuetoca, Hueypoxtla, Huixquilucan, Isidro Fabela, Ixtapaluca, Jaltenco, Jilotzingo, Juchitepec, La Paz, Melchor Ocampo, Naucalpan de Juárez, Nextlalpan, Nezahualcóyotl, Nicolás Romero, Nopaltepec, Otumba, Ozumba, Papalotla, San Martín de las Pirámides, Tecámac, Temamatla, Temascalapa, Tenango del Aire, Teoloyucan, Teotihuacán, Tepetlaoxtoc, Tepetlixpa, Tepotzotlán, Tequixquiac, Texcoco, Tezoyuca, Tonanitla, Tultepec, Tultitlán, Valle de Chalco Solidaridad, Villa del Carbón y Zumpango; en Hidalgo incluye Tizayuca; y en la Ciudad de México comprende las alcaldías Álvaro Obregón, Azcapotzalco, Benito Juárez, Coyoacán, Cuajimalpa de Morelos, Cuauhtémoc, Gustavo A. Madero, Iztacalco, Iztapalapa, La Magdalena Contreras, Miguel Hidalgo, Milpa Alta, Tláhuac, Tlalpan, Venustiano Carranza y Xochimilco. Esta región destaca por su interconexión social, económica y cultural, convirtiéndose en un espacio clave para el desarrollo metropolitano.';
    default:
      return 'La Zona Metropolitana del Valle de México es una de las áreas urbanas más grandes y dinámicas de México, conformada por municipios del Estado de México, Hidalgo y alcaldías de la Ciudad de México. En el Estado de México incluye Acolman, Amecameca, Apaxco, Atenco, Atizapán de Zaragoza, Atlautla, Axapusco, Ayapango, Chalco, Chiautla, Chicoloapan, Chiconcuac, Chimalhuacán, Coacalco de Berriozábal, Cocotitlán, Coyotepec, Cuautitlán, Cuautitlán Izcalli, Ecatepec de Morelos, Ecatzingo, Huehuetoca, Hueypoxtla, Huixquilucan, Isidro Fabela, Ixtapaluca, Jaltenco, Jilotzingo, Juchitepec, La Paz, Melchor Ocampo, Naucalpan de Juárez, Nextlalpan, Nezahualcóyotl, Nicolás Romero, Nopaltepec, Otumba, Ozumba, Papalotla, San Martín de las Pirámides, Tecámac, Temamatla, Temascalapa, Tenango del Aire, Teoloyucan, Teotihuacán, Tepetlaoxtoc, Tepetlixpa, Tepotzotlán, Tequixquiac, Texcoco, Tezoyuca, Tonanitla, Tultepec, Tultitlán, Valle de Chalco Solidaridad, Villa del Carbón y Zumpango; en Hidalgo incluye Tizayuca; y en la Ciudad de México comprende las alcaldías Álvaro Obregón, Azcapotzalco, Benito Juárez, Coyoacán, Cuajimalpa de Morelos, Cuauhtémoc, Gustavo A. Madero, Iztacalco, Iztapalapa, La Magdalena Contreras, Miguel Hidalgo, Milpa Alta, Tláhuac, Tlalpan, Venustiano Carranza y Xochimilco. Esta región destaca por su interconexión social, económica y cultural, convirtiéndose en un espacio clave para el desarrollo metropolitano.';
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
