"use client";

import { useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {
  const imgBasePath = "/img/";
  const txtRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Activar fade-in para los elementos al montar el componente
    if (txtRef.current) {
      txtRef.current.classList.add('fade-in');
    }
    if (imgRef.current) {
      imgRef.current.classList.add('fade-in');
    }
  }, []);

  // Función para establecer una cookie
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  };

  // Función de controlador para manejar el clic en cada círculo
  const handleCircleClick = (zona) => {
    setCookie('selectedZonaMetropolitana', zona, 7); // Guardar la selección en cookies por 7 días
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
            <div className="circuleZM" onClick={() => handleCircleClick('ZMP')}>
              <div className="tooltip">ZM de Pachuca </div>
            </div>
            <div className="circuleZM" onClick={() => handleCircleClick('ZMTula')}>
              <div className="tooltip">ZM de Tula</div>
            </div>
            <div className="circuleZM" onClick={() => handleCircleClick('ZMTulancingo')}>
              <div className="tooltip">ZM de Tulancingo</div>
            </div>
            <div className="circuleZM" onClick={() => handleCircleClick('ZMVM')}>
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
