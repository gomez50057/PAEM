import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { municipiosDeHidalgo } from "../../utils/utils";
import "../forms/Formulario.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre del proyecto es obligatorio.")
    .max(100, "El nombre no puede superar los 100 caracteres."),
  description: Yup.string()
    .required("La descripción es obligatoria.")
    .max(500, "La descripción no puede superar los 500 caracteres."),
  municipalities: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .min(1, "Debe seleccionar al menos un municipio."),
});

// Convertimos la lista de municipios al formato esperado por `react-select`
const municipalityOptions = municipiosDeHidalgo.map((municipio) => ({
  label: municipio,
  value: municipio,
}));

// Componente del formulario
const ChatForms = ({ handleMenuClick }) => (
  <div>
    <p>¡Perfecto! Por favor responde las siguientes preguntas:</p>
    <Formik
      initialValues={{
        name: "",
        description: "",
        municipalities: [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        // Manejar envío del formulario
        console.log("Formulario enviado con los valores:", values);
        handleMenuClick("proposalThanks");
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="formulario-container">
          <div className="form-group">
            <label htmlFor="name">¿Cómo se llama tu proyecto?</label>
            <Field
              name="name"
              type="text"
              className="input-field"
              placeholder="Escribe el nombre de tu proyecto"
            />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="description">¿En qué consiste? (Máximo 500 caracteres)</label>
            <Field
              name="description"
              as="textarea"
              className="input-field"
              placeholder="Describe tu proyecto"
              maxLength="500"
            />
            <ErrorMessage name="description" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="municipalities">¿Cuáles municipios comprende?</label>
            <Select
              options={municipalityOptions}
              isMulti
              name="municipalities"
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Selecciona uno o más municipios"
              onChange={(selectedOptions) => setFieldValue("municipalities", selectedOptions)}
              value={values.municipalities}
            />
            <ErrorMessage name="municipalities" component="div" className="error-message" />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ChatForms;
