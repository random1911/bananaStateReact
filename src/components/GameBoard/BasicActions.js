import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { BasicActionsWrapper } from "./GameBoardStyled";

const BasicActions = ({ store }) => {
  const { playerMoving, makeRoll, endTurn, rolled, activePlayer } = store;
  const rollDisabled = playerMoving || rolled || activePlayer.isFrozen;
  const endDisabled = playerMoving || !rolled;
  return (
    <BasicActionsWrapper>
      <button onClick={makeRoll} disabled={rollDisabled}>
        ROLL
      </button>
      <button onClick={endTurn} disabled={endDisabled}>
        END
      </button>
    </BasicActionsWrapper>
  );
};

BasicActions.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(BasicActions));
