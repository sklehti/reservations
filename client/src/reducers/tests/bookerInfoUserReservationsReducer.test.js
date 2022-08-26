import bookerInfoUserReservationsReducer from "../bookerInfoUserReservationsReducer";
import deepFreeze from "deep-freeze";

describe("bookerInfoUserReservationsReducer", () => {
  test("returns new state with action userReservations/bookerInfoUserReservations", () => {
    const state = [
      {
        date: "2022-07-19",
        field: "Kenttä 2",
        id: 244,
        personinfo_id: "karoliina@mail",
        resindex: 1,
        row: 2,
        time: "10:00",
      },
      {
        date: "2022-08-29",
        field: "Kenttä 1",
        id: 250,
        personinfo_id: "karoliina@mail",
        resindex: 2,
        row: 2,
        time: "11:00",
      },
      {
        date: "2022-09-1",
        field: "Kenttä 4",
        id: 300,
        personinfo_id: "arttu@mail",
        resindex: 1,
        row: 4,
        time: "21:00",
      },
    ];
    const action = {
      type: "userReservations/bookerInfoUserReservations",
      payload: [
        {
          date: "2022-09-1",
          field: "Kenttä 4",
          id: 300,
          personinfo_id: "arttu@mail",
          resindex: 1,
          row: 4,
          time: "21:00",
        },
      ],
    };

    deepFreeze(state);
    const newState = bookerInfoUserReservationsReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(state[2]);

    expect(newState).toContainEqual({
      date: "2022-09-1",
      field: "Kenttä 4",
      id: 300,
      personinfo_id: "arttu@mail",
      resindex: 1,
      row: 4,
      time: "21:00",
    });
    expect(newState).not.toContainEqual({
      date: "2022-07-15",
      field: "Kenttä 1",
      personinfo_id: "anne@mail",
      id: 1001,
      resindex: 2,
      row: 3,
      time: "10:00",
    });
  });
});
