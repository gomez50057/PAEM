"use client";
import React, { useState } from 'react';
import './Team.css';

const Team = ({ teamName, teamMembers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="team-container">
      {/* <h1>{teamName}</h1> */}
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
              onClick={() => setCurrentIndex(index)}
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

export default Team;
