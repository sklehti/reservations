import bookerInfoUpdateUserInfoReducer from "../bookerInfoUpdateUserInfoReducer";
import deepFreeze from "deep-freeze";

describe("bookerInfoUpdateUserInfoReducer", () => {
  test("returns false state with action updateUserInfo/updateUserInfoFalse", () => {
    const state = false;
    const action = {
      type: "updateUserInfo/updateUserInfoFalse",
      payload: false,
    };

    deepFreeze(state);
    const newState = bookerInfoUpdateUserInfoReducer(state, action);

    expect(action.payload).toBeFalsy();
    expect(newState).toBe(action.payload);
  });

  test("returns true state with action updateUserInfo/updateUserInfoTrue", () => {
    const state = false;
    const action = {
      type: "updateUserInfo/updateUserInfoTrue",
      payload: true,
    };

    deepFreeze(state);
    const newState = bookerInfoUpdateUserInfoReducer(state, action);

    expect(newState).not.toBeFalsy();
    expect(newState).toBe(true);
  });
});
