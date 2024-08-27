import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioBase from './FormularioBase';
import AgreementSuccessModal from './AgreementSuccessModal';
import './Formulario.css';

const CreateFormulario = () => {
  const [files, setFiles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userState, setUserState] = useState(null); // Cambia el valor inicial a null
  const [userCommission, setUserCommission] = useState(null); // Cambia el valor inicial a null

  useEffect(() => {
    // Accede a localStorage solo cuando el componente esté montado en el cliente
    if (typeof window !== 'undefined') {
      setUserState(localStorage.getItem('userState') || '');
      setUserCommission(localStorage.getItem('userCommission') || '');
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('fecha', values.fecha);
    formData.append('nombre', values.nombre);
    formData.append('apellido_paterno', values.apellidoPaterno);
    formData.append('apellido_materno', values.apellidoMaterno);
    formData.append('area_adscripcion', values.areaAdscripcion);
    formData.append('telefono', values.telefono);
    formData.append('extension', values.extension);
    formData.append('correo', values.correo);
    formData.append('descripcion_acuerdo', values.descripcionAcuerdo);
    formData.append('descripcion_avance', values.descripcionAvance);
    formData.append('estado', values.estado);
    formData.append('comision', values.comision);

    files.forEach((file, index) => {
      formData.append(`documentos_${index}`, file.file);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/acuerdos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Formulario enviado:', response.data);
      setModalIsOpen(true);  // Abre el modal al enviar el formulario con éxito
      resetForm(); // Limpia los datos del formulario
      setFiles([]); // Limpia los archivos subidos
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateNewAgreement = () => {
    setModalIsOpen(false);
    setFiles([]);
    const container = document.querySelector('.dashboard-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToHome = () => {
    setModalIsOpen(false);
  };

  if (userState === null || userCommission === null) {
    return null; // O un spinner/cargando mientras se obtiene el estado del usuario
  }

  return (
    <div className="create-formulario">
      <FormularioBase
        initialValues={{
          fecha: new Date().toISOString().slice(0, 10),
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          areaAdscripcion: '',
          telefono: '',
          extension: '',
          correo: '',
          descripcionAcuerdo: '',
          descripcionAvance: '',
          documentos: [],
          estado: userState, // Usa el estado obtenido de localStorage
          comision: userCommission // Usa el estado obtenido de localStorage
        }}
        onSubmit={handleSubmit}
        files={files}
        setFiles={setFiles}
      />
      <AgreementSuccessModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        onCreateNewAgreement={handleCreateNewAgreement}
        onGoToHome={handleGoToHome}
      />
    </div>
  );
};

export default CreateFormulario;
