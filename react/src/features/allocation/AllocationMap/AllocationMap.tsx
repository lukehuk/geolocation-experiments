import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const defaultMapCenter = {
  lat: 37.782058,
  lng: -122.394936
};

const AllocationMap = () => {
  const [clickedLatLng, setClickedLatLng] = useState(defaultMapCenter);

  const generateMarkers = (iconUrl: string, numberToGen: number) => {
    let markers = [];
    for (let i = 0; i < numberToGen; i++) {
      let position: google.maps.LatLngLiteral = {
        lat: Math.random() / 100 + (clickedLatLng.lat - 0.005),
        lng: Math.random() / 100 + (clickedLatLng.lng - 0.005)
      };
      markers.push(
        <Marker
          key={i}
          icon={{
            url: iconUrl,
            scaledSize: new google.maps.Size(30, 30),
            anchor: new google.maps.Point(15, 15)
          }}
          position={position}
        />
      );
    }
    return markers;
  };

  const generateDrivers = () => {
    return generateMarkers(
      "https://freeiconshop.com/wp-content/uploads/edd/car-flat.png",
      20
    );
  };

  const generatePassengers = () => {
    return generateMarkers(
      "https://freeiconshop.com/wp-content/uploads/edd/person-flat.png",
      10
    );
  };

  return (
    <GoogleMap
      zoom={16}
      center={defaultMapCenter}
      id="geolocation-map"
      onClick={e => setClickedLatLng(e.latLng.toJSON())}
    >
      <Marker position={clickedLatLng} />
      {generateDrivers()}
      {generatePassengers()}
    </GoogleMap>
  );
};

export { AllocationMap };
