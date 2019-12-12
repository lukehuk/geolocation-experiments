import { createSelector } from "reselect";
import { AppState } from "main/storeTypes";

const getModeSlice = (state: AppState) => state.mode;

export const getMode = createSelector(
  [getModeSlice],
  (app: ReturnType<typeof getModeSlice>) => {
    return app.mode;
  }
);
