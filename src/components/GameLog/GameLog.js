import React, {Component} from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Container, Scroll, List } from "./GameLogStyled";
import LogMessage from "./LogMessage";

class GameLog extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }
  scrollId = 'gameLogScroll'
  listId = 'gameLogList'
  renderMessage = message => (
    <LogMessage
      key={message.id}
      turn={message.turn}
      caption={message.caption}
      playerColor={message.playerColor}
      message={message.message}
    />
  );
  scrollToBottom = () => {
    const container = document.getElementById(this.scrollId)
    const list = document.getElementById(this.listId)
    container.scrollTop = list.offsetHeight
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }
  render() {
    const { messages } = this.props.store.log;
    return (
      <Container>
        <Scroll id={this.scrollId}>
          <List id={this.listId}>{messages.map(this.renderMessage)}</List>
        </Scroll>
      </Container>
    );
  }

}

const GameLog1 = ({ store }) => {
  const { messages } = store.log;
  const renderMessage = message => (
    <LogMessage
      key={message.id}
      turn={message.turn}
      caption={message.caption}
      playerColor={message.playerColor}
      message={message.message}
    />
  );
  return (
    <Container>
      <Scroll>
        <List>{messages.map(renderMessage)}</List>
      </Scroll>
    </Container>
  );
};

GameLog1.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(GameLog));
