import appointmentDateReducer from "../appointmentDateReducer";
import deepFreeze from "deep-freeze";

describe("appointmentDateReducer,", () => {
  test("returns new state with action appointmentDate/playingDates", () => {
    const state = "";
    const action = {
      type: "appointmentDate/playingDates",
      payload: "2022-07-28",
    };

    deepFreeze(state);
    const newState = appointmentDateReducer(state, action);

    const date = jest.fn((action) => action.payload);
    date(action);

    expect(date).toHaveReturnedWith("2022-07-28");
    expect("2022-07-28").toEqual(expect.stringContaining(action.payload));
    expect("How are you?").toEqual(expect.not.stringContaining(action.payload));
    expect(newState).toEqual("2022-07-28");
  });
});
