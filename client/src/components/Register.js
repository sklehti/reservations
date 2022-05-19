import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import tennisappDatabase from "../services/tennisappDatabase";

function Register({ rightBooker }) {
  const [bookersName, setBookersName] = useState("");
  const [bookersAdress, setBookersAddress] = useState("");
  const [bookersEmail, setBookersEmail] = useState("");
  const [bookersPassword, setBookersPassword] = useState("");

  const navigate = useNavigate();

  const handleName = (e) => {
    setBookersName(e.target.value);
  };

  const handleAddress = (e) => {
    setBookersAddress(e.target.value);
  };

  const handleEmail = (e) => {
    setBookersEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setBookersPassword(e.target.value);
  };

  const handleSubmit = () => {
    const booking = {
      ...rightBooker,
      name: bookersName,
      address: bookersAdress,
      email: bookersEmail,
      password: bookersPassword,
    };

    if (
      bookersName.length > 0 &&
      bookersAdress.length > 0 &&
      bookersEmail.length > 0 &&
      bookersPassword.length > 0
    ) {
      tennisappDatabase
        .getUserEmail(booking.email)
        .then((initialUser) => {
          if (initialUser[0].lkm < 1) {
            swal({
              title: "Haluatko varmasti varata seuraavan vuoron:",
              text: `${rightBooker.date} klo ${rightBooker.time}, ${rightBooker.field}`,
              icon: "success",
              buttons: true,
              dangerMode: false,
            }).then((willSave) => {
              if (willSave) {
                swal({
                  title: "Kiitos varauksestasi!",
                  text: "Voit tarkastella varauksiasi Varaukset-sivulta.",
                  icon: "success",
                  button: "Ok!",
                });
                tennisappDatabase.createUserWithBooking(booking);

                navigate("/");
              } else {
                swal("Varaus ei tallentunut!");
              }
            });
          } else {
            swal("Kirjautumistietosi ovat virheelliset! Varaus ei onnistunut.");
          }
        })

        .catch((err) => {
          swal("Kirjautumistietosi ovat virheelliset! Varaus ei onnistunut.");
        });
      setBookersName("");
      setBookersAddress("");
      setBookersEmail("");
      setBookersPassword("");
    } else {
      swal("Täytä kaikki kentät!");
    }
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label name="name">Nimi:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nimi"
            name="name"
            value={bookersName}
            onChange={handleName}
          />
        </div>
        <div className="form-group">
          <label name="pwd">Osoite:</label>
          <input
            type="text"
            className="form-control"
            id="pwd"
            placeholder="Osoite"
            name="pwd"
            value={bookersAdress}
            onChange={handleAddress}
          />
        </div>
        <div className="form-group">
          <label name="email">Sähköposti:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Sähköposti"
            name="email"
            value={bookersEmail}
            onChange={handleEmail}
          />
          <div className="form-group">
            <label name="password">Salasana:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="salasana"
              name="password"
              value={bookersPassword}
              onChange={handlePassword}
            />
          </div>
        </div>
        <button
          className="bookerinfo-button"
          type="button"
          onClick={handleSubmit}
        >
          Varaa
        </button>
      </form>
    </div>
  );
}

export default Register;
