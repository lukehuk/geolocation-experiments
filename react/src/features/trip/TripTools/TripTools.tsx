import React from "react";
import { CreateTripButton } from "../../tools/Tools/Tools.style";
import * as DatabaseCommands from "../../database/databaseCommand";
import { setCurrentTrip } from "../current/actions";
import { useDispatch } from "react-redux";

const TripTools = () => {
  const dispatch = useDispatch();

  return (
    <>
      Origin:
      <br />
      <br />
      Destination:
      <br />
      <br />
      <CreateTripButton
        onClick={async () => {
          let origin: google.maps.LatLngLiteral = {
            lat: 40.756795,
            lng: -73.954298
          };
          let destination: google.maps.LatLngLiteral = {
            lat: 41.756795,
            lng: -78.954298
          };
          let tripDetails = await DatabaseCommands.createTrip(
            { x: origin.lat, y: origin.lng },
            { x: destination.lat, y: destination.lng }
          );
          dispatch(
            setCurrentTrip(
              tripDetails.id,
              tripDetails.passenger,
              {
                id: tripDetails.driver.id,
                name: tripDetails.driver.name,
                profilePicture: tripDetails.driver.profilePicture,
                currentLocation: {
                  timetoken: new Date()
                    .getTime()
                    .toString()
                    .padEnd(17, "0"), //PubNub timestamps are 17 digits
                  position: { x: origin.lat, y: origin.lng }
                }
              },
              origin,
              destination
            )
          );
        }}
      >
        Create Trip
      </CreateTripButton>
    </>
  );
};

export { TripTools };
