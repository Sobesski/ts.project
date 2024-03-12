import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import playerReducer from "./playerReducer";
import playersReducer from "./playersReducer";
import teamReducer from "./teamReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  players: playersReducer,
  team: teamReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
