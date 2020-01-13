import {
  setBreakpointAction,
  setLayoutAction
} from "features/layout/layoutModel";
import { setModeAction } from "features/mode/modeModel";
import {
  setCurrentTripAction,
  setCurrentTripDirectionsAction,
  setCurrentTripDriverLocationAction,
  setCurrentTripStageAction
} from "../features/trip/current/currentTripModel";

/**
 * AppActions is the union of all basic actions in this application.
 *
 * It is used to describe the actions that can be received by a reducer
 * and is helpful for type inference of action payload types when writing
 * switch style reducers.
 *
 * Thunks and other dispatchable objects that will not end up being received by
 * reducers directly should not be added to this union.
 */
export type AppActions =
  | setLayoutAction
  | setBreakpointAction
  | setModeAction
  | setCurrentTripAction
  | setCurrentTripDirectionsAction
  | setCurrentTripStageAction
  | setCurrentTripDriverLocationAction;
