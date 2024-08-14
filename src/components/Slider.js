"use client";

import React, { useState, useEffect } from 'react';
import './Slider.css';

const slides = [
  {
    image: 'https://via.placeholder.com/250?text=Slide+1',
    title: 'Subcomisión de Seguridad Pública y Procuración de Justicia de la Zona Metropolitana de Tula',
    description: 'Lograr mejores condiciones en materia de SEGURIDAD PÚBLICA Y PROCURACIÓN DE JUSTICIA, en beneficio de los habitantes de la Zona Metropolitana de Tula.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+2',
    title: 'Subcomisión de Salud de la Zona Metropolitana de Tula',
    description: 'Lograr mejores condiciones en materia de SALUD, en beneficio de los habitantes de la Zona Metropolitana de Tula.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+3',
    title: 'Subcomisión de Protección Civil y Gestión Integral de Riesgos de la Zona Metropolitana de Tula',
    description: 'Lograr mejores condiciones en materia de PROTECCIÓN CIVIL Y GESTIÓN INTEGRAL DE RIESGOS, en beneficio de los habitantes de la Zona Metropolitana de Tula.',
  },

  {
    image: 'https://via.placeholder.com/250?text=Slide+4',
    title: 'Subcomisión de Movilidad de la Zona Metropolitana de Tula',
    description: 'Lograr mejores condiciones en materia de MOVILIDAD, en beneficio de los habitantes de la Zona Metropolitana de Tula.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+5',
    title: 'Subcomisión de Medio Ambiente de la Zona Metropolitana de Tula',
    description: 'Lograr mejores condiciones en materia de MEDIO AMBIENTE, en beneficio de los habitantes de la Zona Metropolitana de Tula.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+6',
    title: 'Subcomisión de Gobernanza Metropolitana de la Zona Metropolitana de Tula',
    description: 'Lograr mejores condiciones en materia de GOBERNANZA METROPOLITANA, en beneficio de los habitantes de la Zona Metropolitana de Tula.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+7',
    title: 'Subcomisión de Desarrollo Económico de la Zona Metropolitana de Tula',
    description: 'Lograr mejores condiciones en materia de DESARROLLO ECONÓMICO, en beneficio de los habitantes de la Zona Metropolitana de Tula.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+8',
    title: 'Subcomisión de Asentamientos Humanos de la Zona Metropolitana de Tula',
    description: 'Lograr mejores condiciones en materia de ASENTAMIENTOS HUMANOS, en beneficio de los habitantes de la Zona Metropolitana de Tula.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+9',
    title: 'Subcomisión de Agua y Alcantarillado de la Zona Metropolitana de Tula',
    description: 'Lograr mejores condiciones en materia de AGUA Y ALCANTARILLADO, en beneficio de los habitantes de la Zona Metropolitana de Tula.',
  }
];

const Slider = () => {
  const imgBasePath = "/img/glifos/";
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div className="slide">
        <div className="slide-image">
          <img src={slides[currentSlide].image} alt="placeholder" />
        </div>
        <div className="slide-content">
          <h2 className="slide-title">{slides[currentSlide].title}</h2>
          <div className="slide-glifo">
            <img src={`${imgBasePath}Atitalaquia.webp`} alt="img_representativa" />
            <img src={`${imgBasePath}atotonilco-de-tula.webp`} alt="img_representativa" />
            <img src={`${imgBasePath}Tlahuelilpan.webp`} alt="img_representativa" />
            <img src={`${imgBasePath}Tlaxcoapan.webp`} alt="img_representativa" />
            <img src={`${imgBasePath}Tula de allende.webp`} alt="img_representativa" />
          </div>
          <p className="slide-description">{slides[currentSlide].description}</p>
        </div>
        <div className="slider-controls">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
