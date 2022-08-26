import loggingReducer from "../loggingReducer";
import deepFreeze from "deep-freeze";

describe("bookerInfoShowUserInfoReducer", () => {
  test("returns false with action logging/registeredFalse", () => {
    const state = true;
    const action = {
      type: "logging/registeredFalse",
      payload: false,
    };

    deepFreeze(state);
    const newState = loggingReducer(state, action);

    expect(action.payload).toBeFalsy();
    expect(newState).toBe(action.payload);
  });

  test("returns true state with action logging/registeredTrue", () => {
    const state = true;
    const action = {
      type: "logging/registeredTrue",
      payload: true,
    };

    deepFreeze(state);
    const newState = loggingReducer(state, action);

    expect(newState).not.toBeFalsy();
    expect(newState).toBe(true);
  });
});
