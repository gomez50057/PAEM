"use client";
import React, { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Team.css';

const Team = ({ teamName, teamMembers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef(null);

  const handlePrevClick = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= listRef.current.offsetWidth;
    }
  };

  const handleNextClick = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += listRef.current.offsetWidth;
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
    trackMouse: true,
  });

  return (
    <div className="team-container">
      <div className="profile-section">
        <button onClick={handlePrevClick} className="nav-button">←</button>
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
        <button onClick={handleNextClick} className="nav-button">→</button>
      </div>
      <div className="team-list" {...handlers} ref={listRef}>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`team-member ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={member.image}
              alt={member.name}
              className={`team-image ${index === currentIndex ? 'active' : ''}`}
            />
            <p>{member.name}</p>
            <p className="position">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
