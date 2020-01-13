import React from "react";

import { Wrapper } from "./style";
import { Geolocation } from "features/geolocation/Geolocation";
import keyConfiguration from "config/geolocation-app-keys.json";
import isAppConfigured from "foundations/utilities/isAppConfigured";
import { ErrorBanner } from "main/styles/ErrorBanner.style";
import { GeolocationConsumer } from "../features/pubnub/GeolocationConsumer";

const ErrorBannerComponent = (
  <ErrorBanner>
    <div>
      Please run <pre>npm setup</pre>
    </div>
  </ErrorBanner>
);

export const ApplicationRouter = () => {
  return (
    <Wrapper>
      {!isAppConfigured(keyConfiguration) && ErrorBannerComponent}
      <Geolocation />
      <GeolocationConsumer />
    </Wrapper>
  );
};
