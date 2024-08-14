import React from 'react';
import './Slider.css';

const Slider = () => {
  return (
    <div className="slider-container">
      <div className="slide">
        <div className="slide-image">
          <img src="https://via.placeholder.com/250" alt="placeholder" />
        </div>
        <div className="slide-content">
          <h2 className="slide-title">Subcomisión de Desarrollo Económico de la Zona Metropolitana de Tula</h2>
          <p className="slide-description">Lograr mejores condiciones en materia de DESARROLLO ECONÓMICO, en beneficio de los habitantes de la Zona Metropolitana de Tula</p>
          <button className="slide-button">Read More</button>
        </div>
        <div className="slider-controls">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default Slider;
