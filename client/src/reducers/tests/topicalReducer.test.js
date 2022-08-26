import topicalReducer from "../topicalReducer";
import deepFreeze from "deep-freeze";

describe("topicalReducer", () => {
  test("returns new state with action topical/allTopicals", () => {
    const state = [];
    const action = {
      type: "topical/allTopicals",
      payload: [
        { id: 49, message: "lisyttä 19.7", title: "hiukan testiä" },
        {
          id: 50,
          message: "lisyttä samana päivänä",
          title: "lisää tekstiä testiä varten",
        },
      ],
    };

    deepFreeze(state);

    expect([
      { id: 49, message: "lisyttä 19.7", title: "hiukan testiä" },
      {
        id: 50,
        message: "lisyttä samana päivänä",
        title: "lisää tekstiä testiä varten",
      },
    ]).toEqual(expect.arrayContaining(action.payload));

    expect([
      {
        id: 51,
        message: "tämä teksti ei toimi",
        title: "väärä_teksti",
      },
    ]).toEqual(expect.not.arrayContaining(action.payload));
  });
});
