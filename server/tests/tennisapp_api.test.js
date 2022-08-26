const db = require("../config/db");
const transporter = require("../config/transporter");
const supertest = require("supertest");
const app = require("../index");

const api = supertest(app);

/*

Note! Only works with a local test file.

*/

beforeAll(() => {
  /*--- 1. function ---*/
  // db.query("DELETE FROM reservations"),
  //   (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log("Numero 1");
  //   };
});

describe("reservations", () => {
  test("reservations is returned as json", async () => {
    await api
      .get("/api/getAll")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two reservations", async () => {
    const response = await api.get("/api/getAll");

    expect(response.body).toHaveLength(4);
  });

  test("the first reservations in booked for 2022-11-12", async () => {
    const response = await api.get("/api/getAll");

    expect(response.body[0].date).toBe("2022-11-12");
  });

  test("to get all reservations from id", async () => {
    const id = "test@mail";

    const response = await api.get(`/api/getEmail/${id}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].date).toBe("2200-10-1");
  });

  test("to get all selected date bookers", async () => {
    const date = "2200-10-1";

    const response = await api.get(`/api/getDate/${date}`);

    expect(response.body[0].field).toBe("kenttä 3");
    expect(response.body[0].field).not.toBe("kenttä 2");
  });
});

describe("topicalIssues", () => {
  test("to get 5 newest topical issues", async () => {
    const response = await api.get("/api/getTopicalIssues");

    expect(response.body).toHaveLength(5);
    expect(response.body[0].title).toBe("test 5");

    const messages = response.body.map((m) => m.message);

    expect(messages).toContain("the text of test 3");
    expect(messages).not.toContain("incorrect text");
  });
});

describe("personinfo", () => {
  test("to check the right booker", async () => {
    const userEmail = "test@mail";
    const response = await api.get(`/api/getUserEmail/${userEmail}`);

    expect(response.body).toHaveLength(1);
    expect(response.body).not.toHaveLength(2);
  });

  test("to get right booker", async () => {
    const email = "test2@mail";
    const password = "test2";

    const response = await api.get(`/api/getBooker/${email}/${password}`);

    expect(response.body).toHaveLength(1);
    expect(response.body).not.toHaveLength(2);
    expect(response.body[0].address).toBe("teststreet 2");
  });
});

describe("gameBuddy", () => {
  test("to get right game buddies", async () => {
    const level = "aloittelija";
    const times = "päivä";

    const response = await api.get(`/api/getGameBuddies/${level}/${times}`);

    expect(response.body).toHaveLength(1);
    expect(response.body).not.toHaveLength(2);
    expect(response.body[0].email).toBe("test@mail");
  });

  test("to get right user", async () => {
    const email = "test@mail";

    const response = await api.get(`/api/getGameBuddyUser/${email}`);

    expect(response.body).toHaveLength(1);
    expect(response.body).not.toHaveLength(2);
    expect(response.body[0].name).toBe("test");
  });
});

afterAll(() => {
  db.end(() => {
    console.log("server close");
  });
});
