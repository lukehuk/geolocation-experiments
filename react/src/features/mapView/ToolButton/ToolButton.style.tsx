import styled from "styled-components/macro";

export const Wrapper = styled.div<{ highlighted: boolean }>`
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  cursor: pointer;
  font-size: 13px;
  color: ${props =>
    props.highlighted ? "var(--accent-color-2)" : "var(--accent-color-4)"};
  @media (max-width: 480px) {
    flex-direction: column-reverse;
    min-width: 50px;
    margin-left: 25px;
  }
`;

export const ToolsLabel = styled.section`
  margin-right: 5px;
  @media (max-width: 480px) {
    margin-right: 0;
    margin-top: 2px;
  }
  font-style: italics;
  cursor: pointer;
  em {
    font-style: normal;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
  }
`;

export const IconWrapper = styled.span`
  cursor: pointer;
`;
