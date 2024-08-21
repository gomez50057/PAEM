// AgreementSuccessModal.js
import React from 'react';
import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledModal = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 35px;
  backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  width: 50%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  p {
    text-align: center;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    background: #007bff;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #0056b3;
    }
  }
`;

const AgreementSuccessModal = ({ isOpen, onRequestClose, onCreateNewAgreement, onGoToHome }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <StyledModal>
        <h2>¡Acuerdo enviado con éxito!</h2>
        <p>Su acuerdo ha sido enviado correctamente. Pronto recibirá una notificación con el resultado de la validación.</p>
        <p>¿Qué desea hacer ahora?</p>
        <button onClick={() => { onRequestClose(); onCreateNewAgreement(); }}>
          Crear un nuevo acuerdo
        </button>
        <button onClick={() => { onRequestClose(); onGoToHome(); }}>
          Volver a la página principal
        </button>
      </StyledModal>
    </Overlay>
  );
};

export default AgreementSuccessModal;
