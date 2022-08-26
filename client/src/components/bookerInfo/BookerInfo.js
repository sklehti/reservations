import React from "react";
import Image1 from "../../images/booking.jpg";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import tennisappDatabase from "../../services/tennisappDatabase";
import UpdateBookerInfo from "./UpdateBookerInfo";
import Alert from "../Alerts";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { bookerInfoUserReservations } from "../../reducers/bookerInfoUserReservationsReducer";

function BookerInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.userInfo);
  const userResesrvations = useSelector((state) => state.userReservations);
  const showUserInfo = useSelector((state) => state.showUserInfo);
  const updateUserInfo = useSelector((state) => state.updateUserInfo);

  const navigate = useNavigate();

  const handleLogging = (values) => {
    window.scrollTo(0, 0);

    dispatch({
      type: "userInfo/bookerInfoUserInfo",
      payload: {},
    });

    if (values.email === "" || values.password === "") {
      values = {
        email: "not_acceptable",
        password: "not acceptable",
      };
    }

    tennisappDatabase
      .getBooker(values.email, values.password)
      .then((initialUsers) => {
        if (initialUsers[0] !== undefined)
          dispatch({
            type: "user/bookerInfoUser",
            payload: initialUsers[0],
          });
        else
          Alert(
            "",
            "Kirjautumistietosi ovat virheelliset!",
            "",
            [false, true],
            false
          );
      })

      .catch((err) => {
        console.log(err);
        Alert(
          "",
          "Kirjautumistietosi ovat virheelliset!",
          "",
          [false, true],
          false
        );
      });
  };

  const handleUserInfo = () => {
    dispatch({
      type: "showUserInfo/showUserInfoTrue",
      payload: true,
    });

    dispatch({
      type: "userReservations/bookerInfoUserReservations",
      payload: [],
    });

    dispatch({
      type: "userInfo/bookerInfoUserInfo",
      payload: user,
    });

    dispatch({
      type: "updateUserInfo/updateUserInfoFalse",
      payload: false,
    });
  };

  const handleUserInfoUpdates = () => {
    dispatch({
      type: "updateUserInfo/updateUserInfoTrue",
      payload: true,
    });
  };

  const handleRegisterOut = () => {
    dispatch({
      type: "showUserInfo/showUserInfoTrue",
      payload: true,
    });

    dispatch({
      type: "userInfo/bookerInfoUserInfo",
      payload: {},
    });

    dispatch({
      type: "user/bookerInfoUser",
      payload: {},
    });

    dispatch({
      type: "userReservations/bookerInfoUserReservations",
      payload: [],
    });

    window.localStorage.clear();
    navigate("/");
  };

  const handleUserReservations = () => {
    dispatch({
      type: "showUserInfo/showUserInfoFalse",
      payload: false,
    });

    dispatch({
      type: "updateUserInfo/updateUserInfoFalse",
      payload: false,
    });

    tennisappDatabase
      .getBooking(user.email)
      .then((initialBooking) => {
        dispatch({
          type: "userReservations/bookerInfoUserReservations",
          payload: initialBooking,
        });
      })

      .catch((err) => {
        console.log(err.message);
        Alert(
          "",
          "Tapahtui virhe. Koita hakea varauksia uudestaan.",
          "",
          [false, true],
          false
        );
      });

    dispatch({
      type: "userInfo/bookerInfoUserInfo",
      payload: {},
    });
  };

  const handleRemoveBooking = (reservation) => {
    Alert(
      "Haluatko varmasti poistaa seuraavan varaukset:",
      `${reservation.date} klo ${reservation.time}, ${reservation.field}`,
      "",
      true,
      false
    ).then((willDelete) => {
      if (willDelete) {
        tennisappDatabase.deleteReservation(reservation.id);

        const newReservationList = userResesrvations.filter(
          (r) => r.id !== reservation.id
        );

        dispatch(bookerInfoUserReservations(newReservationList));

        Alert("Varauksesi on nyt poistettu!", "", "success", "Ok!", false);
      } else {
        Alert(
          "",
          "Vuoron poistaminen ei onnistunut!",
          "",
          [false, true],
          false
        );
      }
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="title-style" style={{ paddingBottom: "5%" }}>
        Varaustiedot
      </h1>
      {user.email !== "" &&
      user.password !== "" &&
      user.email !== undefined &&
      user.email !== undefined ? (
        <div className="container-info">
          <div>
            <button
              className="btn btn-primary button-booker-style_1"
              onClick={handleUserInfo}
            >
              Omat tiedot
            </button>
            <br />
            <button
              className="btn btn-primary button-booker-style_2"
              onClick={handleUserInfoUpdates}
            >
              Päivitä yhteystietosi
            </button>
            <br />
            <button
              className="btn btn-primary button-booker-style_3"
              onClick={handleUserReservations}
            >
              Omat varaukset
            </button>
            <br />

            <button
              onClick={handleRegisterOut}
              className="btn btn-secondary button-booker-style_4 bookerinfo-margin"
            >
              Kirjaudu ulos
            </button>
          </div>

          <div className="flex-item-right">
            {updateUserInfo ? (
              <UpdateBookerInfo user={user} />
            ) : (
              <div>
                {showUserInfo ? (
                  <div>
                    <div>
                      <div>{userInfo.name}</div>
                      <div>{userInfo.address}</div>
                      <div>{userInfo.email}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ overflow: "auto" }}>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Päivä</th>
                          <th scope="col">Aika</th>
                          <th scope="col">Kenttä</th>
                          <th></th>
                        </tr>
                      </thead>
                      {userResesrvations.map((r, index) => (
                        <tbody key={index}>
                          <tr>
                            <td>{`${r.date.split("-")[2]}.${
                              r.date.split("-")[1]
                            }.${r.date.split("-")[0]}`}</td>
                            <td>{r.time}</td>
                            <td>{r.field}</td>
                            <td>
                              <button
                                class="btn btn-secondary btm-sm"
                                onClick={() => handleRemoveBooking(r)}
                              >
                                Poista
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="bookerinfo-title">Kirjaudu sisälle:</h3>
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
              <Form className="basic-form" onSubmit={handleSubmit}>
                <div>
                  <label className="bookerinfo-label" name="name">
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
                  <label className="bookerinfo-label" name="name">
                    Salasana:
                  </label>
                </div>
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
                <button
                  id="login"
                  style={{ marginTop: "30px" }}
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Kirjaudu
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <Image
        alt="etusivun kuva"
        src={Image1}
        className="img-fluid image-style2"
      />
    </div>
  );
}

export default BookerInfo;
