import React from 'react';
import FormularioBase from './FormularioBase';
import axios from 'axios';

const CreateFormulario = () => {
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
      const response = await axios.post('http://localhost:8000/api/formularios/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Formulario enviado:', response.data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
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
  };

  return <FormularioBase initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default CreateFormulario;
