import gameBuddiesReducer from "../gameBuddiesReducer";
import deepFreeze from "deep-freeze";

describe("gameBuddiesReducer", () => {
  test("returns new state with action gameBuddies/gameBuddies", () => {
    const state = [
      { email: "milla@mail" },
      { email: "kalle@mail" },
      { email: "tiia@mail" },
      { email: "kari@mail" },
    ];
    const action = {
      type: "gameBuddies/gameBuddies",
      payload: [
        { email: "elli@mail" },
        { email: "kari@mail" },
        { email: "hilkka@mail" },
      ],
    };

    deepFreeze(state);
    const newState = gameBuddiesReducer(state, action);

    expect(newState).toHaveLength(3);
    expect(newState[1]).toEqual(expect.objectContaining(state[3]));

    expect({ email: "vaara_kari@mail" }).toEqual(
      expect.not.objectContaining(state[3])
    );
  });
});
