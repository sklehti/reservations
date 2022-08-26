import React from "react";
import Image from "react-bootstrap/Image";
import Image1 from "../images/gamebuddy-page.jpg";
import tennisappDatabase from "../services/tennisappDatabase";
import Alert from "./Alerts";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";

function GameBuddy() {
  const dispatch = useDispatch();
  const gameUser = useSelector((state) => state.gameBuddyUser);
  const buddies = useSelector((state) => state.gameBuddies);

  const handleSubmit = (values) => {
    const newUser = {
      name: values.name,
      level: values.level,
      times: values.times,
      email: values.email,
    };

    Alert(
      "Olet tallentamassa seuraavia tietoja:",
      `nimi: ${newUser.name} pelitaso: ${newUser.level} peliaika: ${newUser.times} ja sähköpostiosoite: ${newUser.email}`,
      "",
      true,
      false
    )
      .then((willCreate) => {
        if (willCreate) {
          tennisappDatabase.getGameBuddyUser(newUser.email).then((user) => {
            if (user.length === 0) {
              tennisappDatabase.createGameBuddyUser(newUser);
            } else {
              tennisappDatabase.updateGameBuddyUser(
                newUser.name,
                newUser.level,
                newUser.times,
                newUser.email
              );
            }
          });

          dispatch({
            type: "gameBuddyUser/gameBuddyUser",
            payload: newUser,
          });

          Alert("Tietosi on tallennettu!", "", "success", "Ok!", false);
        } else {
          Alert("", "Tallentaminen ei onnistunut!", "", [false, true], false);
        }
      })
      .then(() => {
        tennisappDatabase
          .getGameBuddies(newUser.level, newUser.times)
          .then((initialBuddies) => {
            dispatch({
              type: "gameBuddies/gameBuddies",
              payload: initialBuddies,
            });
          });
      });

    window.scrollTo(0, 0);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {gameUser.name.length < 1 ? (
        <div>
          <h1 className="title-style">Etsitkö pelikaveria?</h1>
          <Formik
            initialValues={{
              name: "",
              level: "",
              times: "",
              email: "",
              permission: false,
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Täytä";
              }
              if (!values.level) {
                errors.level = "Täytä";
              }
              if (!values.times) {
                errors.times = "Täytä";
              }
              if (!values.email) {
                errors.email = "Täytä";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Virheellinen sähköpostiosoite";
              }
              if (!values.permission) {
                errors.permission = "Täytä";
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
                <h3 style={{ paddingBottom: "40px" }}>Täytä tietosi:</h3>
                <div className="form-group" style={{ paddingBottom: "30px" }}>
                  <label name="name">Nimi:</label>
                  <input
                    value={values.name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Nimi"
                    name="name"
                  />
                  {errors.name && touched.name && (
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div
                  className="form-group "
                  style={{ paddingBottom: "30px" }}
                  onChange={handleChange}
                >
                  <label name="name">Tasosi:</label>
                  <br />
                  <label className="gamebuddy-radio">
                    <input value="aloittelija" type="radio" name="level" />{" "}
                    Aloittelija
                  </label>
                  <label className="gamebuddy-radio">
                    <input value="harrastaja" type="radio" name="level" />{" "}
                    Harrastelija
                  </label>
                  <label className="gamebuddy-radio">
                    <input value="kilpailija" type="radio" name="level" />{" "}
                    Kilpailija
                  </label>
                  {errors.level && touched.level && (
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {errors.level}
                    </p>
                  )}
                </div>

                <div
                  className="form-group"
                  style={{ paddingBottom: "30px" }}
                  onChange={handleChange}
                >
                  <label name="name">Sopivat peliajat:</label>
                  <br />
                  <label className="gamebuddy-radio">
                    <input value="aamu" type="radio" name="times" /> 8:00 -
                    12:00 (aamu)
                  </label>
                  <label className="gamebuddy-radio">
                    <input value="päivä" type="radio" name="times" /> 12:00 -
                    17:00 (päivä)
                  </label>
                  <label className="gamebuddy-radio">
                    <input value="ilta" type="radio" name="times" /> 17:00 -
                    21:00 (ilta)
                  </label>
                  {errors.times && touched.times && (
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {errors.times}
                    </p>
                  )}
                </div>

                <div className="form-group" style={{ paddingBottom: "30px" }}>
                  <label name="name">Sähköpostiosoite:</label>
                  <input
                    value={values.email}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Sähköpostiosoite"
                    name="email"
                  />
                  {errors.email && touched.email && (
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="form-group" style={{ paddingBottom: "30px" }}>
                  <label name="name">
                    Saako sähköpostiosoitteesi jakaa profiiliisi sopivalle
                    henkilölle?
                  </label>
                  <br />
                  <label className="gamebuddy-checkbox">
                    <input
                      id="permission"
                      defaultChecked={values.permission}
                      type="checkbox"
                      name="permission"
                      onChange={handleChange}
                    />{" "}
                    Kyllä
                  </label>
                  {errors.permission && touched.permission && (
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      {errors.permission}
                    </p>
                  )}
                </div>

                <button
                  href="#start"
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Lähetä
                </button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div style={{ paddingBottom: "50px" }}>
          <h1 className="title-style">
            Profiliisi yhteen sopivat pelikaverit:
          </h1>
          <div className="paragraph-style1">
            {buddies.map((b, index) => (
              <div key={index}>
                {gameUser.email !== b.email ? (
                  <div>
                    <hr style={{ width: "50%" }} />
                    <a href={`mailto:${b.email}`}>{b.email}</a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <Image
        alt="etusivun kuva"
        src={Image1}
        style={{ width: "100%" }}
        className="img-fluid image-style2"
      />
    </div>
  );
}

export default GameBuddy;
