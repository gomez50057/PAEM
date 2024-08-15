"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Navbar.css';

const img = "/img/escudos/";
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(currentScrollPos < scrollPosition || currentScrollPos < 10);
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  return (
    <nav className={`Navbar ${visible ? 'active' : 'hidden'} ${scrollPosition > 100 ? 'scrolled' : ''}`}>
      <ul>
        <div className="Navbar_img">
          <img src={`${img}MX.webp`} alt="img_representativa" />
          <img src={`${img}CDMX.webp`} alt="img_representativa" />
          <img src={`${img}EDOMEX.webp`} alt="img_representativa" />
          <img src={`${img}HGO.webp`} alt="img_representativa" />
          <li><Link href="/" className=""> PAEM </Link></li>
        </div>

        <div className="Navbar_inicio">
          <div className="navbar_opc">
            <li><Link href="/integrantes" className=""> Integrantes  </Link></li>
            <li><Link href="/" className=""> Noticias  </Link></li>
            <li><Link href="/" className=""> PAEM </Link></li>
          </div>
          <div className="Navbar_circulo">
            <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
