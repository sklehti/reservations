import appointmentDateTodayReducer from "../appointmentDateTodayReducer";
import deepFreeze from "deep-freeze";

describe("appointmentDateReducer,", () => {
  test("returns new state with action appointmentDateToday/playingToday", () => {
    let date_today = new Date().toISOString().split("T");

    const state = "";
    const action = {
      type: "appointmentDateToday/dateToday",
      payload: date_today[0],
    };

    deepFreeze(state);
    const newState = appointmentDateTodayReducer(state, action);

    const date = jest.fn((action) => action.payload);
    date(action);

    expect(date).toHaveReturnedWith(date_today[0]);
    expect(date_today[0]).toEqual(expect.stringContaining(action.payload));
    expect("2000-07-20").toEqual(expect.not.stringContaining(action.payload));
    expect(newState).toEqual(date_today[0]);
  });
});
