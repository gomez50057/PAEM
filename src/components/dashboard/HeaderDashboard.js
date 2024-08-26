import React, { useEffect, useState } from 'react';
import './HeaderDashboard.css';
const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const HeaderDashboard = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Obtener el nombre del usuario desde el localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <header className="header-dashboard">
      <div className="header-left">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <div className="header-right">
        <div className="welcome-container">
          <p className="welcome-text">Hola! <span>{userName}</span></p>
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
