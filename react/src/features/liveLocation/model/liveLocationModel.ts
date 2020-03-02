import { DriverLocation } from "../../trip/current/currentTripModel";
import { AppActions } from "../../../main/AppActions";

export const SET_REFRESH_LIVE_LOCATION_MAP = "SET_REFRESH_LIVE_LOCATION_MAP";
export const SET_LIVE_DRIVER_LOCATION = "SET_LIVE_DRIVER_LOCATION";

export interface setRefreshLiveLocationMapAction {
  type: typeof SET_REFRESH_LIVE_LOCATION_MAP;
  payload: boolean;
}

export interface setLiveDriverLocationAction {
  type: typeof SET_LIVE_DRIVER_LOCATION;
  payload: DriverLocation;
}

export const setRefreshLiveLocationMap = (
  target: boolean
): setRefreshLiveLocationMapAction => {
  return {
    type: SET_REFRESH_LIVE_LOCATION_MAP,
    payload: target
  };
};

export const setLiveDriverLocation = (
  target: DriverLocation
): setLiveDriverLocationAction => {
  return {
    type: SET_LIVE_DRIVER_LOCATION,
    payload: target
  };
};

export interface DriverLocations {
  [driverId: string]: DriverLocation;
}

export interface LiveLocationState {
  liveLocation: {
    driverLocations: DriverLocations;
    refreshLiveLocationMap: boolean;
  };
}

const initialState: LiveLocationState = {
  liveLocation: {
    driverLocations: {},
    refreshLiveLocationMap: true
  }
};

const LiveLocationStateReducer = (
  state: LiveLocationState = initialState,
  action: AppActions
): LiveLocationState => {
  if (action.type === SET_LIVE_DRIVER_LOCATION) {
    const driverLocation =
      state.liveLocation.driverLocations[action.payload.id];
    if (
      !driverLocation ||
      driverLocation.timetoken < action.payload.timetoken
    ) {
      return {
        ...state,
        liveLocation: {
          ...state.liveLocation,
          driverLocations: {
            ...state.liveLocation.driverLocations,
            [action.payload.id]: action.payload
          }
        }
      };
    } else {
      return state;
    }
  } else if (action.type === SET_REFRESH_LIVE_LOCATION_MAP) {
    return {
      ...state,
      liveLocation: {
        ...state.liveLocation,
        refreshLiveLocationMap: action.payload
      }
    };
  }
  return state;
};

export { LiveLocationStateReducer };
