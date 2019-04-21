import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import FocusLock, { AutoFocusInside } from "react-focus-lock";
import { isElementInsideParent } from "../../helpers/helpers";
import { DropdownWrapper } from "./DropdownStyled";

class DropdownDrop extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.node,
    closeCallback: PropTypes.func.isRequired,
    params: PropTypes.shape({
      minWidth: PropTypes.number,
      height: PropTypes.number,
      top: PropTypes.number,
      left: PropTypes.number
    })
  };
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = {
      style: {}
    };
  }
  componentDidMount() {
    document.body.addEventListener("click", this.handleOutSideClick);
    document.addEventListener("keydown", this.handleEscPress);
    this.setStyles();
    this.props.store.ui.onDropdownOpen();
  }
  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleOutSideClick);
    document.removeEventListener("keydown", this.handleEscPress);
    this.props.store.ui.onDropdownClose();
  }

  setStyles = () => {
    const { params } = this.props;
    if (!params) return;
    const { minWidth, top, left, height } = params;
    const { innerHeight, pageYOffset } = window;
    const style = {
      minWidth: `${minWidth}px` || 0,
      top: `${top + height + pageYOffset}px` || "auto",
      left: `${left}px` || "auto",
      maxHeight: `${innerHeight - height - top}px`
    };
    this.setState({ style });
  };
  handleOutSideClick = e => {
    if (!isElementInsideParent(e.target, this.node.current)) {
      this.onClose();
    }
  };
  onClose = () => {
    this.props.closeCallback();
  };
  handleEscPress = e => {
    if (e.key !== "Escape") return;
    e.stopPropagation();
    this.onClose();
  };
  render() {
    const dropdownRoot = document.getElementById("dropdown-root");
    const { children } = this.props;
    const drop = (
      <FocusLock>
        <AutoFocusInside>
          <DropdownWrapper ref={this.node} style={this.state.style}>
            {children}
          </DropdownWrapper>
        </AutoFocusInside>
      </FocusLock>
    );
    return ReactDOM.createPortal(drop, dropdownRoot);
  }
}

export default inject("store")(observer(DropdownDrop));
