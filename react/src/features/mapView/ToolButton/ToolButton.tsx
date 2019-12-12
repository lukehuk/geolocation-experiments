import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPanelStates } from "features/layout/selectors";
import { setLayoutRight } from "features/layout/actions";
import { IconWrapper, ToolsLabel, Wrapper } from "./ToolButton.style";
import { Toolbox } from "../../../foundations/components/icons/Toolbox";

const ToolButton = () => {
  const panels = useSelector(getPanelStates);
  const isRightLayoutToggled = panels.Right;
  const dispatch = useDispatch();

  return (
    <Wrapper
      highlighted={isRightLayoutToggled}
      onClick={() => {
        dispatch(setLayoutRight());
      }}
    >
      <ToolsLabel>Tools</ToolsLabel>
      <IconWrapper>
        <Toolbox
          fill={
            isRightLayoutToggled
              ? "var(--accent-color-2)"
              : "var(--accent-color-4)"
          }
        />
      </IconWrapper>
    </Wrapper>
  );
};

export { ToolButton };
