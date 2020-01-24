import { createSelector } from "reselect";
import { AppState } from "main/storeTypes";

const getAllocationSlice = (state: AppState) => state.allocation;

export const getAllocation = createSelector(
  [getAllocationSlice],
  (app: ReturnType<typeof getAllocationSlice>) => {
    return app.allocation;
  }
);
