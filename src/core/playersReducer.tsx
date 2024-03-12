const initialState: Array<object> = [];

interface players {
  type: string;
  payload: Array<object>;
}

function playersReducer(state: Array<object> = initialState, action: players) {
  if (action.type === "players/set") {
    return action.payload;
  }

  return state;
}

export default playersReducer;
