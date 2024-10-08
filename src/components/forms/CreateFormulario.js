import React, { useState } from 'react';
import axios from 'axios';
import FormularioBase from './FormularioBase';
import AgreementSuccessModal from './AgreementSuccessModal';
import './Formulario.css';

const CreateFormulario = () => {
  const [files, setFiles] = useState([]);  // Para documentos
  const [minuta, setMinuta] = useState(null);  // Para la minuta
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

    // Adjuntar archivos de documentos
    if (files.length > 0) {
      files.forEach((file, index) => {
        formData.append('documentos', file.file);  // Adjuntar como 'documentos'
      });
    } else {
      console.warn('No se han subido documentos.');
    }

    // Adjuntar archivo de minuta si está presente
    if (minuta) {
      formData.append('minuta', minuta.file);  // Agregar el archivo de la minuta
    } else {
      console.warn('No se ha subido la minuta.');
    }

    try {
      const response = await axios.post('http://localhost:8000/api/acuerdos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Formulario enviado:', response.data);

      // Limpiar el formulario y el estado de archivos después del envío exitoso
      setFiles([]);  // Limpiar archivos
      setMinuta(null);  // Limpiar minuta
      resetForm();  // Limpiar el formulario

      // Abre el modal de éxito
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      console.log('Error details:', error.response?.data);
    } finally {
      setSubmitting(false);  // Permitir que el usuario envíe el formulario nuevamente
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateNewAgreement = () => {
    setModalIsOpen(false);
    setFiles([]);  // Limpiar archivos
    setMinuta(null);  // Limpiar minuta
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
          minuta: '',
          documentos: [],
          estado: '',
          comision: ''
        }}
        onSubmit={handleSubmit}
        files={files}
        setFiles={setFiles}
        minuta={minuta}
        setMinuta={setMinuta}
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
