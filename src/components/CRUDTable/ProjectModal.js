import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditFormulario from '../forms/EditFormulario';

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

const ProjectModal = ({ open, handleClose, projectId }) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Editar Acuerdo</h2>
        <EditFormulario projectId={projectId} /> 
      </Box>
    </Modal>
  );
};

export default ProjectModal;
