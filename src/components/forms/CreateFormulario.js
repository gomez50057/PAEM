import React, { useState } from 'react';
import axios from 'axios';
import FormularioBase from './FormularioBase'; 
import './Formulario.css';

const CreateFormulario = () => {
  const [files, setFiles] = useState([]);

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
      formData.append(`documentos_${index}`, file.file);
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
      />
    </div>
  );
};

export default CreateFormulario;
