import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../model/selectors";
import { setHistoryRefreshPage } from "../model/historyModel";
import { getDriverLocationHistory } from "../../database/databaseCommand";

const HistoryMap = () => {
  const mapCenter = {
    lat: 37.782058,
    lng: -122.394936
  };

  const locArray: google.maps.LatLngLiteral[] = [];
  const [locations, setLocations] = useState(locArray);
  const [
    mapBounds,
    setMapBounds
  ] = useState<null | google.maps.LatLngBoundsLiteral>(null);
  const [map, setMap] = useState<null | google.maps.Map>(null);
  const dispatch = useDispatch();
  const historyState = useSelector(getHistory);

  const updateDriverHistory = () => {
    if (historyState.selectedDriver === "") {
      dispatch(setHistoryRefreshPage(false));
      return;
    }
    getDriverLocationHistory(historyState.selectedDriver).then(
      driverLocations => {
        let locs = driverLocations.map(point => {
          return {
            lat: point.x,
            lng: point.y
          };
        });

        if (typeof google !== "undefined") {
          const bounds = new google.maps.LatLngBounds();

          locs.map(loc => bounds.extend(loc));

          setMapBounds(bounds.toJSON());
        }

        setLocations(locs);
        dispatch(setHistoryRefreshPage(false));
      }
    );
  };

  const generateMarker = (
    location: google.maps.LatLngLiteral,
    index: number
  ) => {
    return (
      <Marker
        key={index}
        animation={google.maps.Animation.DROP}
        position={location}
      />
    );
  };

  const generateHistoryMarkers = () => {
    return locations.flatMap((loc, i) => generateMarker(loc, i));
  };

  const boundsHandler = () => {
    if (mapBounds && map) {
      map.fitBounds(mapBounds);
    }
  };

  return (
    <GoogleMap
      zoom={mapBounds ? undefined : 16}
      center={mapBounds ? undefined : mapCenter}
      id="geolocation-map"
      onLoad={setMap}
    >
      {historyState.historyRefreshPage && updateDriverHistory()}
      {historyState.historyRefreshPage && boundsHandler()}
      {generateHistoryMarkers()}
    </GoogleMap>
  );
};

export { HistoryMap };
