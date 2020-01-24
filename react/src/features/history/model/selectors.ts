import { createSelector } from "reselect";
import { AppState } from "main/storeTypes";

const getHistorySlice = (state: AppState) => state.history;

export const getHistory = createSelector(
  [getHistorySlice],
  (app: ReturnType<typeof getHistorySlice>) => {
    return app.history;
  }
);
