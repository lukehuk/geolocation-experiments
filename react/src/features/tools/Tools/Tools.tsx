import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreakpoint, getPanelStates } from "features/layout/selectors";
import { Breakpoint } from "features/layout/layoutModel";
import { setLayoutDefault } from "features/layout/actions";
import { Cross as CrossIcon } from "foundations/components/icons/Cross";
import { Back as BackIcon } from "foundations/components/icons/Back";
import {
  AnimatedWrapper,
  BackIconWrapper,
  CloseIcon,
  Header,
  ScrollableView,
  Title,
  Wrapper
} from "./Tools.style";
import { getMode } from "../../mode/selectors";
import { Mode } from "../../mode/modeModel";
import { AllocationTools } from "../../allocation/AllocationTools/AllocationTools";
import { TripTools } from "../../trip/TripTools/TripTools";
import { HistoryTools } from "../../history/HistoryTools/HistoryTools";

const Tools = () => {
  const dispatch = useDispatch();
  const panels = useSelector(getPanelStates);
  const mode = useSelector(getMode);
  const breakpoint = useSelector(getBreakpoint);
  const Panel = breakpoint === Breakpoint.Small ? Wrapper : AnimatedWrapper;

  let getTools = () => {
    switch (mode) {
      case Mode.Allocation:
        return <AllocationTools />;
      case Mode.Trip:
        return <TripTools />;
      case Mode.History:
        return <HistoryTools />;
      default:
        return <p>~ Tools coming soon! ~</p>;
    }
  };

  return (
    <Panel pose={panels.Right ? "open" : "closed"}>
      <Header>
        <Title>
          <BackIconWrapper
            onClick={() => {
              dispatch(setLayoutDefault());
            }}
          >
            <BackIcon />
          </BackIconWrapper>
          Tools for {Mode[mode]}
        </Title>
        <CloseIcon
          onClick={() => {
            dispatch(setLayoutDefault());
          }}
        >
          <CrossIcon />
        </CloseIcon>
      </Header>
      <ScrollableView>{getTools()}</ScrollableView>
    </Panel>
  );
};

export { Tools };
