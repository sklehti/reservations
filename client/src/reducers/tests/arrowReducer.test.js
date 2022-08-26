import arrowReducer from "../arrowReducer";
import deepFreeze from "deep-freeze";

describe("arrowReducer", () => {
  test("returns false state with action arrow/showArrowFalse", () => {
    const state = false;
    const action = {
      type: "arrow/showArrowFalse",
      payload: false,
    };

    deepFreeze(state);
    const newState = arrowReducer(state, action);

    expect(newState).toBeFalsy();
    expect(newState).toBe(action.payload);
  });

  test("returns true state with action arrow/showArrowTrue", () => {
    const state = false;
    const action = {
      type: "arrow/showArrowTrue",
      payload: true,
    };

    deepFreeze(state);
    const newState = arrowReducer(state, action);

    expect(newState).not.toBeFalsy();
    expect(newState).toBe(action.payload);
  });
});
