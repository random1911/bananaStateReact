import React, {Component} from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
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
    caption: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    blocking: PropTypes.bool,
    children: PropTypes.node.isRequired
  };
  render() {
    const { caption, onClose, blocking, children } = this.props;
    return (
      <ModalWrapper>
        <ModalContainer>
          {!blocking && <ModalCloseOnOutside onClick={onClose} />}
          <ModalHeader>
            <ModalCaption>{caption}</ModalCaption>
            {!blocking && (
              <ModalClose onClick={onClose}>
                <ModalCloseText>Close</ModalCloseText>
              </ModalClose>
            )}
          </ModalHeader>
          <ModalContent>{children}</ModalContent>
        </ModalContainer>
      </ModalWrapper>
    );
  }
}

export default inject("store")(observer(Modal));
