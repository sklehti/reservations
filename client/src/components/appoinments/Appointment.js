import React, { useEffect } from "react";
import Logging from "../Logging";
import tennisappService from "../../services/tennisappDatabase";
import TimeColumn from "./TimeColumn";
import { useSelector, useDispatch } from "react-redux";

function Appointment() {
  const dispatch = useDispatch();
  const dates = useSelector((state) => state.appointmentDate);
  const bookers = useSelector((state) => state.appointmentAllBookers);
  const booker = useSelector((state) => state.appointmentRightBooker);
  const today = useSelector((state) => state.appointmentDateToday);
  const selectTime = useSelector((state) => state.appointmentTimeChosen);
  const logging = useSelector((state) => state.logging);

  const fields = ["Kenttä 1", "Kenttä 2", "Kenttä 3", "kenttä 4"];
  const allBooking = [
    { date: "", time: "8:00", row: 0, bookers: [3] },
    { date: "", time: "9:00", row: 1, bookers: [3] },
    { date: "", time: "10:00", row: 2, bookers: [3] },
    { date: "", time: "11:00", row: 3, bookers: [3] },
    { date: "", time: "11:00", row: 4, bookers: [3] },
    { date: "", time: "12:00", row: 5, bookers: [3] },
    { date: "", time: "13:00", row: 6, bookers: [3] },
    { date: "", time: "14:00", row: 7, bookers: [3] },
    { date: "", time: "15:00", row: 8, bookers: [3] },
    { date: "", time: "16:00", row: 9, bookers: [3] },
    { date: "", time: "17:00", row: 10, bookers: [3] },
    { date: "", time: "18:00", row: 11, bookers: [3] },
    { date: "", time: "19:00", row: 12, bookers: [3] },
    { date: "", time: "20:00", row: 13, bookers: [3] },
    { date: "", time: "21:00", row: 14, bookers: [3] },
  ];

  useEffect(() => {
    const date_1 = new Date().toISOString().split("T");

    dispatch({
      type: "appointmentDateToday/dateToday",
      payload: date_1[0],
    });

    dispatch({
      type: "appointmentDate/playingDates",
      payload: date_1[0],
    });
  }, [dispatch]);

  useEffect(() => {
    if (dates !== "") {
      tennisappService.getDates(dates).then((initialDates) => {
        dispatch({
          type: "appointmentAllBookers/allBookers",
          payload: initialDates,
        });
      });
    }
  }, [dates, dispatch]);

  const handleDate = (e) => {
    dispatch({
      type: "appointmentDate/playingDates",
      payload: e.target.value,
    });
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

    dispatch({
      type: "appointmentRightBooker/rightBooker",
      payload: {
        name: "",
        address: "",
        email: "",
        date: dates,
        time: allBooking[row].time,
        field: fields[newBooker.number],
        row: row,
        index: index,
      },
    });

    dispatch({ type: "appointmentTimeChosen/timeChosenTrue", payload: true });
  };

  const handleReset = (e) => {
    dispatch({ type: "appointmentTimeChosen/timeChosenFalse", payload: false });

    const date_1 = new Date().toISOString().split("T");

    dispatch({
      type: "appointmentDate/playingDates",
      payload: date_1[0],
    });

    dispatch({
      type: "logging/registeredTrue",
      payload: true,
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="title-style">Ajanvaraus:</h1>

      <div className="container">
        <div className="paragraph-style1">
          <p>
            Varaa vuoro alapuolella olevasta kalenterista painamalla hiirellä
            haluamaasi kohtaa. Täytä tämän jälkeen yhteystietosi ja paina
            varaa-nappia. Varatun vuoron hinta on 20 e/kenttä.
          </p>

          {selectTime === false ? (
            <div style={{ paddingTop: "20px" }}>
              <label className="label-style">Valitse pelipäivä: </label>
              <input
                type="date"
                min={today}
                value={dates}
                onChange={handleDate}
                required
              />
              <div className="table-responsive">
                <table
                  className="table "
                  style={{
                    marginBottom: "60px",
                    marginTop: "20px",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "blue", color: "white" }}>
                        {`${dates.split("-")[2]}.${dates.split("-")[1]}.${
                          dates.split("-")[0]
                        }`}
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
                        handleReserve={handleReserve}
                        time={c.time}
                        row={c.row}
                        bookers={bookers}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h4>Valitsit seuraavan ajan ja kentän:</h4>
              <br />
              <p>
                pelipäivä: {booker.date} aika: {booker.time} {booker.field}{" "}
                {booker.bookerName}
              </p>
              <button
                class="btn btn-secondary button-style-secondary"
                style={{ marginBottom: "50px" }}
                onClick={handleReset}
              >
                Muuta varausta
              </button>
              <Logging rightBooker={booker} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
