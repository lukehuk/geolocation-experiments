import { AppActions } from "main/AppActions";

export const SET_HIGHLIGHTED_DRIVERS = "SET_HIGHLIGHTED_DRIVER";
export const SET_HIGHLIGHTED_PASSENGERS = "SET_HIGHLIGHTED_PASSENGER";
export const SET_REFRESH_ALLOCATION_MAP = "SET_REFRESH_ALLOCATION_MAP";

export interface setHighlightedDriversAction {
  type: typeof SET_HIGHLIGHTED_DRIVERS;
  payload: string[];
}

export interface setHighlightedPassengersAction {
  type: typeof SET_HIGHLIGHTED_PASSENGERS;
  payload: string[];
}

export interface setRefreshAllocationMapAction {
  type: typeof SET_REFRESH_ALLOCATION_MAP;
  payload: boolean;
}

export const setHighlightedDrivers = (
  target: string[]
): setHighlightedDriversAction => {
  return {
    type: SET_HIGHLIGHTED_DRIVERS,
    payload: target
  };
};

export const setHighlightedPassengers = (
  target: string[]
): setHighlightedPassengersAction => {
  return {
    type: SET_HIGHLIGHTED_PASSENGERS,
    payload: target
  };
};

export const setRefreshAllocationMap = (
  target: boolean
): setRefreshAllocationMapAction => {
  return {
    type: SET_REFRESH_ALLOCATION_MAP,
    payload: target
  };
};

export interface AllocationState {
  allocation: {
    highlightedDrivers: string[];
    highlightedPassengers: string[];
    refreshAllocationMap: boolean;
  };
}

const initialState: AllocationState = {
  allocation: {
    highlightedDrivers: [],
    highlightedPassengers: [],
    refreshAllocationMap: true
  }
};

const AllocationStateReducer = (
  state: AllocationState = initialState,
  action: AppActions
): AllocationState => {
  if (action.type === SET_HIGHLIGHTED_PASSENGERS) {
    return {
      ...state,
      allocation: { ...state.allocation, highlightedPassengers: action.payload }
    };
  } else if (action.type === SET_HIGHLIGHTED_DRIVERS) {
    return {
      ...state,
      allocation: { ...state.allocation, highlightedDrivers: action.payload }
    };
  } else if (action.type === SET_REFRESH_ALLOCATION_MAP) {
    return {
      ...state,
      allocation: { ...state.allocation, refreshAllocationMap: action.payload }
    };
  }
  return state;
};

export { AllocationStateReducer };
