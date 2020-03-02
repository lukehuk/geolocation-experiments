import React from "react";
import { ToolButton } from "../../tools/Tools/Tools.style";
import * as DatabaseCommands from "../../database/databaseCommand";
import { setCurrentTrip } from "../current/actions";
import { useDispatch } from "react-redux";

const TripTools = () => {
  const dispatch = useDispatch();

  return (
    <>
      <ToolButton
        onClick={async () => {
          let origin: google.maps.LatLngLiteral = {
            lat: 37.78809,
            lng: -122.439767
          };
          let destination: google.maps.LatLngLiteral = {
            lat: 37.774013,
            lng: -122.423116
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
                  id: tripDetails.driver.id,
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
      </ToolButton>
    </>
  );
};

export { TripTools };
