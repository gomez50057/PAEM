import React from 'react';
import './HeaderDashboard.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const HeaderDashboard = () => {
  return (
    <header className="header-dashboard">
      <div className="header-left">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <div className="header-right">
        <div className="welcome-container">
          <p className="welcome-text">Hola! <span>Carlos Garcia</span></p>
          <div className="Navbar_circulo">
            <img src={`${imgBasePath}estrella.webp`} alt="img_representativa" />
          </div>
        </div>
        <div className="Navbar_circulo">
            <img src={`${imgBasePath}alerta.png`} alt="img_representativa" />
          </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
