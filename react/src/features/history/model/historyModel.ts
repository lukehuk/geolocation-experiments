import { AppActions } from "main/AppActions";

export const SET_HISTORY_SELECTED_DRIVER = "SET_HISTORY_SELECTED_DRIVER";
export const SET_HISTORY_REFRESH_PAGE = "SET_HISTORY_REFRESH_PAGE";

export interface setHistorySelectedDriverActions {
  type: typeof SET_HISTORY_SELECTED_DRIVER;
  payload: string;
}

export interface setHistoryRefreshPageAction {
  type: typeof SET_HISTORY_REFRESH_PAGE;
  payload: boolean;
}

export const setHistorySelectedDriver = (
  target: string
): setHistorySelectedDriverActions => {
  return {
    type: SET_HISTORY_SELECTED_DRIVER,
    payload: target
  };
};

export const setHistoryRefreshPage = (
  target: boolean
): setHistoryRefreshPageAction => {
  return {
    type: SET_HISTORY_REFRESH_PAGE,
    payload: target
  };
};

export interface HistoryState {
  history: {
    selectedDriver: string;
    historyRefreshPage: boolean;
  };
}

const initialState: HistoryState = {
  history: {
    selectedDriver: "",
    historyRefreshPage: true
  }
};

const HistoryStateReducer = (
  state: HistoryState = initialState,
  action: AppActions
): HistoryState => {
  if (action.type === SET_HISTORY_SELECTED_DRIVER) {
    return {
      ...state,
      history: { ...state.history, selectedDriver: action.payload }
    };
  } else if (action.type === SET_HISTORY_REFRESH_PAGE) {
    return {
      ...state,
      history: { ...state.history, historyRefreshPage: action.payload }
    };
  }
  return state;
};

export { HistoryStateReducer };
