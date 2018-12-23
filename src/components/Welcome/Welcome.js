import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Wrapper, Heading, Nav, Menu, MenuItem } from "./WelcomeStyled";
import Modal from "../Modal/Modal";
import Translate from "../Translate/Translate";
import {LineBreaker} from "../MarkOut/MarkOut"
import Select from '../Dropdown/Select'

const selectModel = [
  {
    id: 0,
    value: 0,
    name: 'First'
  },
  {
    id: 1,
    value: 2,
    name: 'Second'
  },
  {
    id: 2,
    value: 2,
    name: 'Third'
  }
]
class ModalSelect extends React.Component {
  state = {
    selected: {...selectModel[0]}
  }
  onSelect = selected => {
    this.setState({selected})
  }
  render() {
    const {selected} = this.state
    return (
      <div>
        <Select items={selectModel} selected={selected} onSelect={this.onSelect} />
        <div>
          Now selected: {selected.name}
        </div>
      </div>
    )
  }
}

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

      <LineBreaker source={text} wrapper="div" lineWrapper="p" />

      <Modal id="Hello" captionId="welcome.welcomeHeading">
        This is a test
        <ModalSelect />
      </Modal>
    </Wrapper>
  );
};
Welcome.propTypes = {
  store: PropTypes.object.isRequired
};

export default inject("store")(observer(Welcome));
