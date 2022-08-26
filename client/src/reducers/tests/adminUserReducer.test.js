import adminUserReducer from "../adminUserReducer";
import deepFreeze from "deep-freeze";

describe("adminUserReducer", () => {
  test("returns new state with action admin/adminTrue", () => {
    const state = false;
    const action = {
      type: "admin/adminTrue",
      payload: true,
    };

    deepFreeze(state);
    const newState = adminUserReducer(state, action);

    expect(newState).not.toBeFalsy();
    expect(newState).toBe(action.payload);
  });
});
