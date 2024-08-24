import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditFormulario from '../forms/EditFormulario';
import UpdateFormulario from '../forms/UpdateFormulario';
import HistoryList from '../forms/HistoryList';  // Importa el nuevo componente HistoryList

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  height: '95%',
  borderRadius: '20px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProjectModal = ({ open, handleClose, projectId, mode }) => { 
  const renderContent = () => {
    if (mode === 'edit') {
      return <EditFormulario projectId={projectId} onClose={handleClose} />;
    } else if (mode === 'update') {
      return <UpdateFormulario projectId={projectId} onClose={handleClose} />;
    } else if (mode === 'history') {
      return <HistoryList projectId={projectId} onClose={handleClose} />;
    }
    return null;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">
          {mode === 'edit' ? 'Editar Acuerdo' : mode === 'update' ? 'Actualizar Acuerdo' : 'Historial de Actualizaciones'}
        </h2>
        {renderContent()}
      </Box>
    </Modal>
  );
};

export default ProjectModal;
