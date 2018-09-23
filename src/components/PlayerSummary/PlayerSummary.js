import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import Translate from "../Translate/Translate";
import {
  Container,
  Header,
  PlayerMain,
  Name,
  Status,
  AvatarContainer,
  PlayerRest,
  PlayerButtons
} from "./PlayerSummaryStyled";

const PlayerSummary = props => {
  const {
    color,
    name,
    formattedIncome,
    formattedBalance,
    currentStatus
  } = props.player;
  return (
    <Container>
      <Header color={color}>
        <AvatarContainer />
        <PlayerMain>
          <Name>{name}</Name>
          <Status>TODO status</Status>
        </PlayerMain>
      </Header>
      <PlayerRest>
        <div>
          <Translate id="playerInfo.balance" /> ${formattedBalance}
        </div>
        <div>
          <Translate id="playerInfo.income" /> ${formattedIncome}
        </div>
        <div>
          <Translate id="playerInfo.status" /> {currentStatus}
        </div>
      </PlayerRest>
      <PlayerButtons>
        <button>details</button>
        <button>find</button>
      </PlayerButtons>
    </Container>
  );
};

PlayerSummary.propTypes = {
  player: PropTypes.object.isRequired
};

export default observer(PlayerSummary);
