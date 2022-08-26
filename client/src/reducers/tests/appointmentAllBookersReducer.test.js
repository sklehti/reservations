import appointmentAllBookersReducer from "../appointmentAllBookersReducer";
import deepFreeze from "deep-freeze";

describe("appointmentAllBookersReducer", () => {
  test("returns new state with action appointmentAllBookers/allBookers", () => {
    const state = [
      {
        date: "2022-07-14",
        field: "Kenttä 2",
        personinfo_id: "aune@mail",
        id: 1000,
        resindex: 1,
        row: 1,
        time: "9:00",
      },
      {
        date: "2022-07-15",
        field: "Kenttä 1",
        personinfo_id: "aune@mail",
        id: 1001,
        resindex: 2,
        row: 3,
        time: "10:00",
      },
    ];
    const action = {
      type: "appointmentAllBookers/allBookers",
      payload: [
        {
          date: "2022-07-14",
          field: "Kenttä 2",
          personinfo_id: "aune@mail",
          id: 1000,
          resindex: 1,
          row: 1,
          time: "9:00",
        },
        {
          date: "2022-07-15",
          field: "Kenttä 1",
          personinfo_id: "aune@mail",
          id: 1001,
          resindex: 2,
          row: 3,
          time: "10:00",
        },
      ],
    };

    deepFreeze(state);
    const newState = appointmentAllBookersReducer(state, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(state[1]);

    expect(newState).toContainEqual({
      date: "2022-07-15",
      field: "Kenttä 1",
      personinfo_id: "aune@mail",
      id: 1001,
      resindex: 2,
      row: 3,
      time: "10:00",
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
