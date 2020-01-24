import React, { useState } from "react";
import { ToolButton, ToolsDropdown } from "../../tools/Tools/Tools.style";
import {
  createDriver,
  createPassenger,
  getNearestDriver,
  getPassengers,
  PassengerDetails,
  recordDriverLocation,
  recordPassengerLocation
} from "../../database/databaseCommand";
import { useDispatch } from "react-redux";
import {
  setHighlightedDrivers,
  setHighlightedPassengers,
  setRefreshAllocationMap
} from "../model/allocationModel";

const AllocationTools = () => {
  const spawnCentre = {
    lat: 37.782058,
    lng: -122.394936
  };

  const passengerPlaceholder: JSX.Element = (
    <option key="" value="">
      Select passenger...
    </option>
  );

  const [selectedPassenger, setSelectedPassenger] = useState("");
  const [reloadEntities, setReloadEntities] = useState(true);
  const [passengerList, setPassengerList] = useState([passengerPlaceholder]);

  const dispatch = useDispatch();

  function createNewDriver() {
    createDriver().then(r => {
      recordDriverLocation(
        r.id,
        new Date()
          .getTime()
          .toString()
          .padEnd(17, "0"), //PubNub timestamps are 17 digits
        {
          x: Math.random() / 100 + (spawnCentre.lat - 0.005),
          y: Math.random() / 100 + (spawnCentre.lng - 0.005)
        }
      ).then(() => {
        dispatch(setRefreshAllocationMap(true));
        dispatch(setHighlightedPassengers([]));
        dispatch(setHighlightedDrivers([]));
        setReloadEntities(true);
      });
    });
  }

  function createNewPassenger() {
    createPassenger().then(r => {
      recordPassengerLocation(
        r.id,
        new Date()
          .getTime()
          .toString()
          .padEnd(17, "0"), //PubNub timestamps are 17 digits
        {
          x: Math.random() / 100 + (spawnCentre.lat - 0.005),
          y: Math.random() / 100 + (spawnCentre.lng - 0.005)
        }
      ).then(() => {
        dispatch(setRefreshAllocationMap(true));
        dispatch(setHighlightedPassengers([]));
        dispatch(setHighlightedDrivers([]));
        setReloadEntities(true);
      });
    });
  }

  function getExistingPassengers() {
    if (reloadEntities) {
      getPassengers()
        .then((r: PassengerDetails[]) =>
          r.flatMap(passenger => (
            <option key={passenger.id} value={passenger.id}>
              {passenger.name}
            </option>
          ))
        )
        .then(options =>
          setPassengerList([passengerPlaceholder].concat(options))
        );
      setReloadEntities(false);
    }
    return passengerList;
  }

  function identifyClosestDriver() {
    getNearestDriver(selectedPassenger).then(r =>
      dispatch(setHighlightedDrivers([r]))
    );
  }

  function refreshAllocationPage() {
    dispatch(setRefreshAllocationMap(true));
    setReloadEntities(true);
  }

  //TODO On identify, store ID of selected driver/passenger in redux
  return (
    <div>
      <ToolButton onClick={refreshAllocationPage}>Refresh Map</ToolButton>
      <br />

      <ToolButton onClick={createNewDriver}>Create Driver</ToolButton>
      <br />

      <ToolButton onClick={createNewPassenger}>Create Passenger</ToolButton>
      <br />

      <ToolsDropdown
        defaultValue=""
        children={getExistingPassengers()}
        onChange={e => {
          dispatch(setHighlightedPassengers([e.target.value]));
          dispatch(setHighlightedDrivers([]));
          setSelectedPassenger(e.target.value);
        }}
      />
      <ToolButton onClick={identifyClosestDriver}>
        Identify Closest Driver
      </ToolButton>
    </div>
  );
};

export { AllocationTools };
