import gameBuddyUserReducer from "../gameBuddyUserReducer";
import deepFreeze from "deep-freeze";

describe("gameBuddyUserReducer", () => {
  test("returns new state with action  gameBuddyUser/gameBuddyUser", () => {
    const state = {
      name: "",
      level: "",
      times: "",
    };
    const action = {
      type: "gameBuddyUser/gameBuddyUser",
      payload: {
        email: "testi@mail",
        level: "aloittelija",
        name: "testi",
        times: "aamu",
      },
    };

    deepFreeze(state);
    const newState = gameBuddyUserReducer(state, action);

    expect({
      email: "testi@mail",
      level: "aloittelija",
      name: "testi",
      times: "aamu",
    }).toEqual(expect.objectContaining(newState));

    expect({
      email: "vaara_testi@mail",
      level: "aloittelija",
      name: "vaara_testi",
      times: "aamu",
    }).toEqual(expect.not.objectContaining(action.payload));
  });
});
