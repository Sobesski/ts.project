import { CLEAR_STATE } from "./actions";

const initialState: any = {
  teamDate: null,
};
export interface team {
  name: string;
  foundationYear: number | null;
  division: string;
  conference: string;
  imageUrl: string;
}

interface Action {
  type: string;
  payload: team;
}
const storedTeamDataString: any = window.localStorage.getItem("teamData");
console.log(storedTeamDataString);
const storedTeamData: any = storedTeamDataString
  ? JSON.parse(storedTeamDataString)
  : null;
console.log(storedTeamData);
const preloadedState = storedTeamData
  ? { teamDate: storedTeamData }
  : initialState;
console.log(JSON.parse(storedTeamDataString));
function teamReducer(state: team = preloadedState, action: Action): team {
  switch (action.type) {
    case "allRefresh":
      return initialState;
    case "team/set":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default teamReducer;
