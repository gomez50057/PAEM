"use client";

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AgreementSuccessModal from './AgreementSuccessModal';
import styles from './FormularioCarga.module.css';
import validationSchema from './validationSchema';
import FileUploader from './FileUploader';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const FormularioCarga = () => {
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('nombre', values.nombre);
    formData.append('descripcion', values.descripcion);
    formData.append('nombre_contacto', values.nombre_contacto);
    formData.append('numero_contacto', values.numero_contacto);
    formData.append('extension', values.extension);

    // Se itera sobre los archivos del FileUploader
    files.forEach(fileObj => {
      formData.append('archivos', fileObj.file);
    });

    try {
      const response = await fetch(`${apiUrl}/api/file-upload/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMsg;
        if (contentType && contentType.indexOf('application/json') !== -1) {
          errorMsg = await response.json();
        } else {
          errorMsg = await response.text();
        }
        console.error('Error de validación:', errorMsg);
        alert('Ocurrió un error al enviar el formulario.');
        return;
      }

      // Procesa la respuesta exitosa
      resetForm();
      setFiles([]);
      setIsModalOpen(true);
      setResetTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error al enviar:', error);
    }
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

            <div className={styles.formRow}>
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
            </div>

            <div className={styles.formGroup}>
              <label>Documentos Anexos (evidencia):</label>
              <p>
                En esta sección, puedes cargar todos los anexos relacionados con el proyecto, excepto la minuta.
                Puedes subir archivos en formato de imágenes, vídeos o cualquier otro tipo de documento. Asegúrate
                de incluir toda la información adicional que respalde tu proyecto.
              </p>
              <FileUploader key={resetTrigger} onFilesChange={setFiles} resetTrigger={resetTrigger} />

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
