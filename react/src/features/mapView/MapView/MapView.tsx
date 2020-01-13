import React from "react";
import { AnimatedWrapper, Body } from "./MapView.style";
import { Header } from "../Header";
import { useSelector } from "react-redux";
import { getPanelStates } from "features/layout/selectors";
import "./mapview.css";
import { getMode } from "../../mode/selectors";
import { Mode } from "../../mode/modeModel";
import { AllocationMap } from "../../allocation/AllocationMap/AllocationMap";
import { TripMap } from "../../trip/TripMap/TripMap";
import { HistoryMap } from "../../history/HistoryMap/HistoryMap";

const MapView = () => {
  const panels = useSelector(getPanelStates);
  const mode = useSelector(getMode);

  const getMap = () => {
    switch (mode) {
      case Mode.Allocation:
        return <AllocationMap />;
      case Mode.Trip:
        return <TripMap />;
      case Mode.History:
        return <HistoryMap />;
    }
  };

  return (
    <AnimatedWrapper pose={panels.Content ? "open" : "closed"}>
      <Header />
      <Body>{getMap()}</Body>
    </AnimatedWrapper>
  );
};

export { MapView };
