import styled from "styled-components";
import { getColor } from "../GameContainer/GameContainerStyled";

export const Bar = styled.header`
  height: 50px;
  display: flex;
  flex: none;
  border-bottom: 1px solid ${p => p.theme.colors.borderColor()};
`;
export const BarLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
`;
export const BarRight = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
`;
export const TurnIndicator = styled.div`
  color: #fff;
  padding: 0 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => getColor(p)};
  transition: background ${p => p.theme.transition};
`;
