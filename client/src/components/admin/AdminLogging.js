import React from "react";
import tennisappDatabase from "../../services/tennisappDatabase";
import AdminUser from "./AdminUser";
import Alert from "../Alerts";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";

function AdminLogging() {
  const dispatch = useDispatch();
  const adminUser = useSelector((state) => state.admin);

  const handleLogging = (values) => {
    tennisappDatabase
      .getBooker(values.email, values.password)
      .then((initialAdmin) => {
        if (initialAdmin[0].admin === "yes") {
          dispatch({ type: "admin/adminTrue", payload: true });
        } else {
          Alert(
            "",
            "Kirjautumistietosi ovat virheelliset!",
            "",
            [false, true],
            false
          );
        }
      })

      .catch((err) => {
        console.log(err.message);
        Alert(
          "",
          "Kirjautumistietosi ovat virheelliset!",
          "",
          [false, true],
          false
        );
      });
  };

  return (
    <div>
      {adminUser ? (
        <AdminUser />
      ) : (
        <div className="adminLogging">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
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
              <Form onSubmit={handleSubmit} className="adminLogging-style">
                <h3 className="bookerinfo-title">Kirjaudu sisälle:</h3>

                <div className="form-group">
                  <label className="bookerinfo-label" name="email">
                    Sähköpostiosoite:
                  </label>

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
                      id="submitAdmin"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Kirjaudu
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default AdminLogging;
