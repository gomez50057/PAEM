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
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return '';
    };

    const zonaMetropolitana = getCookie('selectedZonaMetropolitana');
    setZonaSeleccionada(zonaMetropolitana);
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
