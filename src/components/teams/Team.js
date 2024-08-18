"use client";
import React from 'react';
import './Team.css';

const Team = ({ teamName, teamMembers, isTecnicoTeam = false }) => {
  return (
    <div className="team-container">
      <h2 className="team-title">{teamName}</h2>
      {teamMembers.map((member, index) => (
        <div key={index} className="team-card">
          <div className="team-card-image">
            <img src={member.image} alt={member.name} />
          </div>
          <div className="team-card-info">
            <h3>{member.name}</h3>
            <p>{member.position}</p>
            {isTecnicoTeam ? (
              <p>{member.gobierno}</p>
            ) : (
              <p>{member.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;
