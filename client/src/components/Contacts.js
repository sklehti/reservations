import React from "react";
import Image from "react-bootstrap/Image";
import Image1 from "../images/contact-page.jpg";
import tennisappDatabase from "../services/tennisappDatabase";
import { useNavigate } from "react-router-dom";
import Alert from "./Alerts";
import { Formik, Form } from "formik";

function Contacts() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const messageInfo = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };

    Alert("Haluatko lähettää viestin?", "", "", true, false).then(
      (willSend) => {
        if (willSend) {
          tennisappDatabase.createMessage(messageInfo);

          Alert("Viesti on lähetetty!", "", "success", "Ok!", false);

          navigate("/");
        } else {
          Alert(
            "",
            "Viestin lähettäminen ei onnistunut!",
            "",
            [false, true],
            false
          );
        }
      }
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="title-style">Ota meihin yhteyttä:</h1>
      <div className="contact-div">
        <Formik
          initialValues={{ name: "", email: "", subject: "", message: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Täytä";
            }
            if (!values.email) {
              errors.email = "Täytä";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Virheellinen sähköpostiosoite";
            }
            if (!values.subject) {
              errors.subject = "Täytä";
            }
            if (!values.message) {
              errors.message = "Täytä";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            if (handleSubmit(values)) resetForm({ values: "" });
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
            <Form className="basic-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label name="name">Nimi:</label>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Nimi"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <p style={{ color: "red", fontStyle: "italic" }}>
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label name="email">Sähköpostiosoite:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Sähköposti"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <p style={{ color: "red", fontStyle: "italic" }}>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label name="subject">Viestin aihe:</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Viestin aihe"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                />
                {errors.subject && touched.subject && (
                  <p style={{ color: "red", fontStyle: "italic" }}>
                    {errors.subject}
                  </p>
                )}
              </div>
              <div>
                <div className="form-group">
                  <label name="message">Viesti:</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="message"
                    placeholder="Kirjoita tekstiä..."
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                  />
                  {errors.message && touched.message && (
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  className="btn btn-primary"
                  style={{ marginTop: "30px" }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Lähetä
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Image
        alt="etusivun kuva"
        src={Image1}
        style={{ width: "100%" }}
        className="img-fluid image-style2"
      />
    </div>
  );
}

export default Contacts;
