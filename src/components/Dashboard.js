"use client";
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile-picture"></div>
        <nav className="nav-menu">
          <ul>
            <li className="active">
              <img src="https://via.placeholder.com/20" alt="Dashboard Icon" className="icon" /> Dashboard
            </li>
            <li>
              <img src="https://via.placeholder.com/20" alt="Rooms Icon" className="icon" /> Rooms
            </li>
            <li>
              <img src="https://via.placeholder.com/20" alt="Devices Icon" className="icon" /> Devices
            </li>
            <li>
              <img src="https://via.placeholder.com/20" alt="Security Icon" className="icon" /> Security
            </li>
            <li>
              <img src="https://via.placeholder.com/20" alt="Statistics Icon" className="icon" /> Statistics
            </li>
            <li>
              <img src="https://via.placeholder.com/20" alt="Members Icon" className="icon" /> Members
            </li>
            <li className="logout">
              <img src="https://via.placeholder.com/20" alt="Logout Icon" className="icon" /> Logout
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <input type="text" placeholder="Search..." className="search-bar" />
        </header>
        <section className="content">
          <h1>DASHBOARD</h1>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
