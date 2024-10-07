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
    formData.append('fecha_creacion', values.fecha);
    formData.append('nombre', values.nombre);
    formData.append('apellido_paterno', values.apellidoPaterno);
    formData.append('apellido_materno', values.apellidoMaterno);
    formData.append('area_adscripcion', values.areaAdscripcion);
    formData.append('telefono', values.telefono);
    formData.append('extension', values.extension);
    formData.append('correo', values.correo);
    formData.append('descripcion_acuerdo', values.descripcionAcuerdo);
    formData.append('estado', values.estado);
    formData.append('comision', values.comision);

    // Asegúrate de que `files` es un arreglo de archivos que proviene de tu componente de Dropzone.
    files.forEach((file, index) => {
      formData.append('documentos', file.file);  // Usa 'documentos' para múltiples archivos
    });

    try {
      const response = await axios.post('http://localhost:8000/api/acuerdos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Formulario enviado:', response.data);
      setModalIsOpen(true);  
      resetForm(); 
      setFiles([]);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      console.log('Error details:', error.response.data);  // Añade esta línea
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

  return (
    <div className="create-formulario">
      <FormularioBase
        initialValues={{
          fecha: '',
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          areaAdscripcion: '',
          telefono: '',
          extension: '',
          correo: '',
          descripcionAcuerdo: '',
          descripcionAvance: '',
          documentos: [],  // Aquí es donde los archivos se almacenarán
          estado: '', // Valor será seleccionado en el formulario
          comision: '' // Valor será seleccionado en el formulario
        }}
        onSubmit={handleSubmit}
        files={files}
        setFiles={setFiles}  // Esto asegura que los archivos que subes se manejan correctamente
        showDescripcionAvance={false} // No mostrar el campo de 'Descripción del Avance'
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
