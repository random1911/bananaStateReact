import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Wrapper, Heading, Nav, Menu, MenuItem } from "./WelcomeStyled";
import Modal from '../Modal/Modal'

const Welcome = ({ store }) => {
  const sayHello = () => {
    store.ui.openModal('Hello')
  }
  return (
    <Wrapper>
      <Heading>Welcome to Costa de Banana!</Heading>
      <Nav>
        <Menu>
          <MenuItem>
            <Link to="/play">Play</Link>
          </MenuItem>
        </Menu>
      </Nav>
      <button onClick={sayHello}>say hello</button>
      <Modal id="Hello" caption="Hello">
        This is a test
      </Modal>
    </Wrapper>
  );
};
Welcome.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(Welcome));
