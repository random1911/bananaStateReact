import React from "react";
import PropTypes from "prop-types";
import { MessageBody, Turn, Caption, MessageText } from "./GameLogStyled";

const LogMessage = ({ turn, playerColor, caption, message }) => (
  <MessageBody>
    <Turn>{turn}</Turn>
    <MessageText>
      {caption && <Caption color={playerColor}>{caption}</Caption>}
      <span>{message}</span>
    </MessageText>
  </MessageBody>
)

LogMessage.propTypes = {
  turn: PropTypes.number,
  playerColor: PropTypes.string,
  caption: PropTypes.string,
  message: PropTypes.string
};

export default LogMessage;
