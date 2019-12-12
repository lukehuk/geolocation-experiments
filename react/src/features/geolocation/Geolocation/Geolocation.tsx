import React from "react";
import { Wrapper } from "./Geolocation.style";
import { MapView } from "features/mapView/MapView/MapView";
import { Tools } from "features/tools/Tools/Tools";
import { ChangeThemeModal } from "features/theme/ChangeThemeModal";

const Geolocation = () => {
  return (
    <Wrapper>
      <MapView />
      <Tools />
      <ChangeThemeModal />
    </Wrapper>
  );
};

export { Geolocation };
