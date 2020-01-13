import {
  Driver,
  GoogleMapsLocation,
  Passenger,
  setCurrentTripState,
  setCurrentTripStateStage,
  TripStage
} from "./currentTripModel";

export function setCurrentTrip(
  id: string,
  passenger: Passenger,
  driver: Driver,
  origin: GoogleMapsLocation,
  destination: GoogleMapsLocation
) {
  return setCurrentTripState({
    currentTrip: {
      id: id,
      passenger: passenger,
      driver: driver,
      origin: origin,
      destination: destination,
      stage: TripStage.NotStarted,
      directions: null
    }
  });
}

export function setCurrentTripStageCompleted() {
  return setCurrentTripStateStage(TripStage.Completed);
}

export function setCurrentTripStageInProgress() {
  return setCurrentTripStateStage(TripStage.InProgress);
}
