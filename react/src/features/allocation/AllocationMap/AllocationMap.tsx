import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllocation } from "../model/selectors";
import {
  EntityLocation,
  getLastKnownDriverLocations,
  getLastKnownPassengerLocations
} from "../../database/databaseCommand";
import { setRefreshAllocationMap } from "../model/allocationModel";

const defaultMapCenter = {
  lat: 37.782058,
  lng: -122.394936
};

interface loc {
  entityId: string;
  iconUrl: string;
  position: google.maps.LatLngLiteral;
}

const AllocationMap = () => {
  const locArray: loc[] = [];
  const [clickedLatLng, setClickedLatLng] = useState(defaultMapCenter);
  const [locations, setLocations] = useState(locArray);
  const dispatch = useDispatch();
  const allocationState = useSelector(getAllocation);

  const generateMarker = (location: loc, highlight: boolean) => {
    return (
      <Marker
        key={location.entityId}
        animation={
          highlight ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP
        }
        icon={{
          url: location.iconUrl,
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(15, 15)
        }}
        position={location.position}
      />
    );
  };

  const buildLocationObject = (
    entityLocation: EntityLocation,
    url: string
  ): loc => {
    console.log(JSON.stringify(entityLocation));
    return {
      entityId: entityLocation.id,
      iconUrl: url,
      position: {
        lat: entityLocation.position.x,
        lng: entityLocation.position.y
      }
    };
  };

  const getLocations = () => {
    getLastKnownDriverLocations().then(driverLocations => {
      getLastKnownPassengerLocations().then(passengerLocations => {
        let driverLocs = driverLocations.flatMap(driverLocation =>
          buildLocationObject(
            driverLocation,
            "https://freeiconshop.com/wp-content/uploads/edd/car-flat.png"
          )
        );
        let passengerLocs = passengerLocations.flatMap(passengerLocation =>
          buildLocationObject(
            passengerLocation,
            "https://freeiconshop.com/wp-content/uploads/edd/person-flat.png"
          )
        );
        setLocations(driverLocs.concat(passengerLocs));
        dispatch(setRefreshAllocationMap(false));
      });
    });
  };

  const generateMarkers = () => {
    return locations.flatMap(loc => {
      if (
        allocationState.highlightedDrivers.includes(loc.entityId) ||
        allocationState.highlightedPassengers.includes(loc.entityId)
      ) {
        return generateMarker(loc, true);
      } else {
        return generateMarker(loc, false);
      }
    });
  };

  return (
    <GoogleMap
      zoom={15}
      center={defaultMapCenter}
      id="geolocation-map"
      onClick={e => setClickedLatLng(e.latLng.toJSON())}
    >
      <Marker position={clickedLatLng} />
      {allocationState.refreshAllocationMap && getLocations()}
      {generateMarkers()}
    </GoogleMap>
  );
};

export { AllocationMap };
