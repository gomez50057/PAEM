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
            <div className="circuleZM"></div>
            <div className="circuleZM"></div>
            <div className="circuleZM"></div>
            <div className="circuleZM"></div>

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
