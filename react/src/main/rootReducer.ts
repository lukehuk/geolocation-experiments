import { combineReducers } from "redux";

import { LayoutStateReducer } from "features/layout/layoutModel";
import { AuthenticationStateReducer } from "features/authentication/authenticationModel";
import { ModeStateReducer } from "../features/mode/modeModel";

/**
 * Combine all of the reducers in this application
 */
const rootReducer = combineReducers({
  layout: LayoutStateReducer,
  mode: ModeStateReducer,
  authentication: AuthenticationStateReducer
});

export default rootReducer;

/**
 * RootState describes the shape of the global Redux store in this application
 */
export type RootState = Readonly<ReturnType<typeof rootReducer>>;
