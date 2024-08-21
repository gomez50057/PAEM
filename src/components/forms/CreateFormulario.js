import React, { useState } from 'react';
import axios from 'axios';
import FormularioBase from './FormularioBase'; 
import AgreementSuccessModal from './AgreementSuccessModal';
import './Formulario.css';

const CreateFormulario = () => {
  const [files, setFiles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

    files.forEach((file, index) => {
      formData.append(`documentos_${index}`, file.file);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/formularios/', formData, {
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
    // Limpia los datos del formulario y los archivos subidos
    setFiles([]);
  };

  const handleGoToHome = () => {
    setModalIsOpen(false);
    // Lógica para redirigir a la página principal si es necesario
  };

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
          documentos: []
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
