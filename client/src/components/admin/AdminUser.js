import React from "react";
import tennisappDatabase from "../../services/tennisappDatabase";
import Alert from "../Alerts";
import { Formik, Form } from "formik";

function AdminUser(props) {
  const handleSubmit = (values) => {
    tennisappDatabase.createTopicalIssue(values);
    Alert(
      "",
      "Tarkista Ajankohtaista-sivulta päivittyikö sivu.",
      "",
      [false, true],
      false
    );
  };
  return (
    <div className="adminUser-style">
      <p>
        Kirjoita tähän ajankohtaista asiaa. Se päivittyy automaattisesti
        lähettämisen jälkeen "Ajankohtaista"-sivulle.
      </p>

      <Formik
        initialValues={{ title: "", message: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Täytä";
          }
          if (!values.message) {
            errors.message = "Täytä";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          handleSubmit(values);
          resetForm({ values: "" });
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Otsikko:</label>
              <input
                value={values.title}
                onChange={handleChange}
                className="form-control"
                id="title"
                placeholder="Otsikko"
                name="title"
              />
              {errors.title && touched.title && (
                <p style={{ color: "red", fontStyle: "italic" }}>
                  {errors.title}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Sisältö:</label>
              <textarea
                value={values.message}
                onChange={handleChange}
                className="form-control"
                id="message"
                placeholder="Kirjoita viesti"
                name="message"
              />
              {errors.message && touched.message && (
                <p style={{ color: "red", fontStyle: "italic" }}>
                  {errors.message}
                </p>
              )}
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: "20px", marginBottom: "50px" }}
            >
              Lisää
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminUser;
