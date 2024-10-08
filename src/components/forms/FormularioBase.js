import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FileUploader from './FileUploader';
import MinutaUploader from './MinutaUploader';
import './Formulario.css';
import { comisiones } from '../../utils/comisiones';

const validationSchema = Yup.object().shape({
  estado: Yup.string().required('El nombre es obligatorio'),
  comision: Yup.string().required('El nombre es obligatorio'),
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellidoPaterno: Yup.string().required('El apellido paterno es obligatorio'),
  apellidoMaterno: Yup.string().required('El apellido materno es obligatorio'),
  areaAdscripcion: Yup.string().required('El área de adscripción es obligatoria'),
  telefono: Yup.string()
    .matches(/^\d{10}$/, 'El teléfono debe tener exactamente 10 dígitos')
    .required('El teléfono es obligatorio'),
  extension: Yup.string(),
  correo: Yup.string().email('Correo electrónico inválido').required('El correo es obligatorio'),
  descripcionAcuerdo: Yup.string()
    .max(5000, 'La descripción del acuerdo no debe exceder 5000 caracteres')
    .required('La descripción del acuerdo es obligatorio'),
  // descripcionAvance: Yup.string()
  //   .max(5000, 'La descripción del avance no debe exceder 5000 caracteres')
  //   .required('La descripción del avance es obligatoria'),
});

const FormularioBase = ({ initialValues, onSubmit, files, setFiles, minuta, setMinuta, disableFields = {}, showDescripcionAvance = false }) => {
  const formatPhoneNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    return cleanedValue.length <= 3
      ? cleanedValue
      : cleanedValue.length <= 6
        ? `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3)}`
        : `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6)}`;
  };

  const handlePhoneNumberChange = (e, setFieldValue) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length <= 10) {
      setFieldValue('telefono', cleanedValue);
      setFieldValue('telefonoFormateado', formatPhoneNumber(cleanedValue));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={false}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="formulario-container">
          <h2>Datos Generales</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Fecha:</label>
              <Field name="fecha" type="date" className="input-field" disabled={disableFields.descripcionAcuerdo} />
            </div>
            <div className="form-group">
              <label>Estado:</label>
              <Field name="estado" as="select" className="input-field" disabled={disableFields.descripcionAcuerdo} >
                <option value="">Selecciona un estado</option>
                <option value="Estado de México">Estado de México</option>
                <option value="Ciudad de México">Ciudad de México</option>
                <option value="Hidalgo">Hidalgo</option>
              </Field>
              <ErrorMessage name="estado" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label>Comisión:</label>
              <Field name="comision" as="select" className="input-field" disabled={disableFields.descripcionAcuerdo} >
                <option value="">Selecciona una comisión</option>
                {comisiones && comisiones.length > 0 ? (
                  comisiones.map((comision, index) => (
                    <option key={index} value={comision.value}>
                      {comision.label}
                    </option>
                  ))
                ) : (
                  <option value="">Cargando comisiones...</option>
                )}
              </Field>
              <ErrorMessage name="comision" component="div" className="error-message" />
            </div>
          </div>

          {/* Existing fields */}
          <div className="form-row">
            <div className="form-group">
              <label>Nombre:</label>
              <Field name="nombre" type="text" className="input-field" placeholder="Julio" />
              <ErrorMessage name="nombre" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Apellido Paterno:</label>
              <Field name="apellidoPaterno" type="text" className="input-field" placeholder="Menchaca" />
              <ErrorMessage name="apellidoPaterno" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Apellido Materno:</label>
              <Field name="apellidoMaterno" type="text" className="input-field" placeholder="Salazar" />
              <ErrorMessage name="apellidoMaterno" component="div" className="error-message" />
            </div>
          </div>

          <div className="form-group">
            <label>Área de Adscripción:</label>
            <Field name="areaAdscripcion" type="text" className="input-field" placeholder="Agrega el área donde trabajas" />
            <ErrorMessage name="areaAdscripcion" component="div" className="error-message" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono:</label>
              <Field
                name="telefono"
                type="tel"
                className="input-field"
                placeholder="771-717-6000"
                value={values.telefonoFormateado || formatPhoneNumber(values.telefono)}
                onChange={(e) => handlePhoneNumberChange(e, setFieldValue)}
              />
              <ErrorMessage name="telefono" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Extensión:</label>
              <Field
                name="extension"
                type="text"
                className="input-field"
                placeholder="6633"
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d*$/.test(value)) {
                    setFieldValue('extension', value);
                  }
                }}
              />
              <ErrorMessage name="extension" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Correo Electrónico:</label>
              <Field name="correo" type="email" className="input-field" placeholder="cg.planeacion@hidalgo.gob.mx" />
              <ErrorMessage name="correo" component="div" className="error-message" />
            </div>
          </div>

          <h2>Acuerdo</h2>
          <div className="form-group">
            <label>Descripción del Acuerdo:</label>
            <Field name="descripcionAcuerdo" as="textarea" rows="5" className="input-field" placeholder="Agrega una descripción del acuerdo no mayor a 5000 caracteres" disabled={disableFields.descripcionAcuerdo} />
            <ErrorMessage name="descripcionAcuerdo" component="div" className="error-message" />
          </div>

          {/* Solo muestra el campo "Descripción del Avance" si la prop showDescripcionAvance es true */}
          {showDescripcionAvance && (
            <div className="form-group">
              <label>Descripción del Avance:</label>
              <Field name="descripcionAvance" as="textarea" rows="5" className="input-field" placeholder="Agrega una descripción del avance no mayor a 5000 caracteres" />
              <ErrorMessage name="descripcionAvance" component="div" className="error-message" />
            </div>
          )}

          <div className="form-group">
            <label>Minuta:</label>
            <p>En esta sección, puedes cargar la minuta del proyecto en formato PDF. Recuerda que solo se permite subir un único archivo y debe ser exclusivamente en formato PDF. Asegúrate de que el archivo contiene toda la información relevante antes de realizar la subida.</p>
            <MinutaUploader minuta={minuta} setMinuta={setMinuta} />
          </div>

          <div className="form-group">
            <label>Documentos Anexos(evidencia):</label>
            <p>En esta sección, puedes cargar todos los anexos relacionados con el proyecto, excepto la minuta. Puedes subir archivos en formato de imágenes, vídeos o cualquier otro tipo de documento. Asegúrate de incluir toda la información adicional que respalde tu proyecto.</p>
            <FileUploader onFilesChange={setFiles} />
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioBase;
