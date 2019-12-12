import React from "react";

import { Wrapper } from "./style";
import { Login } from "features/authentication/Login/Login";
import { Geolocation } from "features/geolocation/Geolocation";
import { isUserLoggedIn } from "features/authentication/authenticationModel";
import { useSelector } from "react-redux";
import keyConfiguration from "config/geolocation-app-keys.json";
import isAppConfigured from "foundations/utilities/isAppConfigured";
import { ErrorBanner } from "main/styles/ErrorBanner.style";

const ErrorBannerComponent = (
  <ErrorBanner>
    <div>
      Please run <pre>npm setup</pre>
    </div>
  </ErrorBanner>
);

export const ApplicationRouter = () => {
  const loggedIn = useSelector(isUserLoggedIn);
  const view = loggedIn ? <Geolocation /> : <Login />;
  return (
    <Wrapper>
      {!isAppConfigured(keyConfiguration) && ErrorBannerComponent}
      {view}
    </Wrapper>
  );
};
