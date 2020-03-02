import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { getLiveLocation } from "../model/selectors";
import { setRefreshLiveLocationMap } from "../model/liveLocationModel";

const LiveLocationMap = () => {
  let mapCenter = {
    lat: 37.782058,
    lng: -122.394936
  };

  let mapBounds: google.maps.LatLngBoundsLiteral | undefined = undefined;
  const [map, setMap] = useState<null | google.maps.Map>(null);
  const dispatch = useDispatch();
  const liveLocationState = useSelector(getLiveLocation);

  const setBounds = () => {
    let locs = Object.values(liveLocationState.driverLocations).map(
      driverLocation => {
        return {
          lat: driverLocation.position.x,
          lng: driverLocation.position.y
        };
      }
    );

    if (typeof google !== "undefined" && locs.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      locs.map(loc => bounds.extend(loc));
      mapBounds = bounds.toJSON();
    } else if (locs.length === 1) {
      mapCenter = locs[0];
    }

    if (liveLocationState.refreshLiveLocationMap) {
      dispatch(setRefreshLiveLocationMap(false));
    }
  };

  const boundsHandler = () => {
    if (mapBounds && map) {
      map.fitBounds(mapBounds);
    }
  };

  const generateMarker = (
    driverId: string,
    location: google.maps.LatLngLiteral
  ) => {
    return (
      <Marker
        key={driverId}
        animation={google.maps.Animation.DROP}
        position={location}
        title={"Driver " + driverId}
        icon={{
          url: process.env.PUBLIC_URL + "/driverIcon.png",
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(15, 15)
        }}
      />
    );
  };

  const generateLiveMarkers = () => {
    return Object.entries(liveLocationState.driverLocations).flatMap(
      ([driverId, driverLocation]) =>
        generateMarker(driverId, {
          lat: driverLocation.position.x,
          lng: driverLocation.position.y
        })
    );
  };
  return (
    <>
      {setBounds()}

      <GoogleMap
        zoom={mapBounds ? undefined : 16}
        center={mapBounds ? undefined : mapCenter}
        id="geolocation-map"
        onLoad={setMap}
      >
        {generateLiveMarkers()}
        {boundsHandler()}
      </GoogleMap>
    </>
  );
};

export { LiveLocationMap };
