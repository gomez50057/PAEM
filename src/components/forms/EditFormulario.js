import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioBase from './FormularioBase'; 
import AgreementSuccessModal from './AgreementSuccessModal';
import './Formulario.css';

const EditFormulario = ({ projectId, onClose }) => {
  const [files, setFiles] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcuerdoData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/acuerdos/${projectId}/`);
        const acuerdoData = response.data;

        setInitialValues({
          fecha: acuerdoData.fecha || new Date().toISOString().slice(0, 10),
          nombre: acuerdoData.nombre || '',
          apellidoPaterno: acuerdoData.apellido_paterno || '',
          apellidoMaterno: acuerdoData.apellido_materno || '',
          areaAdscripcion: acuerdoData.area_adscripcion || '',
          telefono: acuerdoData.telefono || '',
          extension: acuerdoData.extension || '',
          correo: acuerdoData.correo || '',
          descripcionAcuerdo: acuerdoData.descripcion_acuerdo || '',
          descripcionAvance: acuerdoData.descripcion_avance || '',
          documentos: Array.isArray(acuerdoData.documentos) ? acuerdoData.documentos : []
        });

        // Verifica si documentos es un array antes de usar .map()
        setFiles(Array.isArray(acuerdoData.documentos) ? acuerdoData.documentos.map((doc) => ({
          file: null,
          preview: doc.url,
          progress: 100,
          completed: true
        })) : []);

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos del acuerdo:', error);
        setLoading(false);
      }
    };

    if (projectId) {
      fetchAcuerdoData();
    }
  }, [projectId]);

  const handleSubmit = async (values, { setSubmitting }) => {
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
      if (file.file) {
        formData.append(`documentos_${index}`, file.file);
      }
    });

    try {
      const response = await axios.put(`http://localhost:8000/api/acuerdos/${projectId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Formulario actualizado:', response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    onClose();
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
    onClose();
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="edit-formulario">
      <FormularioBase
        initialValues={initialValues}
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

export default EditFormulario;
