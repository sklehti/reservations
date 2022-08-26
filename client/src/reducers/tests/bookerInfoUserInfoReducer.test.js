import bookerInfoUserInfoReducer from "../bookerInfoUserInfoReducer";
import deepFreeze from "deep-freeze";

describe("bookerInfoUserInfoReducer,", () => {
  test("returns new state with action  userInfo/bookerInfoUserInfo", () => {
    const state = {};
    const action = {
      type: "userInfo/bookerInfoUserInfo",
      payload: {
        address: "testitie 44",
        admin: null,
        email: "testaaja@mail",
        name: "testaaja",
        password: "test_password",
      },
    };

    deepFreeze(state);
    const newState = bookerInfoUserInfoReducer(state, action);

    // const date = jest.fn((action) => action.payload);
    // date(action);

    expect({
      address: "testitie 44",
      admin: null,
      email: "testaaja@mail",
      name: "testaaja",
      password: "test_password",
    }).toEqual(expect.objectContaining(newState));

    expect({
      address: "testitie 44",
      admin: null,
      email: "testaaja@mail",
      name: "vaara_testaaja",
      password: "test_password",
    }).toEqual(expect.not.objectContaining(action.payload));
  });
});
