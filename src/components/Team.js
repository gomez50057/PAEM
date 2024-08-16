"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Team.css';

const Team = ({ teamName, teamMembers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
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

  useEffect(() => {
    if (fade) {
      const timeout = setTimeout(() => setFade(false), 500); // 500ms coincide con la duración de la animación
      return () => clearTimeout(timeout);
    }
  }, [fade]);

  const changeMember = (index) => {
    if (index !== currentIndex) {
      setFade(true);
      setTimeout(() => setCurrentIndex(index), 250); // 250ms para que coincida con el inicio de la animación de salida
    }
  };

  return (
    <div className="team-container">
      <div className="profile-section">
        <button onClick={handlePrevClick} className="nav-buttonL">←</button>
        <div className={`profile-details ${fade ? 'fade-out' : ''}`}>
          <h2>{teamMembers[currentIndex].name}</h2>
          <h4>{teamMembers[currentIndex].position}</h4>
          <ul>
            {teamMembers[currentIndex].description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>{teamName}</p>
        </div>
        <div className={`profile-image ${fade ? 'fade-out' : ''}`}>
          <img src={teamMembers[currentIndex].image} alt={teamMembers[currentIndex].name} />
        </div>
        <button onClick={handleNextClick} className="nav-buttonR">→</button>
      </div>
      <div className="team-list" {...handlers} ref={listRef}>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`team-member ${index === currentIndex ? 'active' : ''}`}
            onClick={() => changeMember(index)}
          >
            <img
              src={member.image}
              alt={member.name}
              className={`team-image ${index === currentIndex ? 'active' : ''}`}
            />
            <div>
              <p>{member.name}</p>
              <p className="position">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
