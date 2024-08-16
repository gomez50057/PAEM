"use client";
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Team.css';

const Team = ({ teamName, teamMembers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offset, setOffset] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
    trackMouse: true,
  });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diffX = startX - currentX;
    setOffset(diffX);
  };

  const handleMouseUp = () => {
    if (offset > 50) {
      handleNextClick();
    } else if (offset < -50) {
      handlePrevClick();
    }
    setIsDragging(false);
    setOffset(0);
  };

  const getTransformStyle = (index) => {
    if (index === currentIndex) {
      return { transform: `translateX(${-offset}px)`, zIndex: 2 };
    } else if (index === (currentIndex + 1) % teamMembers.length) {
      return { transform: `translateX(calc(100% - ${offset}px))`, zIndex: 1 };
    } else if (index === (currentIndex - 1 + teamMembers.length) % teamMembers.length) {
      return { transform: `translateX(calc(-100% - ${offset}px))`, zIndex: 1 };
    }
    return { transform: 'translateX(100%)', zIndex: 0 };
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
      <div
        className="team-list"
        {...handlers}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <button onClick={handlePrevClick} className="nav-button">←</button>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`team-member ${index === currentIndex ? 'active' : ''}`}
            style={getTransformStyle(index)}
          >
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
};

export default Team;
