import React from "react";
import tennisappDatabase from "../../services/tennisappDatabase";
import Alert from "../Alerts";
import { Formik, Form } from "formik";
import { bookerInfoUser } from "../../reducers/bookerInfoUserReducer";
import { useSelector, useDispatch } from "react-redux";

function UpdateBookerInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = (values) => {
    const booking = {
      name: values.name,
      address: values.address,
      email: user.email,
      password: user.password,
    };

    Alert(
      "Haluatko varmasti muuttaa yhteystiedot?",
      `nimi: ${values.name}, osoite: ${values.address}`,
      "",
      true,
      false
    ).then((willUpdate) => {
      if (willUpdate) {
        tennisappDatabase.updateUserInfo(booking);
        dispatch(bookerInfoUser(booking));

        Alert("Yhteystietosi ovat nyt muutettu!", "", "success", "Ok!", false);
      } else {
        Alert(
          "",
          "Yhteystietojen muuttaminen ei onnistunut!",
          "",
          [false, true],
          false
        );
      }
    });
  };

  return (
    <div>
      <Formik
        initialValues={{ name: user.name, address: user.address }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Täytä";
          }
          if (!values.address) {
            errors.address = "Täytä";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          resetForm({ values: { name: "", address: "" } });
          handleSubmit(values);
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

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Muokkaa
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateBookerInfo;
