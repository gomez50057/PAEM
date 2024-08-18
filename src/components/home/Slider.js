"use client";

import React, { useState, useEffect } from 'react';
import './Slider.css';

const slides = [
  {
    image: 'https://via.placeholder.com/250?text=Slide+1',
    title: 'Comisión Metropolitana de Seguridad Pública y Procuración de Justicia (CMSPYPJ)',
    description: 'Coordinar en materia de seguridad pública y procuración de justicia, mediante operativos conjuntos en cuadrantes de alta incidencia delictiva en las zonas limítrofes del Valle de México, así como el intercambio de información para reducir los índices de impunidad y fortalecer el estado de derecho.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+2',
    title: 'Comisión Metropolitana de Gestión Integral de Riesgos (COMEPROC)',
    description: 'Establecer una coordinación operativa conjunta de prevención, atención, mitigación y restablecimiento para la Zona Metropolitana del Valle de México para impulsar un sistema metropolitano de alertamiento múltiple.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+3',
    title: 'Comisión Metropolitana de Desarrollo Económico, Competitividad y Turismo (COMEDECO)',
    description: 'Consolidar al Valle de México como uno de los principales destinos turísticos del país, así como crear una estrategia para fortalecer el desarrollo económico en la Zona Metropolitana del Valle de México.',
  },

  {
    image: 'https://via.placeholder.com/250?text=Slide+4',
    title: 'Comisión Metropolitana de Asentamientos Humanos (COMETAH)',
    description: 'Armonizar la normativa metropolitana en materia de desarrollo urbano, así como establecer estrategias que permitan un crecimiento urbano sostenible en la Zona Metropolitana del Valle de México.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+5',
    title: 'Comisión Metropolitana de Movilidad (COMEMOVI)',
    description: 'Fortalecer la interoperabilidad, los procesos y manejo de datos del transporte público concesionado, impulsando proyectos de infraestructura de movilidad en la Zona Metropolitana del Valle de México.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+6',
    title: 'Comisión Metropolitana de Salud (COMESA)',
    description: 'Optimizar los protocolos de atención prehospitalaria, creando un sistema metropolitano de salud para atención ambulatoria y hospitalaria; así como la implementación de un Atlas de Riesgos Sanitarios y Epidemiológicos del Valle de México.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+7',
    title: 'Comisión de Agua y Drenaje del Área Metropolitana (CADAM)',
    description: ' Implementar protocolos de atención, prevención, reacción, atención y restablecimiento en contingencias hidrometereológicas en el Valle de México.',
  },
  {
    image: 'https://via.placeholder.com/250?text=Slide+8',
    title: 'Comisión Ambiental Metropolitana (CAM)',
    description: 'Reducir la huella metropolitana de carbono, mejorando la calidad del aire, así como emprender políticas de mitigación de los efectos del calentamiento global en la Zona Metropolitana del Valle de México.',
  },
];

const Slider = () => {
  // const imgBasePath = "/img/glifos/";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        setFade(false);
      }, 600); // 600ms para que coincida con la duración de la animación
    }, 8000); // Cambia cada 8 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div className="slide">
        <div className={`slide-image ${fade ? 'fade-out' : ''}`}>
          <img src={slides[currentSlide].image} alt="placeholder" />
        </div>
        <div className="slide-content">
          <h2 className={`slide-title ${fade ? 'fade-out' : ''}`}>
            {slides[currentSlide].title}
          </h2>
          {/* <div className="slide-glifo">
            <img src={`${imgBasePath}Atitalaquia.webp`} alt="img_representativa" />
            <img src={`${imgBasePath}atotonilco-de-tula.webp`} alt="img_representativa" />
            <img src={`${imgBasePath}Tlahuelilpan.webp`} alt="img_representativa" />
            <img src={`${imgBasePath}Tlaxcoapan.webp`} alt="img_representativa" />
            <img src={`${imgBasePath}Tula de allende.webp`} alt="img_representativa" />
          </div> */}
          <p className={`slide-description ${fade ? 'fade-out' : ''}`}>
            {slides[currentSlide].description}
          </p>
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
