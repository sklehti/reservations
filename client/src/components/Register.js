import React from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alerts";
import tennisappDatabase from "../services/tennisappDatabase";
import { Formik, Form } from "formik";

function Register({ rightBooker }) {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const booking = {
      ...rightBooker,
      name: values.name,
      address: values.address,
      email: values.email,
      password: values.password,
    };

    if (
      values.name.length > 0 &&
      values.address.length > 0 &&
      values.email.length > 0 &&
      values.password.length > 0
    ) {
      tennisappDatabase
        .getUserEmail(booking.email)
        .then((initialUser) => {
          if (initialUser[0].lkm < 1) {
            Alert(
              "Haluatko varmasti varata seuraavan vuoron:",
              `${rightBooker.date} klo ${rightBooker.time}, ${rightBooker.field}`,
              "success",
              true,
              false
            ).then((willSave) => {
              if (willSave) {
                Alert(
                  "Kiitos varauksestasi!",
                  "Voit tarkastella varauksiasi Varaukset-sivulta.",
                  "success",
                  "Ok!",
                  false
                );

                tennisappDatabase.createUserWithBooking(booking);

                navigate("/");
              } else {
                Alert("", "Varaus ei tallentunut!", "", [false, true], false);
              }
            });
          } else {
            Alert(
              "",
              "Kirjautumistietosi ovat virheelliset tai kyseiset tunnukset ovat jo olemassa! Varaus ei onnistunut.",
              "",
              [false, true],
              false
            );
          }
        })

        .catch((err) => {
          Alert(
            "",
            "Kirjautumistietosi ovat virheelliset! Varaus ei onnistunut.",
            "",
            [false, true],
            false
          );
        });
    } else {
      Alert("", "Täytä kaikki tekstikentät!", "", [false, true], false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ name: "", address: "", email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Täytä";
          }
          if (!values.address) {
            errors.address = "Täytä";
          }
          if (!values.email) {
            errors.email = "Täytä";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Virheellinen sähköpostiosoite";
          }
          if (!values.password) {
            errors.password = "Täytä";
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
          <Form className="logging-form" onSubmit={handleSubmit}>
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
              <label name="address">Osoite:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Osoite"
                name="address"
                value={values.address}
                onChange={handleChange}
              />
              {errors.address && touched.address && (
                <p style={{ color: "red", fontStyle: "italic" }}>
                  {errors.address}
                </p>
              )}
            </div>
            <div className="form-group">
              <label name="email">Sähköposti:</label>
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
              <label name="password">Salasana:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="salasana"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && touched.password && (
                <p style={{ color: "red", fontStyle: "italic" }}>
                  {errors.password}
                </p>
              )}
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Varaa
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
