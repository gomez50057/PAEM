
"use client";
import React, { useState } from 'react';
import './OurTeam.css';

const teamMembers = [
  {
    name: "Mtro. Miguel Ángel Tello Vargas",
    position: "Titular de la Unidad de Planeación y Prospectiva",
    description: "Comisión Metropolitana de Seguridad Pública y Procuración de Justicia \n Comisión Metropolitana de Gestión Integral de Riesgos\nComisión Metropolitana de Desarrollo Económico y Competitividad, y Turismo\nComisión Metropolitana de Asentamientos Humanos\nComisión Metropolitana de Movilidad\nComisión Metropolitana de Salud\nComisión de Agua y Drenaje del Área Metropolitana\nComisión Ambiental Metropolitana",
    image: "https://via.placeholder.com/400x400", // Replace with actual image paths
  },
  {
    name: "Lic. Onésimo Rodrigo Serrano Rivera",
    position: "	Coordinador General de Planeación y Proyectos",
    description: "Chang Qiu Sheng is the CEO of the company...",
    image: "https://via.placeholder.com/400x400", // Replace with actual image paths
  },
  // Add more members here
];

const OurTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="team-container">
      <div className="profile-section">
        <div className="profile-details">
          <h2>{teamMembers[currentIndex].name}</h2>
          <h4>{teamMembers[currentIndex].position}</h4>
          <p>{teamMembers[currentIndex].description}</p>
        </div>
        <div className="profile-image">
          <img src={teamMembers[currentIndex].image} alt={teamMembers[currentIndex].name} />
        </div>
      </div>

      <div className="team-list">
        <button onClick={handlePrevClick} className="nav-button">←</button>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} className={`team-image ${index === currentIndex ? 'active' : ''}`} />
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
