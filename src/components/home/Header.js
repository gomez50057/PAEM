"use client";

import { useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const imgBasePath = "/img/";
  const txtRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (txtRef.current) {
      txtRef.current.classList.add('fade-in');
    }
    if (imgRef.current) {
      imgRef.current.classList.add('fade-in');
    }
  }, []);

  // Función para manejar la selección de zona y desplazarse hacia abajo
  const setZonaAndScroll = (zona) => {
    // Guardar en localStorage
    localStorage.setItem('selectedZonaMetropolitana', zona); 
    // Emitir evento personalizado
    const event = new Event('zonaChanged');
    window.dispatchEvent(event); 

    // Desplazarse hacia abajo 100vh
    window.scrollTo({
      top: window.innerHeight,  // Esto desplaza 100vh
      behavior: 'smooth',       // Animación suave
    });
  };

  return (
    <section id="header" className="header-container">
      <div className="background-svg" />
      <div className="content_header">
        <div className="header_txt fade-in-target" ref={txtRef}>
          <img src={`${imgBasePath}headertxt.png`} alt="img_representativa" />
        </div>

        <div className="ZonasMetro">
          <p>¡Elige una Zona Metropolitana! </p>
          <div className="content_circuleZM">
            <div className="circuleZM" onClick={() => setZonaAndScroll('ZMP')}>
              <div className="tooltip">ZM de Pachuca</div>
            </div>
            <div className="circuleZM" onClick={() => setZonaAndScroll('ZMTula')}>
              <div className="tooltip">ZM de Tula</div>
            </div>
            <div className="circuleZM" onClick={() => setZonaAndScroll('ZMTulancingo')}>
              <div className="tooltip">ZM de Tulancingo</div>
            </div>
            <div className="circuleZM" onClick={() => setZonaAndScroll('ZMVM')}>
              <div className="tooltip">ZM del Valle de México</div>
            </div>
          </div>
        </div>

        <div className="header_img fade-in-target" ref={imgRef}>
          <img src={`${imgBasePath}headerimg.png`} alt="img_representativa" className="floating-img" />
        </div>
      </div>
    </section>
  );
};

export default Header;
