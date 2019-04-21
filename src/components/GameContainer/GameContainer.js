import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Wrapper, WrapperMain, WrapperBottom } from "./GameContainerStyled";
import GameLog from "../GameLog/GameLog";
import GameBoard from "../GameBoard/GameBoard";
import BasicActions from "../GameBoard/BasicActions";
import PlayersBar from "../PlayerSummary/PlayersBar";
import TopBar from "../TopBar/TopBar";

const GameContainer = ({ store }) => {
  const { activePlayerColor } = store;
  return (
    <Wrapper color={activePlayerColor}>
      <TopBar />
      <WrapperMain>
        <GameBoard />
      </WrapperMain>
      <WrapperBottom>
        <GameLog />
        <BasicActions />
        <PlayersBar />
      </WrapperBottom>
    </Wrapper>
  );
};

GameContainer.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(GameContainer));
