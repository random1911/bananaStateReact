import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Translate from "../Translate/Translate";
import { Bar, BarLeft, BarRight, TurnIndicator } from "./TopBarStyled";

const TopBar = ({ store }) => {
  const { currentTurn, activePlayerColor } = store;
  return (
    <Bar>
      <BarLeft />
      <TurnIndicator color={activePlayerColor}>
        <Translate id="general.Turn" />: {currentTurn}
      </TurnIndicator>
      <BarRight />
    </Bar>
  );
};

TopBar.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(TopBar));
