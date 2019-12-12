import styled from "styled-components/macro";

export const Wrapper = styled.section`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    background-color: white;
  }
`;

export const BackIconWrapper = styled.div`
  cursor: pointer;
  display: none;
  @media (max-width: 480px) {
    display: flex;
    margin-right: 25px;
  }
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 27px;
`;

export const Border = styled.div`
  border-bottom: 1px solid #d0dae5;
  margin: 0 20px;
  @media (max-width: 480px) {
    display: none;
  }
`;

export const Title = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export const ModeList = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;

export const Spacer = styled.div`
  font-size: 15px;
  color: #585858;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  line-height: 20px;
  text-transform: capitalize;
  margin: 0px 10px;
`;

export const Name = styled.div`
  font-size: 15px;
  color: ${props =>
    props.theme.selected ? "var(--accent-color-1);" : "var(--accent-color-3);"}
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  line-height: 20px;
  text-transform: capitalize;
  &:hover {
    color: var(--accent-color-2);
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Description = styled.div`
  font-size: 13px;
  color: #9b9b9b;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  line-height: 20px;
  text-transform: capitalize;
  @media (max-width: 480px) {
    line-height: 15px;
  }
`;
