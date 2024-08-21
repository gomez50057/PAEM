import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioBase from './FormularioBase'; 
import './Formulario.css';

const EditFormulario = ({ id }) => {
  const [initialValues, setInitialValues] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Aquí se haría la llamada a la API para obtener los datos del formulario existente
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/formularios/${id}/`);
        const data = response.data;
        
        // Establecer valores iniciales, incluidas las rutas de archivos o datos existentes
        setInitialValues({
          fecha: data.fecha,
          nombre: data.nombre,
          apellidoPaterno: data.apellido_paterno,
          apellidoMaterno: data.apellido_materno,
          areaAdscripcion: data.area_adscripcion,
          telefono: data.telefono,
          extension: data.extension,
          correo: data.correo,
          descripcionAcuerdo: data.descripcion_acuerdo,
          descripcionAvance: data.descripcion_avance,
          documentos: data.documentos || []
        });
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, [id]);

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
      const response = await axios.put(`http://localhost:8000/api/formularios/${id}/`, formData, {
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

  if (!initialValues) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="edit-formulario">
      <FormularioBase
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditFormulario;
