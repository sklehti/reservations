const express = require("express");
const db = require("./config/db");
const transporter = require("./config/transporter");
const cors = require("cors");
const bcrypt = require("bcrypt");

require("dotenv").config();
const path = require("path");

const app = express();
//const PORT = 3002;
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

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
 * Route to get 5 newest topical issues
 */
app.get("/api/getTopicalIssues", (req, res) => {
  db.query(
    "SELECT * FROM topicalIssues ORDER BY id DESC LIMIT 5",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

/**
 * Route to check right user
 */
app.get("/api/getUserEmail/:email", (req, res) => {
  const email = req.params.email;

  db.query(
    "SELECT COUNT(*) AS lkm FROM personinfo WHERE email=?",
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
  const date = new Date().toISOString().split("T");

  db.query(
    "SELECT * FROM reservations WHERE (personinfo_id = (?) AND date >= (?))",
    [id, date[0]],
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
 * Route to get right booker
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
        if (result.length === 0) {
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
 * Route to get right game buddies
 */
app.get("/api/getGameBuddies/:level/:times", (req, res) => {
  const level = req.params.level;
  const times = req.params.times;

  db.query(
    "SELECT email FROM gameBuddy WHERE (level=(?) AND times=(?))",
    [level, times],
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
 * Route to get right user
 */
app.get("/api/getGameBuddyUser/:email", (req, res) => {
  const email = req.params.email;

  db.query(
    "SELECT * FROM gameBuddy WHERE email=(?)",
    [email],
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
 * Route to create a new topical issue
 */
app.post("/api/createNewIssue", (req, res) => {
  const title = req.body.title;
  const message = req.body.message;

  let stmt1 = "INSERT INTO topicalIssues (`title`, `message`) VALUES (?,?)";
  let todo1 = [title, message];

  db.query(stmt1, todo1, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

/**
 * Route to create a new game buddu user
 */
app.post("/api/createGameBuddyUser", (req, res) => {
  const name = req.body.name;
  const level = req.body.level;
  const times = req.body.times;
  const email = req.body.email;

  let stmt =
    "INSERT INTO gameBuddy (`name`, `level`, `times`, `email`) VALUES (?,?,?,?)";
  let todo = [name, level, times, email];

  db.query(stmt, todo, (err, res) => {
    if (err) console.log(err);
    console.log(res);
  });
});

/**
 * Route to delete a reservation
 */
app.delete("/api/deleteReservation/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM reservations WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
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

/**
 * Route to update a user
 */
app.put("/api/updateUserInfo", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const email = req.body.email;

  const stmt = "UPDATE personinfo SET name=(?), address=(?) WHERE email=(?)";
  const todo = [name, address, email];

  db.query(stmt, todo, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

/**
 * Route to update a game buddy user
 */
app.put("/api/updateGamebuddyUser", (req, res) => {
  const name = req.body.name;
  const level = req.body.level;
  const times = req.body.times;
  const email = req.body.email;

  const stmt =
    "UPDATE gameBuddy SET name=(?), level=(?), times=(?) WHERE email=(?)";
  const todo = [name, level, times, email];

  db.query(stmt, todo, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

/**
 * Route to send a message
 */
app.post("/api/sendMessage", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;

  var mail = {
    from: name,
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

// Lisätty!
//app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;
