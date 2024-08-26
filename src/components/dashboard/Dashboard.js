"use client";
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Formulario from '../forms/CreateFormulario';
import Acuerdos from '../CRUDTable/CRUDTable';
import Headerdashboard from '../dashboard/HeaderDashboard';
import SvgIcon from '../SvgIcon';
const imgIco = "/img/iconos/";
const imgBasePath = "/img/";


const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

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
      case 'acuerdosCoordinador':
        return <Acuerdos />;
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
                <SvgIcon name="dashboard" />
              </div>
              <span className="title">Dashboard</span>
            </a>
          </li>
          <li className="list-item" onClick={() => setActiveComponent('formulario')}>
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <SvgIcon name="formulario" />
              </div>
              <span className="title">Formulario</span>
            </a>
          </li>
          <li className="list-item" onClick={() => setActiveComponent('acuerdosCoordinador')}>
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <SvgIcon name="acuerdo" />

              </div>
              <span className="title">Acuerdos</span>
              <span className="sub-title">coordinador</span>
            </a>
          </li>
          <li className="list-item" onClick={() => setActiveComponent('acuerdosResponsable')}>
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <SvgIcon name="acuerdo" />

              </div>
              <span className="title">Acuerdos</span>
              <span className="sub-title">responsable</span>
            </a>
          </li>
          <li className="list-item" onClick={() => setActiveComponent('acuerdosEnlace')}>
            <b></b>
            <b></b>
            <a href="#" className="list-item-link">
              <div className="icon">
                <SvgIcon name="acuerdo" />
              </div>
              <span className="title">Acuerdos</span>
              <span className="sub-title">enlace</span>
            </a>
          </li>
        </ul>

        <div className="sidebar-card">
          <div className="sidebarCardImg">
            <img src={`${imgBasePath}sidebarRecurso.png`} alt="Icono de Cerrar Sesión" />
          </div>
          <button>
            <img src={`${imgIco}exit.png`} alt="Icono de Cerrar Sesión" className="icon" />
            Cerrar Sesión
          </button>
        </div>

      </div>

      <div className="dashboard-container">
        {/* <header className="header">
          <input type="text" placeholder="Search..." className="search-bar" />
        </header> */}

        <Headerdashboard />
        <section className="content">
          {renderContent()}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
