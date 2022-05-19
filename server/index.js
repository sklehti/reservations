const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcrypt");

require("dotenv").config();

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

/**
 * Route to get all posts
 */
app.get("/api/getAll", (req, res) => {
  db.query("SELECT * FROM reservations", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

/**
 * Route to check right user
 */
app.get("/api/getUserEmail/:email", (req, res) => {
  const email = req.params.email;

  db.query(
    "SELECT COUNT (*) AS lkm FROM personinfo WHERE email=?",
    email,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

/**
 * Route to get all reservations from id
 */
app.get("/api/getEmail/:personinfo_id", (req, res) => {
  const id = req.params.personinfo_id;

  db.query(
    "SELECT * FROM reservations WHERE personinfo_id = (?)",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

/**
 *  Route to get all selected date bookers
 */
app.get("/api/getDate/:date", (req, res) => {
  const date = req.params.date;

  db.query(
    "SELECT * FROM reservations WHERE date = (?)",
    [date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/**
 * Route to get rigth booker
 */
app.get("/api/getBooker/:email/:password", (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  db.getConnection(async (err, connection) => {
    if (err) throw err;

    connection.query(
      "SELECT * FROM personinfo WHERE email = (?)",
      [email],
      async (err, result) => {
        connection.release();

        if (err) throw err;
        if (result.length == 0) {
          console.log("--------> User does not exist");
          res.sendStatus(404);
        } else {
          const hashedPassword = result[0].password;
          if (await bcrypt.compare(password, hashedPassword)) {
            console.log("---------> Login Successful");

            res.send(result);
          } else {
            console.log("---------> Password Incorrect");

            res.send(undefined);
            console.log("---------> Password Incorrect");
          }
        }
      }
    );
  });
});

/**
 * Route for creating the booker with booking
 */
app.post("/api/createUserWithBooking", async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const email = req.body.email;
  const password = req.body.password;
  const date = req.body.date;
  const time = req.body.time;
  const field = req.body.field;
  const row = req.body.row;
  const resindex = req.body.index;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  let stmt =
    "INSERT INTO personinfo (`name`,`address`,`email`,`password`) VALUES (?,?,?,?)";
  let todo = [name, address, email, passwordHash];

  db.query(stmt, todo, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let stmt2 =
        "INSERT INTO reservations (`date`,`time`,`field`,`row`, `resindex`, `personinfo_id`) VALUES (?,?,?,?,?,?)";
      let todo2 = [date, time, field, row, resindex, email];

      db.query(stmt2, todo2, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});

/**
 * Route for creating the booking
 */
app.post("/api/createBooking", (req, res) => {
  const email = req.body.email;
  const date = req.body.date;
  const time = req.body.time;
  const field = req.body.field;
  const row = req.body.row;
  const resindex = req.body.index;

  let stmt2 =
    "INSERT INTO reservations (`date`,`time`,`field`,`row`, `resindex`, `personinfo_id`) VALUES (?,?,?,?,?,?)";
  let todo2 = [date, time, field, row, resindex, email];

  db.query(stmt2, todo2, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

/**
 * Route to delete a booker
 */
app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM personinfo WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
