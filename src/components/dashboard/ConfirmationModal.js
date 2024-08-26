// ConfirmationModal.js
import React from 'react';
import './ConfirmationModal.css'; // Archivo CSS para el estilo del modal

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <h2>Estás a punto de cerrar sesión</h2>
        <p>¿Estás seguro de que deseas salir?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Sí</button>
          <button onClick={onClose} className="cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
