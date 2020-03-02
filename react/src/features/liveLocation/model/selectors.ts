import { createSelector } from "reselect";
import { AppState } from "main/storeTypes";

const getLiveLocationSlice = (state: AppState) => state.liveLocation;

export const getLiveLocation = createSelector(
  [getLiveLocationSlice],
  (app: ReturnType<typeof getLiveLocationSlice>) => {
    return app.liveLocation;
  }
);
