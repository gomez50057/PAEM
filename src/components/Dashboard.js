"use client";
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Formulario from './Formulario'; // Importa el componente Formulario

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard'); // Estado para manejar el componente activo

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

    sidebar.classList.add('active');
    toggleBtn.classList.add('active');

    toggleBtn.onclick = () => {
      toggleBtn.classList.toggle('active');
      sidebar.classList.toggle('active');
    };
  }, []);

  const renderContent = () => {
    switch (activeComponent) {
      case 'formulario':
        return <Formulario />;
      default:
        return <h1>DASHBOARD</h1>;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar active">
        <div className="toggle active"></div>
        <ul className="list">
          <li className="list-item active" onClick={() => setActiveComponent('dashboard')}>
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <img src="https://via.placeholder.com/20" alt="Dashboard Icon" />
              </div>
              <span className="title">Dashboard</span>
            </a>
          </li>
          <li className="list-item" onClick={() => setActiveComponent('formulario')}>
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <img src="https://via.placeholder.com/20" alt="Rooms Icon" />
              </div>
              <span className="title">Formulario</span>
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
          {renderContent()} {/* Aquí se renderiza el componente activo */}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
