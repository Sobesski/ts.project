
export interface Auth {
  token: string | null,
  isLoaded: Boolean,
  name:string
}
interface Action {
  type: string;
  payload: {
    token: string,
    name: string
  };
}

let initialState: Auth;
try {
  initialState = JSON.parse(localStorage.auth);
} catch (e) {
  initialState = {
    token: null,
    isLoaded: false,
    name:''
  };
}
console.log(initialState);
function authReducer(state: Auth = initialState, action: Action): Auth {
  if (action.type === "auth/loaded") {
    return {
      ...state,
      token: action.payload.token,
      name: action.payload.name
    };
  }
  return state;
}

export default authReducer;
