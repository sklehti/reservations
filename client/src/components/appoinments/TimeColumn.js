import React from "react";

function TimeColumn({ handleReserve, time, row, bookers }) {
  const reserve1 = [0, 1, 2, 3];

  return (
    <tr>
      <th style={{ backgroundColor: "blue", color: "white" }}>{time}</th>
      {reserve1.map((index) => (
        <td style={{ backgroundColor: "#D5F3FE" }} key={index}>
          {bookers.find(
            (b, i) => b.resindex === index && b.time === time && b.row === row
          ) ? (
            <input type="button" value="varattu" />
          ) : (
            <input
              type="button"
              value="vapaa"
              className="time-column-style"
              onClick={(e) => handleReserve(e, index, row)}
            />
          )}
        </td>
      ))}
    </tr>
  );
}

export default TimeColumn;
