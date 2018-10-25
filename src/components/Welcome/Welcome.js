import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Wrapper, Heading, Nav, Menu, MenuItem } from "./WelcomeStyled";
import Modal from "../Modal/Modal";
import Translate from "../Translate/Translate";
import MarkOut from "../MarkOut/MarkOut"

const Welcome = ({ store }) => {
  const sayHello = () => {
    store.ui.openModal("Hello");
  };
  const text = `I was a child\nwhen I meet her\nbut now we are adults`
  return (
    <Wrapper>
      <Heading>
        <Translate id="welcome.welcomeHeading" />
      </Heading>
      <Nav>
        <Menu>
          <MenuItem>
            <Link to="/play">
              <Translate id="welcome.menu.play" />
            </Link>
          </MenuItem>
        </Menu>
      </Nav>
      <button onClick={sayHello}>say hello</button>

      <MarkOut source={text} wrapper={Menu} lineWrapper={MenuItem} />

      <Modal id="Hello" captionId="welcome.welcomeHeading">
        This is a test
      </Modal>
    </Wrapper>
  );
};
Welcome.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(Welcome));
