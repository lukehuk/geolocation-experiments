import { combineReducers } from "redux";

import { LayoutStateReducer } from "features/layout/layoutModel";
import { ModeStateReducer } from "../features/mode/modeModel";
import { CurrentTripStateReducer } from "../features/trip/current/currentTripModel";

/**
 * Combine all of the reducers in this application
 */
const rootReducer = combineReducers({
  layout: LayoutStateReducer,
  mode: ModeStateReducer,
  currentTrip: CurrentTripStateReducer
});

export default rootReducer;

/**
 * RootState describes the shape of the global Redux store in this application
 */
export type RootState = Readonly<ReturnType<typeof rootReducer>>;
