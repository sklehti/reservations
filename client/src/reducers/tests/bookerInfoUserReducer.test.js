import bookerInfoUserReducer from "../bookerInfoUserReducer";
import deepFreeze from "deep-freeze";

describe("bookerInfoUserReducer", () => {
  test("returns new state with action  user/bookerInfoUser", () => {
    const state = {};
    const action = {
      type: "user/bookerInfoUser",
      payload: {
        address: "testitie 44",
        admin: null,
        email: "testaaja@mail",
        name: "testaaja",
        password: "test_password",
      },
    };

    deepFreeze(state);
    const newState = bookerInfoUserReducer(state, action);

    expect({
      address: "testitie 44",
      admin: null,
      email: "testaaja@mail",
      name: "testaaja",
      password: "test_password",
    }).toEqual(expect.objectContaining(newState));

    expect({
      address: "vaaratie 1",
      admin: null,
      email: "vaara_testaaja@mail",
      name: "vaara_testaaja",
      password: "test_password",
    }).toEqual(expect.not.objectContaining(action.payload));
  });
});
