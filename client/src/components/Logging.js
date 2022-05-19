import React, { useState } from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import tennisappDatabase from "../services/tennisappDatabase";

function Logging({ rightBooker }) {
  const [user, setUser] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [registered, setRegistered] = useState(true);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLoging = () => {
    tennisappDatabase
      .getBooker(userEmail, userPassword)
      .then((initialBooker) => {
        setUser(initialBooker[0]);
        if (initialBooker[0] !== undefined) {
          const booking = {
            ...rightBooker,
            email: initialBooker[0].email,
          };
          swal({
            title: "Haluatko varmasti varata seuraavan vuoron:",
            text: `${rightBooker.date} klo ${rightBooker.time}, ${rightBooker.field}`,
            icon: "success",
            buttons: true,
            dangerMode: false,
          }).then((willSave) => {
            if (willSave) {
              tennisappDatabase.createBooking(booking);

              setUserEmail("");
              setUserPassword("");
              setRegistered(true);

              swal({
                title: "Kiitos varauksestasi!",
                text: "Voit tarkastella varauksiasi Varaukset-sivulta.",
                icon: "success",
                button: "Ok!",
              });
              navigate("/");
            } else {
              swal("Varaus ei tallentunut!");
            }
          });
        } else {
          swal("Kirjautumistietosi ovat virheelliset! Varaus ei onnistunut.");
          setUserEmail("");
          setUserPassword("");
          setRegistered(true);
        }
      })

      .catch((err) => {
        console.log(err.message);
        swal("Kirjautumistietojasi ovat virheelliset! Varaus ei onnistunut.");
      });
  };

  const handleRegisterInfo = () => {
    setRegistered(false);
  };

  return (
    <div style={{ marginBottom: "8%", textAlign: "center" }}>
      {registered === true ? (
        <div>
          <form>
            <div className="form-group">
              <h3 className="bookerinfo-title">Kirjaudu sisälle:</h3>
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
                value={userEmail}
                onChange={handleEmail}
              />
              <div>
                <div className="form-group">
                  <label className="bookerinfo-label" name="password">
                    Salasana:
                  </label>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Salasana"
                  name="password"
                  value={userPassword}
                  onChange={handlePassword}
                />
                <button
                  onClick={handleLoging}
                  type="button"
                  className="bookerinfo-button"
                >
                  Varaa
                </button>

                <button
                  type="button"
                  className="bookerinfo-button2"
                  onClick={handleRegisterInfo}
                >
                  Rekisteröidy
                </button>
              </div>
            </div>{" "}
          </form>
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
