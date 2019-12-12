import React from "react";
import { useDispatch } from "main/useDispatch";
import {
  Body,
  Button,
  PoweredBy,
  PoweredByPubNub,
  Wrapper
} from "./Login.style";
import PubNubLogo from "./PubNub_Logo.svg";
import { login } from "../loginCommand";
import { isLoggingIn } from "../authenticationModel";
import { isUserLoggedIn } from "features/authentication/authenticationModel";
import { useSelector } from "react-redux";
import KnownIds from "./knownUserIds.json";

const Login = () => {
  const dispatch = useDispatch();
  const loggingIn = useSelector(isLoggingIn);
  const loggedIn = useSelector(isUserLoggedIn);

  const loginWithRandomlyPickedUser = () => {
    if (loggingIn || loggedIn) {
      return;
    }
    const userId = KnownIds[Math.floor(Math.random() * KnownIds.length)];
    dispatch(login(userId));
  };

  if (!loggedIn && !loggingIn) {
    loginWithRandomlyPickedUser();
  }

  return (
    <Wrapper>
      <Body>
        <Button onClick={loginWithRandomlyPickedUser}>
          {loggingIn ? "Connecting" : "Connect"}
        </Button>
        <PoweredByPubNub>
          <PoweredBy>Powered By</PoweredBy>
          <img alt="PubNub" src={PubNubLogo} />
        </PoweredByPubNub>
      </Body>
    </Wrapper>
  );
};

export { Login };
