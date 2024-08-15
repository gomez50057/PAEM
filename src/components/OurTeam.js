"use client";
import React, { useState } from 'react';
import './OurTeam.css';

const teamMembers = [
  {
    name: "Mtro. Miguel Ángel Tello Vargas",
    position: "Titular de la Unidad de Planeación y Prospectiva",
    description: [
      "Comisión Metropolitana de Seguridad Pública y Procuración de Justicia",
      "Comisión Metropolitana de Gestión Integral de Riesgos",
      "Comisión Metropolitana de Desarrollo Económico y Competitividad, y Turismo",
      "Comisión Metropolitana de Asentamientos Humanos",
      "Comisión Metropolitana de Movilidad",
      "Comisión Metropolitana de Salud",
      "Comisión de Agua y Drenaje del Área Metropolitana",
      "Comisión Ambiental Metropolitana"
    ],
    image: "/img/ZMVM/integrantesComisiones/HGO/miguel.png",
  },
  {
    name: "Lic. Onésimo Rodrigo Serrano Rivera",
    position: "Coordinador General de Planeación y Proyectos",
    description: ["Chang Qiu Sheng is the CEO of the company..."],
    image: "https://via.placeholder.com/400x400",
  },
  // Agrega más miembros aquí
];

const OurTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1));
  };

  const handleMemberClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="team-container">
      <div className="profile-section">
        <div className="profile-details">
          <h2>{teamMembers[currentIndex].name}</h2>
          <h4>{teamMembers[currentIndex].position}</h4>
          <ul>
            {teamMembers[currentIndex].description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="profile-image">
          <img src={teamMembers[currentIndex].image} alt={teamMembers[currentIndex].name} />
        </div>
      </div>

      <div className="team-list">
        <button onClick={handlePrevClick} className="nav-button">←</button>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img
              src={member.image}
              alt={member.name}
              className={`team-image ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleMemberClick(index)}  // Añadido el evento onClick aquí
            />
            <p>{member.name}</p>
            <p className="position">{member.position}</p>
          </div>
        ))}
        <button onClick={handleNextClick} className="nav-button">→</button>
      </div>
    </div>
  );
}

export default OurTeam;
