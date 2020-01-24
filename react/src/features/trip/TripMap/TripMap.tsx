import React from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTrip } from "../current/selectors";
import { setCurrentTripDirections } from "../current/currentTripModel";
import simulateTrip from "../../pubnub/tripSimulator";
import {
  setCurrentTripStageCompleted,
  setCurrentTripStageInProgress
} from "../current/actions";
import { usePubNub } from "pubnub-react";

const TripMap = () => {
  const dispatch = useDispatch();
  const mapCenter = { lat: 37.782058, lng: -122.394936 };
  const currentTrip = useSelector(getCurrentTrip);
  const pubnubClient = usePubNub();

  return (
    <GoogleMap
      zoom={16}
      center={currentTrip.directions === null ? mapCenter : undefined}
      id="geolocation-map"
    >
      {currentTrip.driver.id !== "" &&
        currentTrip.origin !== "" &&
        currentTrip.destination !== "" &&
        currentTrip.directions === null && (
          <DirectionsService
            options={{
              origin: currentTrip.origin,
              destination: currentTrip.destination,
              travelMode: google.maps.TravelMode.DRIVING
            }}
            callback={(result, status) => {
              if (status === "OK") {
                dispatch(setCurrentTripDirections(result));
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }}
          />
        )}
      {currentTrip.directions !== null && (
        <DirectionsRenderer directions={currentTrip.directions} />
      )}
      {currentTrip.directions !== null && (
        <Marker
          animation={google.maps.Animation.DROP}
          position={{
            lat: currentTrip.driver.currentLocation.position.x,
            lng: currentTrip.driver.currentLocation.position.y
          }}
          zIndex={999}
          icon={{
            url: currentTrip.driver.profilePicture,
            scaledSize: new google.maps.Size(30, 30),
            anchor: new google.maps.Point(15, 15)
          }}
        />
      )}
      {currentTrip.directions !== null &&
        simulateTrip(
          currentTrip.driver.id,
          currentTrip.stage,
          currentTrip.directions,
          pubnubClient,
          () => {
            dispatch(setCurrentTripStageInProgress());
          },
          () => {
            dispatch(setCurrentTripStageCompleted());
          }
        )}
    </GoogleMap>
  );
};

export { TripMap };
