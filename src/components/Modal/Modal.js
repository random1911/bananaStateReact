import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import ReactDOM from "react-dom";
import {
  ModalContainer,
  ModalCloseOnOutside,
  ModalCaption,
  ModalClose,
  ModalCloseText,
  ModalContent,
  ModalHeader,
  ModalWrapper
} from "./ModalStyled";

class Modal extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    caption: PropTypes.string,
    onClose: PropTypes.func,
    blocking: PropTypes.bool,
    children: PropTypes.node.isRequired
  };
  static defaultProps = {
    isOpen: false
  };

  constructor(props) {
    super(props);
    const { ui } = props.store;
    ui.addModal(props.id);
  }

  componentDidMount() {
    const { isOpen, store, id, blocking } = this.props;
    isOpen && store.ui.findModal(id).open();
    !blocking && document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    // TODO: actually remove this event listener
  }

  handleKeyDown = e => {
    const escape = e.keyCode === 27;
    escape && this.handleClose();
  };

  handleClose = () => {
    const { store, id, onClose } = this.props;
    store.ui.findModal(id).close();
    onClose && onClose();
  };

  render() {
    const { caption, blocking, children, id, store } = this.props;
    const modal = store.ui.findModal(id);
    const modalRoot = document.getElementById("modal-root");
    const template = (
      <ModalWrapper>
        {!blocking && <ModalCloseOnOutside onClick={this.handleClose} />}
        <ModalContainer>
          <ModalHeader>
            <ModalCaption>{caption}</ModalCaption>
            {!blocking && (
              <ModalClose onClick={this.handleClose}>
                <ModalCloseText>Close</ModalCloseText>
              </ModalClose>
            )}
          </ModalHeader>
          <ModalContent>{children}</ModalContent>
        </ModalContainer>
      </ModalWrapper>
    );
    return modal && modal.isOpen
      ? ReactDOM.createPortal(template, modalRoot)
      : null;
  }
}

export default inject("store")(observer(Modal));
