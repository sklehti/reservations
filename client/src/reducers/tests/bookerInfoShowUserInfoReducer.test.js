import bookerInfoShowUserInfoReducer from "../bookerInfoShowUserInfoReducer";
import deepFreeze from "deep-freeze";

describe("bookerInfoShowUserInfoReducer", () => {
  test("returns new state with action showUserInfo/showUserInfoFalse", () => {
    const state = true;
    const action = {
      type: "showUserInfo/showUserInfoFalse",
      payload: false,
    };

    deepFreeze(state);
    const newState = bookerInfoShowUserInfoReducer(state, action);

    expect(action.payload).toBeFalsy();
    expect(newState).toBe(action.payload);
  });

  test("returns new true state with action showUserInfo/showUserInfoTrue", () => {
    const state = true;
    const action = {
      type: "showUserInfo/showUserInfoTrue",
      payload: true,
    };

    deepFreeze(state);
    const newState = bookerInfoShowUserInfoReducer(state, action);

    expect(newState).not.toBeFalsy();
    expect(newState).toBe(true);
  });
});
