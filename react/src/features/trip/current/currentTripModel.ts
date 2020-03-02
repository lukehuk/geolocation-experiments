import { AppActions } from "main/AppActions";
import { Point } from "../../database/databaseCommand";

export const SET_CURRENT_TRIP = "SET_CURRENT_TRIP";

export interface setCurrentTripAction {
  type: typeof SET_CURRENT_TRIP;
  payload: CurrentTripState;
}

export const setCurrentTripState = (
  target: CurrentTripState
): setCurrentTripAction => {
  return {
    type: SET_CURRENT_TRIP,
    payload: target
  };
};

export const SET_CURRENT_TRIP_DIRECTIONS = "SET_CURRENT_TRIP_DIRECTIONS";

export interface setCurrentTripDirectionsAction {
  type: typeof SET_CURRENT_TRIP_DIRECTIONS;
  payload: google.maps.DirectionsResult;
}

export const setCurrentTripDirections = (
  target: google.maps.DirectionsResult
): setCurrentTripDirectionsAction => {
  return {
    type: SET_CURRENT_TRIP_DIRECTIONS,
    payload: target
  };
};

export const SET_CURRENT_TRIP_STAGE = "SET_CURRENT_TRIP_STAGE";

export interface setCurrentTripStageAction {
  type: typeof SET_CURRENT_TRIP_STAGE;
  payload: TripStage;
}

export const setCurrentTripStateStage = (
  target: TripStage
): setCurrentTripStageAction => {
  return {
    type: SET_CURRENT_TRIP_STAGE,
    payload: target
  };
};

export const SET_CURRENT_TRIP_DRIVER_LOCATION =
  "SET_CURRENT_TRIP_DRIVER_LOCATION";

export interface setCurrentTripDriverLocationAction {
  type: typeof SET_CURRENT_TRIP_DRIVER_LOCATION;
  payload: DriverLocation;
}

export const setCurrentTripDriverLocation = (
  target: DriverLocation
): setCurrentTripDriverLocationAction => {
  return {
    type: SET_CURRENT_TRIP_DRIVER_LOCATION,
    payload: target
  };
};

export type GoogleMapsLocation =
  | string
  | google.maps.LatLng
  | google.maps.LatLngLiteral
  | google.maps.Place;

export interface DriverLocation {
  timetoken: string;
  id: string;
  position: Point;
}

export interface Driver {
  id: string;
  name: string;
  profilePicture: string;
  currentLocation: DriverLocation;
}

export interface Passenger {
  id: string;
  name: string;
  profilePicture: string;
}

export enum TripStage {
  NotStarted,
  InProgress,
  Completed
}

export interface CurrentTripState {
  currentTrip: {
    id: string;
    passenger: Passenger;
    driver: Driver;
    origin: GoogleMapsLocation;
    destination: GoogleMapsLocation;
    stage: TripStage;
    directions: google.maps.DirectionsResult | null;
  };
}

const initialState: CurrentTripState = {
  currentTrip: {
    id: "",
    passenger: {
      id: "",
      name: "",
      profilePicture: ""
    },
    driver: {
      id: "",
      name: "",
      profilePicture: "",
      currentLocation: {
        timetoken: "",
        id: "",
        position: {
          x: 0,
          y: 0
        }
      }
    },
    origin: "",
    destination: "",
    stage: TripStage.NotStarted,
    directions: null
  }
};

const CurrentTripStateReducer = (
  state: CurrentTripState = initialState,
  action: AppActions
): CurrentTripState => {
  if (action.type === SET_CURRENT_TRIP) {
    return { ...state, currentTrip: action.payload.currentTrip };
  } else if (action.type === SET_CURRENT_TRIP_DIRECTIONS) {
    return {
      ...state,
      currentTrip: { ...state.currentTrip, directions: action.payload }
    };
  } else if (action.type === SET_CURRENT_TRIP_STAGE) {
    return {
      ...state,
      currentTrip: { ...state.currentTrip, stage: action.payload }
    };
  } else if (action.type === SET_CURRENT_TRIP_DRIVER_LOCATION) {
    return {
      ...state,
      currentTrip: {
        ...state.currentTrip,
        driver: {
          ...state.currentTrip.driver,
          currentLocation: action.payload
        }
      }
    };
  }
  return state;
};

export { CurrentTripStateReducer };
