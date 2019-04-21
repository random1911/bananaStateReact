import styled from "styled-components";
import { getColor } from "../GameContainer/GameContainerStyled";

export const PlayersWrapper = styled.div`
  display: flex;
  flex: none;
`;

export const Container = styled.div`
  min-width: 130px;
  border-left: 1px solid ${p => p.theme.colors.borderColor()};
`;

export const Header = styled.header`
  display: flex;
  background: ${p => getColor(p)};
  color: #fff;
`;
export const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  background: #ccc;
  flex: none;
`;

export const PlayerMain = styled.div`
  flex: none;
  padding: 0 10px;
  text-align: center;
`;

export const Name = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
`;

export const Status = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 18px;
`;
export const PlayerRest = styled.div`
  margin: 0;
  padding: 10px;
`;

export const PlayerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
