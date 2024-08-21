import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Formulario from '../forms/EditFormulario';
import axios from 'axios';

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
  const [initialValues, setInitialValues] = React.useState(null);

  useEffect(() => {
    if (open && projectId) {
      const fetchProjectData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/formularios/4/`);
          setInitialValues(response.data);
        } catch (error) {
          console.error('Error fetching project data:', error);
        }
      };

      fetchProjectData();
    }
  }, [open, projectId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Editar Acuerdo</h2>
        {initialValues ? (
          <Formulario initialValues={initialValues} />
        ) : (
          <p>Cargando datos...</p>
        )}
      </Box>
    </Modal>
  );
};

export default ProjectModal;
