import appointmentRightBookerReducer from "../appointmentRightBooker";
import deepFreeze from "deep-freeze";

describe("appointmentDateReducer,", () => {
  test("returns new state with action  appointmentRightBooker/rightBooker", () => {
    const state = {};
    const action = {
      type: "appointmentRightBooker/rightBooker",
      payload: {
        address: "",
        date: "2022-07-18",
        email: "",
        field: "Kenttä 3",
        index: 2,
        name: "",
        row: 4,
        time: "11:00",
      },
    };

    deepFreeze(state);
    const newState = appointmentRightBookerReducer(state, action);

    // const date = jest.fn((action) => action.payload);
    // date(action);

    expect({
      address: "",
      date: "2022-07-18",
      email: "",
      field: "Kenttä 3",
      index: 2,
      name: "",
      row: 4,
      time: "11:00",
    }).toEqual(expect.objectContaining(newState));

    expect({
      address: "",
      date: "2022-07-28",
      email: "",
      field: "Kenttä 2",
      index: 2,
      name: "",
      row: 1,
      time: "16:00",
    }).toEqual(expect.not.objectContaining(action.payload));
  });
});
