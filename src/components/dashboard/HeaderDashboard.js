import React from 'react';
import './HeaderDashboard.css';

const HeaderDashboard = () => {
  return (
    <header className="header-dashboard">
      <div className="header-left">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <div className="header-right">
        <div className="welcome-container">
          <p className="welcome-text">Hola Carlos Garcia</p>
          <div className="profile-circle"></div>
        </div>
        <i className="bell-icon">&#128276;</i>
      </div>
    </header>
  );
};

export default HeaderDashboard;
