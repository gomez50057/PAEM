import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import './Formulario.css';

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
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      completed: false
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);

    // Simular el progreso de carga para cada archivo
    newFiles.forEach((newFile, index) => {
      const interval = setInterval(() => {
        setFiles(prevFiles => {
          const updatedFiles = [...prevFiles];
          const currentFileIndex = prevFiles.length - newFiles.length + index;
          const currentFile = updatedFiles[currentFileIndex];

          if (currentFile.progress >= 100) {
            clearInterval(interval);
            currentFile.completed = true;
          } else {
            currentFile.progress += 10;
          }

          return updatedFiles;
        });
      }, 100);
    });
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter(file => file.file !== fileToRemove));
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
              <Field name="nombre" type="text" className="input-field" />
              <ErrorMessage name="nombre" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Apellido Paterno:</label>
              <Field name="apellidoPaterno" type="text" className="input-field" />
              <ErrorMessage name="apellidoPaterno" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Apellido Materno:</label>
              <Field name="apellidoMaterno" type="text" className="input-field" />
              <ErrorMessage name="apellidoMaterno" component="div" className="error-message" />
            </div>
          </div>

          <div className="form-group">
            <label>Área de Adscripción:</label>
            <Field name="areaAdscripcion" type="text" className="input-field" />
            <ErrorMessage name="areaAdscripcion" component="div" className="error-message" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono:</label>
              <Field name="telefono" type="text" className="input-field" />
              <ErrorMessage name="telefono" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Extensión:</label>
              <Field name="extension" type="text" className="input-field" />
              <ErrorMessage name="extension" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Correo Electrónico:</label>
              <Field name="correo" type="email" className="input-field" />
              <ErrorMessage name="correo" component="div" className="error-message" />
            </div>
          </div>

          <h2>Acuerdo</h2>
          <div className="form-group">
            <label>Nombre del Acuerdo:</label>
            <Field name="nombreAcuerdo" type="text" className="input-field" />
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
                setFieldValue('documentos', [...files.map(fileObj => fileObj.file), ...acceptedFiles]);
                handleDrop(acceptedFiles);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  {files.length === 0 && (
                    <>
                      <img src="https://img.freepik.com/vector-gratis/concepto-carga-imagen-pagina-destino_23-2148317961.jpg?t=st=1723946936~exp=1723950536~hmac=3163d11aee43ae0f7504e508d5d937fe77df8112519430e8b420daeca36353e6&w=996" alt="Icono de archivo" />
                      <div className="dropzone-txt">
                        <p>Arrastra y suelta <span className="highlight">imágenes, vídeos o cualquier archivo</span></p>
                        <p>o<span className="highlight"> buscar archivos</span> en su computadora</p>
                      </div>
                    </>
                  )}
                  <div className="file-preview">
                    {files.map((fileObj, index) => (
                      <div key={index} className="file-preview-item">
                        <img src={fileObj.preview} alt={`Documento ${index + 1}`} />
                        {fileObj.completed ? (
                          <>
                            <div className="checkmark-circle">
                              <svg viewBox="0 0 52 52" className="checkmark">
                                <circle cx="26" cy="26" r="25" fill="none" />
                                <path d="M14 27l8 8 16-16" fill="none" />
                              </svg>
                            </div>
                            <div className="file-details">
                              <p>{fileObj.file.name}</p>
                              <button type="button" onClick={() => handleRemoveFile(fileObj.file)}>
                                Eliminar
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="progress-bar">
                            <div className="progress" style={{ width: `${fileObj.progress}%` }}></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Dropzone>
            <ErrorMessage name="documentos" component="div" className="error-message" />
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};

export default Formulario;