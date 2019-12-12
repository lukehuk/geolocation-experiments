import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const HistoryMap = () => {
  const mapCenter = {
    lat: 37.782058,
    lng: -122.394936
  };
  return (
    <GoogleMap zoom={14} center={mapCenter} id="geolocation-map">
      <Marker position={mapCenter} />
    </GoogleMap>
  );
};

export { HistoryMap };
