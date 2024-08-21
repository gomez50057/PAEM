import React, { useEffect, useState } from 'react';
import FormularioBase from './FormularioBase';
import axios from 'axios';

const EditFormulario = ({ projectId }) => {
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/formularios/${projectId}/`);
        setInitialValues(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key !== 'documentos') {
        formData.append(key, values[key]);
      }
    });
    values.documentos.forEach((file, index) => {
      formData.append(`documentos_${index}`, file);
    });

    try {
      const response = await axios.put(`http://localhost:8000/api/formularios/${projectId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Formulario actualizado:', response.data);
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!initialValues) return <p>Cargando...</p>;

  return <FormularioBase initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default EditFormulario;
