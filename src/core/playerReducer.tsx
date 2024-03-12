const initialState: player = {
  avatarUrl: "",
  birthday: new Date(),
  height: null,
  id: null,
  name: "",
  number: null,
  position: "",
  team: null,
  teamName: "",
  weight: null,
};
export interface player {
  avatarUrl: string;
  birthday: any;
  height: number | null;
  id: number | null;
  name: string;
  number: number | null;
  position: string;
  team: number | null;
  teamName: string;
  weight: number | null;
}

interface Action {
  type: string;
  payload: player;
}

function playerReducer(state: player = initialState, action: Action): player {
  switch (action.type) {
    case "player/set":
      return {
        ...state,
        ...action.payload,
      };
    case "allRefresh":
      return initialState;
    default:
      return state;
  }
}

export default playerReducer;
