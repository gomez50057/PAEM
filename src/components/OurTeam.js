
"use client";


import React, { useState } from 'react';
import './OurTeam.css';

const teamMembers = [
    {
        name: "Vicky Tsui",
        position: "VP of Marketing",
        description: "Ms. Tsui oversees business development, management and marketing in the Asia Pacific region. She plays a leading role in setting up customised business jet programs, providing customers with a flexible high-end service that is tailored to their specific needs. Ms. Tsui has over 12 years of management experience in the business jet sector which has allowed her to gain a deep understanding of the business jet market and earn the trust of her clients.",
        image: "https://via.placeholder.com/400x400", // Replace with actual image paths
    },
    {
        name: "Chang Qiu Sheng",
        position: "CEO",
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
            <div className="navigation">
                <button onClick={handlePrevClick} className="nav-button">←</button>
                <button onClick={handleNextClick} className="nav-button">→</button>
            </div>
            <div className="team-list">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                        <img src={member.image} alt={member.name} className={`team-image ${index === currentIndex ? 'active' : ''}`} />
                        <p>{member.name}</p>
                        <p className="position">{member.position}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OurTeam;
