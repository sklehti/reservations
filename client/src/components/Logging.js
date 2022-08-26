import React from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import tennisappDatabase from "../services/tennisappDatabase";
import Alert from "./Alerts";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";

function Logging({ rightBooker }) {
  const dispatch = useDispatch();
  const logging = useSelector((state) => state.logging);

  const navigate = useNavigate();

  const handleLogging = (values) => {
    if (values.email === "" || values.password === "") {
      values = {
        email: "not_acceptable",
        password: "not_acceptable",
      };
    }

    tennisappDatabase
      .getBooker(values.email, values.password)
      .then((initialBooker) => {
        if (initialBooker[0] !== undefined) {
          const booking = {
            ...rightBooker,
            email: initialBooker[0].email,
          };

          Alert(
            "Haluatko varmasti varata seuraavan vuoron:",
            `${rightBooker.date} klo ${rightBooker.time}, ${rightBooker.field}`,
            "",
            true,
            false
          ).then((willSave) => {
            if (willSave) {
              tennisappDatabase.createBooking(booking);

              dispatch({
                type: "logging/registeredTrue",
                payload: true,
              });

              Alert(
                "Kiitos varauksestasi!",
                "Voit tarkastella varauksiasi Varaukset-sivulta.",
                "success",
                "Ok!",
                false
              );

              navigate("/");
            } else {
              Alert("", "Varaus ei tallentunut!", "", [false, true], false);
            }
          });
        } else {
          Alert(
            "",
            "Kirjautumistietosi ovat virheelliset!",
            "",
            [false, true],
            false
          );

          dispatch({
            type: "logging/registeredTrue",
            payload: true,
          });
        }
      })

      .catch((err) => {
        console.log(err.message);
        Alert(
          "",
          "Kirjautumistietojasi ovat virheelliset! Varaus ei onnistunut.",
          "",
          [false, true],
          false
        );
      });
  };

  const handleRegisterInfo = (e) => {
    e.preventDefault();

    dispatch({
      type: "logging/registeredFalse",
      payload: false,
    });
  };

  return (
    <div style={{ marginBottom: "8%" }}>
      {logging === true ? (
        <div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
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
              handleLogging(values);

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
                  <h3>Kirjaudu sisälle:</h3>
                  <div>
                    <label className="bookerinfo-label" name="email">
                      Sähköpostiosoite:
                    </label>
                  </div>

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
                  <div>
                    <div className="form-group">
                      <label className="bookerinfo-label" name="password">
                        Salasana:
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Salasana"
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
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary button-style-primary"
                    >
                      Varaa
                    </button>

                    <button
                      type="button"
                      class="btn btn-secondary button-style-secondary"
                      onClick={handleRegisterInfo}
                    >
                      Rekisteröidy
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div>
          <Register rightBooker={rightBooker} />
        </div>
      )}
    </div>
  );
}

export default Logging;
