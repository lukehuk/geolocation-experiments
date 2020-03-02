import { AppActions } from "main/AppActions";

export enum Mode {
  LiveLocation,
  Allocation,
  Trip,
  History
}

export const SET_MODE = "SET_MODE";

export interface setModeAction {
  type: typeof SET_MODE;
  payload: Mode;
}

export const setMode = (target: Mode): setModeAction => {
  return {
    type: SET_MODE,
    payload: target
  };
};

interface ModeState {
  mode: Mode;
}

const initialState: ModeState = {
  mode: Mode.Allocation
};

const ModeStateReducer = (
  state: ModeState = initialState,
  action: AppActions
): ModeState => {
  if (action.type === SET_MODE) {
    return { ...state, mode: action.payload };
  }
  return state;
};

export { ModeStateReducer };
