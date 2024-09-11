"use client";

import { useEffect, useState } from 'react';
import {
  getTextoDescripcion,
  getTituloZona,
  getTextoObjetivo,
  getImages,
  getPreposicion
} from '../../utils/home';
import './About.css';

const About = () => {
  const [zonaSeleccionada, setZonaSeleccionada] = useState('');

  useEffect(() => {
    const getZonaFromLocalStorage = () => {
      const zonaMetropolitana = localStorage.getItem('selectedZonaMetropolitana');
      setZonaSeleccionada(zonaMetropolitana || ''); // Actualiza el estado
    };

    // Cargar la zona seleccionada al montar el componente
    getZonaFromLocalStorage();

    // Escuchar el evento personalizado 'zonaChanged'
    window.addEventListener('zonaChanged', getZonaFromLocalStorage);

    // Limpieza del event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('zonaChanged', getZonaFromLocalStorage);
    };
  }, []);

  const images = getImages(zonaSeleccionada);

  return (
    <section id='about' className="about-container">
      <div className="about_giro">
        <div className="gallery">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`gallery ${index + 1}`} />
          ))}
        </div>
      </div>
      <div className="about_txt">
        <h2>¿Qué son las <span className="span-doarado">Comisiones Metropolitanas</span> {getPreposicion(zonaSeleccionada)} <span>{getTituloZona(zonaSeleccionada)}?</span></h2>
        <p>{getTextoDescripcion(zonaSeleccionada)}</p>
        <h3>Objetivo</h3>
        <p>{getTextoObjetivo(zonaSeleccionada)}</p>
      </div>
    </section>
  );
};

export default About;
