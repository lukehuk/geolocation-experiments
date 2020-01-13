import { createSelector } from "reselect";
import { AppState } from "main/storeTypes";

const getCurrentTripSlice = (state: AppState) => state.currentTrip;

export const getCurrentTrip = createSelector(
  [getCurrentTripSlice],
  (app: ReturnType<typeof getCurrentTripSlice>) => {
    return app.currentTrip;
  }
);
