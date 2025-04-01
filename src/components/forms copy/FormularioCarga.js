"use client";

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AgreementSuccessModal from './AgreementSuccessModal';
import styles from './FormularioCarga.module.css';
import validationSchema from './validationSchema';
import FileUploader from './FileUploader';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const FormularioCarga = () => {
  const [archivos, setArchivos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]); // Define el estado


  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('nombre', values.nombre);
    formData.append('descripcion', values.descripcion);
    formData.append('nombre_contacto', values.nombre_contacto);
    formData.append('numero_contacto', values.numero_contacto);
    formData.append('extension', values.extension);

    archivos.forEach(file => {
      formData.append('archivos', file);
    });

    try {
      const response = await fetch(`${apiUrl}/api/file-upload/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        console.error('Error de validación:', err);
        alert('Ocurrió un error al enviar el formulario.');
        return;
      }

      resetForm();
      setArchivos([]);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al enviar:', error);
    }
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    const tiposPermitidos = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];

    const archivosValidos = files.filter(file => tiposPermitidos.includes(file.type));
    if (archivosValidos.length !== files.length) {
      alert('Uno o más archivos tienen un formato no permitido.');
    }

    setArchivos(archivosValidos);
  };

  const handleCreateNewAgreement = () => {
    setIsModalOpen(false);
  };

  const handleGoToHome = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          nombre: '',
          descripcion: '',
          nombre_contacto: '',
          numero_contacto: '',
          extension: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.formularioContainer}>
            <h2>Carga de Documentos</h2>

            <div className={styles.formGroup}>
              <label>Nombre del Proyecto:</label>
              <Field name="nombre" type="text" className={styles.inputField} />
              <ErrorMessage name="nombre" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formGroup}>
              <label>Descripción:</label>
              <Field name="descripcion" as="textarea" className={styles.inputField} rows="4" />
              <ErrorMessage name="descripcion" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formGroup}>
              <label>Nombre del Contacto:</label>
              <Field name="nombre_contacto" type="text" className={styles.inputField} />
              <ErrorMessage name="nombre_contacto" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formGroup}>
              <label>Número de Contacto:</label>
              <Field name="numero_contacto" type="tel" className={styles.inputField} />
              <ErrorMessage name="numero_contacto" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formGroup}>
              <label>Extensión Telefónica:</label>
              <Field name="extension" type="text" className={styles.inputField} />
              <ErrorMessage name="extension" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formGroup}>
              <label>Archivos (PDF, PNG, JPEG, XLSX, CSV):</label>
              <input type="file" multiple onChange={handleFileChange} className={styles.inputField} />
              {archivos.length > 0 && (
                <ul className={styles.listaArchivos}>
                  {archivos.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-group">
              <label>Documentos Anexos(evidencia):</label>
              <p>En esta sección, puedes cargar todos los anexos relacionados con el proyecto, excepto la minuta. Puedes subir archivos en formato de imágenes, vídeos o cualquier otro tipo de documento. Asegúrate de incluir toda la información adicional que respalde tu proyecto.</p>
              <FileUploader onFilesChange={setFiles} />
            </div>

            <button type="submit" className={styles.submitButton}>Enviar</button>
          </Form>
        )}
      </Formik>
      <AgreementSuccessModal
        isOpen={isModalOpen}
        onCreateNewAgreement={handleCreateNewAgreement}
        onGoToHome={handleGoToHome}
      />
    </>
  );
};

export default FormularioCarga;
