import { combineReducers } from "redux";

import { LayoutStateReducer } from "features/layout/layoutModel";
import { ModeStateReducer } from "../features/mode/modeModel";
import { CurrentTripStateReducer } from "../features/trip/current/currentTripModel";
import { AllocationStateReducer } from "../features/allocation/model/allocationModel";
import { HistoryStateReducer } from "../features/history/model/historyModel";
import { LiveLocationStateReducer } from "../features/liveLocation/model/liveLocationModel";

/**
 * Combine all of the reducers in this application
 */
const rootReducer = combineReducers({
  layout: LayoutStateReducer,
  mode: ModeStateReducer,
  liveLocation: LiveLocationStateReducer,
  allocation: AllocationStateReducer,
  currentTrip: CurrentTripStateReducer,
  history: HistoryStateReducer
});

export default rootReducer;

/**
 * RootState describes the shape of the global Redux store in this application
 */
export type RootState = Readonly<ReturnType<typeof rootReducer>>;
