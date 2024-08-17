"use client";
import React, { useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  useEffect(() => {
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach((item) => {
      item.addEventListener('click', () => {
        listItems.forEach((li) => li.classList.remove('active'));
        item.classList.add('active');
      });
    });

    const toggleBtn = document.querySelector('.toggle');
    const sidebar = document.querySelector('.sidebar');
    toggleBtn.onclick = () => {
      toggleBtn.classList.toggle('active');
      sidebar.classList.toggle('active');
    };
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <div className="toggle">
          <i className="pe-7s-menu open"></i>
          <i className="pe-7s-close close"></i>
        </div>
        <ul className="list">
          <li className="list-item active">
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <img src="https://via.placeholder.com/20" alt="Dashboard Icon" />
              </div>
              <span className="title">Dashboard</span>
            </a>
          </li>
          <li className="list-item">
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <img src="https://via.placeholder.com/20" alt="Rooms Icon" />
              </div>
              <span className="title">Rooms</span>
            </a>
          </li>
          <li className="list-item">
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <img src="https://via.placeholder.com/20" alt="Devices Icon" />
              </div>
              <span className="title">Devices</span>
            </a>
          </li>
          <li className="list-item">
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <img src="https://via.placeholder.com/20" alt="Security Icon" />
              </div>
              <span className="title">Security</span>
            </a>
          </li>
          <li className="list-item">
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <img src="https://via.placeholder.com/20" alt="Statistics Icon" />
              </div>
              <span className="title">Statistics</span>
            </a>
          </li>
          <li className="list-item">
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <img src="https://via.placeholder.com/20" alt="Members Icon" />
              </div>
              <span className="title">Members</span>
            </a>
          </li>
          <li className="list-item">
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <img src="https://via.placeholder.com/20" alt="Logout Icon" />
              </div>
              <span className="title">Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="dashboard-container">
        <header className="header">
          <input type="text" placeholder="Search..." className="search-bar" />
        </header>
        <section className="content">
          <h1>DASHBOARD</h1>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
