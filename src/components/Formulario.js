"use client";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import './Formulario.css';

// Esquema de validación de Formik con Yup
const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellidoPaterno: Yup.string().required('El apellido paterno es obligatorio'),
  apellidoMaterno: Yup.string().required('El apellido materno es obligatorio'),
  areaAdscripcion: Yup.string().required('El área de adscripción es obligatoria'),
  telefono: Yup.string().required('El teléfono es obligatorio'),
  extension: Yup.string(),
  correo: Yup.string().email('Correo electrónico inválido').required('El correo es obligatorio'),
  nombreAcuerdo: Yup.string()
    .max(250, 'El nombre del acuerdo no debe exceder 250 caracteres')
    .required('El nombre del acuerdo es obligatorio'),
  descripcionAvance: Yup.string()
    .max(5000, 'La descripción del avance no debe exceder 5000 caracteres')
    .required('La descripción del avance es obligatoria'),
  documentos: Yup.array().min(1, 'Debes cargar al menos un documento como evidencia')
});

const Formulario = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  };

  return (
    <Formik
      initialValues={{
        fecha: new Date().toISOString().slice(0, 10),
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        areaAdscripcion: '',
        telefono: '',
        extension: '',
        correo: '',
        nombreAcuerdo: '',
        descripcionAvance: '',
        documentos: []
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Manejo de la acción de envío de formulario
        console.log('Formulario enviado:', values);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="formulario-container">
          <h2>Datos Generales</h2>
          <div className="form-group">
            <label>Fecha:</label>
            <Field name="fecha" type="text" disabled className="input-field" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nombre:</label>
              <Field name="nombre" type="text" className="input-field" placeholder="Julio" />
              <ErrorMessage name="nombre" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Apellido Paterno:</label>
              <Field name="apellidoPaterno" type="text" className="input-field" placeholder="Menchaca"/>
              <ErrorMessage name="apellidoPaterno" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Apellido Materno:</label>
              <Field name="apellidoMaterno" type="text" className="input-field" placeholder="Salazar"/>
              <ErrorMessage name="apellidoMaterno" component="div" className="error-message" />
            </div>
          </div>

          <div className="form-group">
            <label>Área de Adscripción:</label>
            <Field name="areaAdscripcion" type="text" className="input-field" placeholder="jefazo"/>
            <ErrorMessage name="areaAdscripcion" component="div" className="error-message" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono:</label>
              <Field name="telefono" type="text" className="input-field" placeholder="771 717 6000" />
              <ErrorMessage name="telefono" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Extensión:</label>
              <Field name="extension" type="text" className="input-field" placeholder="6633"/>
              <ErrorMessage name="extension" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Correo Electrónico:</label>
              <Field name="correo" type="email" className="input-field" placeholder="cg.planeacion@hidalgo.gob.mx"/>
              <ErrorMessage name="correo" component="div" className="error-message" />
            </div>
          </div>

          <h2>Acuerdo</h2>
          <div className="form-group">
            <label>Nombre del Acuerdo:</label>
            <Field name="nombreAcuerdo" type="text" className="input-field" placeholder=""/>
            <ErrorMessage name="nombreAcuerdo" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Descripción del Avance:</label>
            <Field name="descripcionAvance" as="textarea" rows="5" className="input-field" />
            <ErrorMessage name="descripcionAvance" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Documentos (evidencia):</label>
            <Dropzone
              onDrop={(acceptedFiles) => {
                setFieldValue('documentos', acceptedFiles);
                handleDrop(acceptedFiles);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>Arrastra y suelta los archivos aquí, o haz clic para seleccionarlos</p>
                </div>
              )}
            </Dropzone>
            <ErrorMessage name="documentos" component="div" className="error-message" />
            <div className="file-preview">
              {files.map((file, index) => (
                <div key={index} className="file-preview-item">
                  <img src={file.preview} alt={`Documento ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};

export default Formulario;
