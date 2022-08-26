import appointmentTimeChosenReducer from "../appointmentTimeChosenReducer";
import deepFreeze from "deep-freeze";

describe("appointmentTimeChosenReducer", () => {
  test("returns new state with action appointmentTimeChosen/timeChosenFalse", () => {
    const state = false;
    const action = {
      type: "appointmentTimeChosen/timeChosenFalse",
      payload: false,
    };

    deepFreeze(state);
    const newState = appointmentTimeChosenReducer(state, action);

    expect(newState).toBeFalsy();
    expect(newState).toBe(action.payload);
  });

  test("returns new true state with action appointmentTimeChosen/timeChosenTrue", () => {
    const state = false;
    const action = {
      type: "appointmentTimeChosen/timeChosenTrue",
      payload: true,
    };

    deepFreeze(state);
    const newState = appointmentTimeChosenReducer(state, action);

    expect(newState).not.toBeFalsy();
    expect(newState).toBe(action.payload);
  });
});
