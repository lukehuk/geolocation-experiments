import { createSelector } from "reselect";
import { AppState } from "main/storeTypes";
import { Breakpoint, Layout } from "./layoutModel";

const getLayoutSlice = (state: AppState) => state.layout;

export const getBreakpoint = createSelector(
  [getLayoutSlice],
  (app: ReturnType<typeof getLayoutSlice>) => {
    return app.breakpoint;
  }
);

export const getLayout = createSelector(
  [getLayoutSlice],
  (app: ReturnType<typeof getLayoutSlice>) => {
    return app.layout;
  }
);

interface PanelStates {
  Left: boolean;
  Right: boolean;
  Overlay: boolean;
  ThemeOverlay: boolean;
  Content: boolean;
  Top: boolean;
}

export const getPanelStates = createSelector(
  [getLayout, getBreakpoint],
  (
    layout: ReturnType<typeof getLayout>,
    breakpoint: ReturnType<typeof getBreakpoint>
  ) => {
    return {
      Left: layout === Layout.Left || breakpoint !== Breakpoint.Small,
      Right: layout === Layout.Right,
      Overlay: layout === Layout.Overlay,
      ThemeOverlay: layout === Layout.ThemeOverlay,
      Content:
        breakpoint !== Breakpoint.Small ? true : layout === Layout.Default,
      Top: true
    };
  }
);
