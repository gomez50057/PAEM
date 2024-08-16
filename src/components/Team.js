"use client";
import React from 'react';
import './Team.css';

const Team = ({ teamName, teamMembers }) => {
  return (
    <div className="team-container">
      <div className="team-header">
        <h2 className="team-title">{teamName}</h2>
        <div className="team-header-cards">
          {teamMembers.slice(0, 2).map((member, index) => (
            <div key={index} className="team-card horizontal-card">
              <div className="team-card-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-card-info">
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="team-body">
        {teamMembers.slice(2).map((member, index) => (
          <div key={index} className="team-card">
            <div className="team-card-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="team-card-info">
              <h3>{member.name}</h3>
              <p>{member.position}</p>
              <p>Comision: {member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
