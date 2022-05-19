import React, { useState, useEffect } from "react";
import Logging from "./Logging";
import tennisappService from "../services/tennisappDatabase";

function TimeColumn({ handleReserve, time, row, reserve, allBookers }) {
  return (
    <tr>
      <th style={{ backgroundColor: "blue", color: "white" }}>{time}</th>
      {reserve.map((index) => (
        <td style={{ backgroundColor: "#D5F3FE" }} key={index}>
          {allBookers.find(
            (b, i) => b.resindex === index && b.time === time && b.row === row
          ) ? (
            <input type="button" value="varattu" />
          ) : (
            <input
              type="button"
              value="vapaa"
              onClick={(e) => handleReserve(e, index, row)}
            />
          )}
        </td>
      ))}
    </tr>
  );
}

function Appointment() {
  const [playingDate, setPlayingDate] = useState("");
  const [reserve] = useState([0, 1, 2, 3]);
  const [fields] = useState(["Kenttä 1", "Kenttä 2", "Kenttä 3", "kenttä 4"]);
  const [allBooking] = useState([
    { date: playingDate, time: "8:00", row: 0, bookers: [3] },
    { date: playingDate, time: "9:00", row: 1, bookers: [3] },
    { date: playingDate, time: "10:00", row: 2, bookers: [3] },
    { date: playingDate, time: "11:00", row: 3, bookers: [3] },
    { date: playingDate, time: "11:00", row: 4, bookers: [3] },
    { date: playingDate, time: "12:00", row: 5, bookers: [3] },
    { date: playingDate, time: "13:00", row: 6, bookers: [3] },
    { date: playingDate, time: "14:00", row: 7, bookers: [3] },
    { date: playingDate, time: "15:00", row: 8, bookers: [3] },
    { date: playingDate, time: "16:00", row: 9, bookers: [3] },
    { date: playingDate, time: "17:00", row: 10, bookers: [3] },
    { date: playingDate, time: "18:00", row: 11, bookers: [3] },
    { date: playingDate, time: "19:00", row: 12, bookers: [3] },
    { date: playingDate, time: "20:00", row: 13, bookers: [3] },
    { date: playingDate, time: "21:00", row: 14, bookers: [3] },
  ]);
  const [allBookers, setAllBookers] = useState([]);
  const [rightBooker, setRightBooker] = useState({});
  const [timeChosen, setTimeChosen] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    const date_1 = new Date().toISOString().split("T");
    setPlayingDate(date_1[0]);
    setToday(date_1[0]);
  }, []);

  useEffect(() => {
    tennisappService.getDates(playingDate).then((initialDates) => {
      setAllBookers(initialDates);
    });
  }, [playingDate]);

  const handleDate = (e) => {
    setPlayingDate(e.target.value);
  };

  const handleReserve = (event, index, row) => {
    event.target.value = "varaa";
    const newBooker = {
      number: index,
      value: event.target.value,
      bookerName: "",
      bookerAddress: "",
      bookerEmail: "",
      fields: "",
    };

    newBooker.fields = fields[newBooker.number];
    setRightBooker({
      name: "",
      address: "",
      email: "",
      date: playingDate,
      time: allBooking[row].time,
      field: fields[newBooker.number],
      row: row,
      index: index,
    });

    setTimeChosen(true);
  };

  const handleReset = (e) => {
    setTimeChosen(false);
    setRightBooker({});

    const date_1 = new Date().toISOString().split("T");
    setPlayingDate(date_1[0]);
  };

  return (
    <div className="row">
      <h1 className="title-style2" style={{ marginLeft: "35%" }}>
        Ajanvaraus:
      </h1>

      <div className="container  paragraph-style2">
        <br />

        <div className="paragraph-style1">
          <p style={{ textAlign: "center" }}>
            Varaa vuoro alapuolella olevasta kalenterista painamalla hiirellä
            haluamaasi kohtaa. Täytä tämän jälkeen yhteystietosi ja paina
            varaa-nappia. Varatun vuoron hinta on 20 e/kenttä.
          </p>

          {!timeChosen ? (
            <div style={{ paddingTop: "20px", textAlign: "center" }}>
              <label style={{ paddingRight: "3%" }}>Valitse pelipäivä: </label>
              <input
                type="date"
                min={today}
                value={playingDate}
                onChange={handleDate}
              />

              <br />
              <br />
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "blue", color: "white" }}>
                        {playingDate}
                      </th>
                      <th style={{ backgroundColor: "blue", color: "white" }}>
                        Kenttä 1
                      </th>
                      <th style={{ backgroundColor: "blue", color: "white" }}>
                        Kenttä 2
                      </th>
                      <th style={{ backgroundColor: "blue", color: "white" }}>
                        Kenttä 3
                      </th>
                      <th style={{ backgroundColor: "blue", color: "white" }}>
                        Kenttä 4
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {allBooking.map((c, index) => (
                      <TimeColumn
                        key={index}
                        reserve={reserve}
                        handleReserve={handleReserve}
                        time={c.time}
                        row={c.row}
                        allBookers={allBookers}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <h4>Valitsit seuraavan ajan ja kentän:</h4>
                <br />

                <p>
                  pelipäivä: {rightBooker.date} aika: {rightBooker.time}{" "}
                  {rightBooker.field} {rightBooker.bookerName}
                </p>
                <button className="reset-button" onClick={handleReset}>
                  Muuta varausta
                </button>
                <br />
                <br />
                <Logging rightBooker={rightBooker} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
