import { TripStage } from "../trip/current/currentTripModel";
import {
  channels,
  PubNubMessageFormat,
  PubNubMessageType
} from "./pubnubModel";

const simulateTrip = (
  driverId: string,
  tripStage: TripStage,
  directions: google.maps.DirectionsResult,
  pubnubClient: any,
  startTrip: () => void,
  completeTrip: () => void
) => {
  const speed = 120;

  const publishMessage = (message: PubNubMessageFormat) => {
    console.log("Publishing: " + JSON.stringify(message));
    pubnubClient.publish({
      channel: channels[0],
      message
    });
  };

  const publishDriverLocation = (location: google.maps.LatLng) => {
    publishMessage({
      type: PubNubMessageType.TRIP_DRIVER_LOCATION,
      body: {
        driverId: driverId,
        location: {
          x: location.lat(),
          y: location.lng()
        }
      }
    });
  };

  const performStep = (
    currentStep: google.maps.DirectionsStep,
    nextSteps: google.maps.DirectionsStep[]
  ) => {
    publishDriverLocation(currentStep.end_location);
    if (nextSteps.length === 0) {
      completeTrip();
    } else {
      setTimeout(function() {
        const [step, ...remainingSteps] = nextSteps;
        performStep(step, remainingSteps);
      }, (currentStep.duration.value / speed) * 1000);
    }
  };

  if (tripStage === TripStage.NotStarted && directions) {
    startTrip();
    const [initialStep, ...nextSteps] = directions.routes[0].legs[0].steps;
    if (!initialStep) {
      completeTrip();
    } else {
      performStep(initialStep, nextSteps);
    }
  }
};

export default simulateTrip;
