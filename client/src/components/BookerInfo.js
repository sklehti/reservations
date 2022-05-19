import React, { useState } from "react";
import Image1 from "../images/booking.jpg";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import tennisappDatabase from "../services/tennisappDatabase";

function BookerInfo() {
  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userResesrvations, setUserReservations] = useState([]);
  const [showUserInfo, setShowUserInfo] = useState(true);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSubmit = () => {
    window.scrollTo(0, 0);

    setUserInfo({});

    tennisappDatabase
      .getBooker(userEmail, userPassword)
      .then((initialUsers) => {
        if (initialUsers[0] !== undefined) setUser(initialUsers[0]);
        else swal("Kirjautumistietojasi ovat virheelliset!");
        setUserEmail("");
        setUserPassword("");
      })

      .catch((err) => {
        console.log(err);
        swal("Kirjautumistietojasi ovat virheelliset!");
        setUserEmail("");
        setUserPassword("");
      });
  };

  const handleUserInfo = () => {
    setShowUserInfo(true);
    setUserReservations([]);
    setUserInfo(user);
  };

  const handleRegisterOut = () => {
    setShowUserInfo(true);
    setUserInfo({});
    setUser({});
    setUserReservations([]);
    window.localStorage.clear();

    navigate("/");
  };

  const handleUserReservations = () => {
    setShowUserInfo(false);

    tennisappDatabase
      .getBooking(user.email)
      .then((initialBooking) => {
        setUserReservations(initialBooking);
      })

      .catch((err) => {
        console.log(err.message);
        swal("Tapahtui virhe. Koita hakea varauksia uudestaa.");
      });
    setUserInfo({});
  };

  return (
    <div className="row">
      <div>
        <h1 className="title-style2" style={{ paddingBottom: "80px" }}>
          Varaustiedot
        </h1>
        {user.email !== "" &&
        user.password !== "" &&
        user.email !== undefined &&
        user.email !== undefined ? (
          <div className="container-info">
            <div className="flex-item-left">
              <div>
                <button className="bookerinfo-button" onClick={handleUserInfo}>
                  Omat tiedot
                </button>
              </div>
              <div>
                <button
                  className="bookerinfo-button"
                  onClick={handleUserReservations}
                >
                  Omat varaukset
                </button>
              </div>
              {/* TODO: to do later */}
              {/* <div>
                <button className="bookerinfo-button">Muuta tietojasi</button>
              </div> */}
              <br />
              <form action="/" onSubmit={handleRegisterOut}>
                <div>
                  <button
                    className="bookerinfo-button"
                    style={{ backgroundColor: "gray" }}
                    type="submit"
                  >
                    Kirjaudu ulos
                  </button>
                </div>
              </form>
            </div>

            <div className="flex-item-right">
              {showUserInfo ? (
                <div className="text-center">
                  <h3>{userInfo.name}</h3>
                  <div>{userInfo.address}</div>
                  <div>{userInfo.email}</div>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Päivä</th>
                        <th scope="col">Aika</th>
                        <th scope="col">Kenttä</th>
                      </tr>
                    </thead>
                    {userResesrvations.map((r, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{r.date}</td>
                          <td>{r.time}</td>
                          <td>{r.field}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: "8%", textAlign: "center" }}>
            <h3 className="bookerinfo-title">Kirjaudu sisälle:</h3>
            <form>
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
                value={userEmail}
                onChange={handleEmail}
              />
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
                value={userPassword}
                onChange={handlePassword}
              />
              <button
                type="button"
                className="bookerinfo-button3"
                onClick={handleSubmit}
              >
                Kirjaudu
              </button>
            </form>
          </div>
        )}

        <Image
          alt="etusivun kuva"
          src={Image1}
          style={{ width: "100%" }}
          className=" img-fluid center"
        />
        <div>
          <p className="paragraph-style2"></p>
        </div>
      </div>
    </div>
  );
}

export default BookerInfo;
