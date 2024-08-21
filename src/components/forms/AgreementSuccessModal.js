import React from 'react';
import './AgreementSuccessModal.css';

const AgreementSuccessModal = ({ isOpen, onRequestClose, onCreateNewAgreement, onGoToHome }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="styled-modal">
        <h2>¡Acuerdo enviado con éxito!</h2>
        <p>Su acuerdo ha sido enviado correctamente. Pronto recibirá una notificación con el resultado de la validación.</p>
        <p>¿Qué desea hacer ahora?</p>
        <div className="modal-botton">
          <button onClick={onCreateNewAgreement}>
            Crear un nuevo acuerdo
          </button>
          <button onClick={onGoToHome}>
            Volver a la página principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementSuccessModal;
