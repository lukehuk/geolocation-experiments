import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setModeAllocation,
  setModeHistory,
  setModeTrip
} from "features/mode/actions";
import {
  Body,
  Border,
  ModeList,
  Name,
  Spacer,
  Title,
  Wrapper
} from "./Header.style";
import { getMode } from "../../mode/selectors";
import { ThemeProvider } from "styled-components";
import { Mode } from "../../mode/modeModel";
import { ToolButton } from "../ToolButton";

export interface ConversationDescriptionFragment {
  id: string;
  name: string;
  description: string;
}

const Header = () => {
  const mode = useSelector(getMode);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <Body>
        <Title>
          <Name>Geolocation Demo</Name>
        </Title>
        <ModeList>
          <ThemeProvider theme={{ selected: mode === Mode.Allocation }}>
            <Name
              onClick={() => {
                dispatch(setModeAllocation());
              }}
            >
              Allocation
            </Name>
          </ThemeProvider>
          <Spacer>|</Spacer>
          <ThemeProvider theme={{ selected: mode === Mode.Trip }}>
            <Name
              onClick={() => {
                dispatch(setModeTrip());
              }}
            >
              Trip
            </Name>
          </ThemeProvider>
          <Spacer>|</Spacer>
          <ThemeProvider theme={{ selected: mode === Mode.History }}>
            <Name
              onClick={() => {
                dispatch(setModeHistory());
              }}
            >
              History
            </Name>
          </ThemeProvider>
        </ModeList>
        <ToolButton />
      </Body>
      <Border />
    </Wrapper>
  );
};

export { Header };
