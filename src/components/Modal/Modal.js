import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import ReactDOM from "react-dom";
import { t } from "i18next";
import Translate from "../Translate/Translate";
import {
  ModalContainer,
  ModalCloseOnOutside,
  ModalCaption,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalWrapper
} from "./ModalStyled";

class Modal extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    caption: PropTypes.string,
    captionId: PropTypes.string,
    onClose: PropTypes.func,
    blocking: PropTypes.bool,
    children: PropTypes.node.isRequired
  };
  static defaultProps = {
    isOpen: false
  };

  constructor(props) {
    super(props);
    const { store, id } = props;
    store.ui.addModal(id);
  }

  componentDidMount() {
    const { isOpen, store, id } = this.props;
    isOpen && store.ui.openModal(id);
  }
  componentDidUpdate() {
    const { store, id, blocking } = this.props;
    const isOpen = store.ui.findModal(id).isOpen;
    isOpen &&
      !blocking &&
      document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { blocking, store } = this.props;
    const { dropdownIsOpen } = store.ui;
    if (e.key === "Escape" && !blocking && !dropdownIsOpen) {
      this.handleClose();
      e.stopPropagation();
    }
  };

  handleClose = () => {
    const { store, id } = this.props;
    store.ui.closeModal(id);
    document.removeEventListener("keydown", this.handleKeyDown);
  };

  render() {
    const { caption, captionId, blocking, children, id, store } = this.props;
    const modal = store.ui.findModal(id);
    const modalRoot = document.getElementById("modal-root");
    const closeText = t("general.close");
    const CaptionTemplate = () => {
      if (!caption && !captionId) return null;
      if (captionId) return <Translate id={captionId} />;
      return caption;
    };
    const template = (
      <ModalWrapper>
        {!blocking && <ModalCloseOnOutside onClick={this.handleClose} />}
        <ModalContainer>
          <ModalHeader>
            <ModalCaption>
              <CaptionTemplate />
            </ModalCaption>
            {!blocking && (
              <ModalClose title={closeText} onClick={this.handleClose} />
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
