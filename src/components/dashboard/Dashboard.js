"use client";
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Formulario from '../forms/CreateFormulario';
import Acuerdos from '../CRUDTable/coordinador/CRUDTable';
import TableResponsable from '../CRUDTable/responsable/TableResponsable';
import TableEnlace from '../CRUDTable/enlace/TableEnlace';
import Headerdashboard from '../dashboard/HeaderDashboard';
import SvgIcon from '../shared/SvgIcon';
import ConfirmationModal from '../shared/LogoutModal';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState(''); // El formulario es el componente predeterminado
  const [userRole, setUserRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Obtener el rol del usuario desde el almacenamiento local
    const role = localStorage.getItem('userRole');
    setUserRole(role);

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

  const handleMenuClick = (componentName) => {
    setActiveComponent(componentName);
    // Actualizar la clase active para el elemento del menú seleccionado
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach((li) => li.classList.remove('active'));
    document.querySelector(`[data-component=${componentName}]`).classList.add('active');
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    window.location.href = '/';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'formulario':
        return <Formulario />;
      case 'acuerdosCoordinador':
        return <Acuerdos />;
      case 'acuerdosResponsable':
        return <TableResponsable />;
      case 'acuerdosEnlace':
        return <TableEnlace />;
      default:
        return <h1>DASHBOARD</h1>;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar active">
        <div className="toggle active"></div>
        <ul className="list">
          {userRole === 'coordinador' && ( // Mostrar solo para coordinadores
            <li
              className="list-item"
              data-component="dashboard"
              onClick={() => handleMenuClick('dashboard')}
            >
              <b></b>
              <b></b>
              <a href="#" className="list-item-link">
                <div className="icon">
                  <SvgIcon name="dashboard" />
                </div>
                <span className="title">Dashboard</span>
              </a>
            </li>
          )}
          {/* {(userRole === 'coordinador' || userRole === 'responsable' || userRole === 'enlace') && ( */}
          {(userRole === 'coordinador') && (

            <li
              // className="list-item active"
              className="list-item"
              data-component="formulario"
              onClick={() => handleMenuClick('formulario')}
            >
              <b></b>
              <b></b>
              <a href="#" className="list-item-link">
                <div className="icon">
                  <SvgIcon name="formulario" />
                </div>
                <span className="title">Formulario</span>
              </a>
            </li>
          )}
          {userRole === 'coordinador' && (
            <li
              className="list-item"
              data-component="acuerdosCoordinador"
              onClick={() => handleMenuClick('acuerdosCoordinador')}
            >
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
          )}
          {userRole === 'responsable' && (
            <li
              className="list-item"
              data-component="acuerdosResponsable"
              onClick={() => handleMenuClick('acuerdosResponsable')}
            >
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
          )}
          {userRole === 'enlace' && (
            <li
              className="list-item"
              data-component="acuerdosEnlace"
              onClick={() => handleMenuClick('acuerdosEnlace')}
            >
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
          )}
        </ul>

        <div className="sidebar-card">
          <div className="sidebarCardImg">
            <img src="/img/sidebarRecurso.png" alt="Icono de Cerrar Sesión" />
          </div>
          <button onClick={handleLogoutClick}>
            <img src="/img/iconos/exit.png" alt="Icono de Cerrar Sesión" className="icon" />
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

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Dashboard;
