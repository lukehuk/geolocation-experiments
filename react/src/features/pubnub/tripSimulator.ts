import { TripStage } from "../trip/current/currentTripModel";
import {
  channels,
  PubNubMessageFormat,
  PubNubMessageType
} from "./pubnubModel";
import _ from "lodash-es";

const simulateTrip = (
  driverId: string,
  tripStage: TripStage,
  directions: google.maps.DirectionsResult,
  pubnubClient: any,
  startTrip: () => void,
  completeTrip: () => void
) => {
  const speed = 20;
  const maxTime = 25;

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

        if (step.duration.value > maxTime) {
          const latDiff = step.end_location.lat() - step.start_location.lat();
          const lngDiff = step.end_location.lng() - step.start_location.lng();
          const stepsNeeded = step.duration.value / maxTime;
          const latStepSize = latDiff / stepsNeeded;
          const lngStepSize = lngDiff / stepsNeeded;

          const newCurrentStep = _.cloneDeep(step);

          newCurrentStep.end_location = new google.maps.LatLng(
            step.start_location.lat() + latStepSize,
            step.start_location.lng() + lngStepSize
          );
          newCurrentStep.duration.value =
            newCurrentStep.duration.value / stepsNeeded;

          const nextStep = _.cloneDeep(step);
          nextStep.start_location = newCurrentStep.end_location;
          nextStep.duration.value =
            nextStep.duration.value - newCurrentStep.duration.value;

          performStep(newCurrentStep, [nextStep].concat(remainingSteps));
        } else {
          performStep(step, remainingSteps);
        }
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
