import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Translate from "../Translate/Translate";
import { Head, Arrow, CurrentValue } from "./DropdownStyled";
import DropdownDrop from "./DropdownDrop";
import SelectDrop from "./SelectDrop";

class Dropdown extends Component {
  static propTypes = {
    useTranslate: PropTypes.bool,
    selected: PropTypes.object,
    headerText: PropTypes.string,
    closeTimeout: PropTypes.number,
    customHead: PropTypes.func,
    onSelect: PropTypes.func,
    items: PropTypes.array,
    headerWidth: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
      PropTypes.object
    ]),
    type: PropTypes.oneOf(["select", "menu"]).isRequired
  };
  constructor(props) {
    super(props);
    this.headElement = React.createRef();
    this.state = {
      isOpen: false,
      dropdownPosition: {},
      isClosing: false
    };
  }
  getPositionProps = () => {
    const node = this.headElement.current;
    const rect = node.getBoundingClientRect();
    return {
      minWidth: node.offsetWidth,
      height: node.offsetHeight,
      top: rect.top,
      left: rect.left
    };
  };
  open = () => {
    if (this.state.isClosing) return;
    this.setState({
      isOpen: true,
      dropdownPosition: this.getPositionProps()
    });
  };
  close = () => {
    this.setState({ isOpen: false, isClosing: true });
    setTimeout(() => {
      this.headElement.current.focus();
      this.setState({ isClosing: false });
    }, this.props.closeTimeout);
  };
  render() {
    const {
      useTranslate,
      customHead,
      items,
      onSelect,
      selected,
      headerWidth,
      type,
      headerText
    } = this.props;
    const { isOpen, dropdownPosition } = this.state;
    const CustomHeader = customHead;
    const displayValue = headerText || selected.name;
    return (
      <Fragment>
        {CustomHeader ? (
          <CustomHeader
            innerRef={this.headElement}
            onClick={this.open}
            open={isOpen}
            width={headerWidth}
          >
            {useTranslate ? <Translate id={displayValue} /> : displayValue}
          </CustomHeader>
        ) : (
          <Head
            innerRef={this.headElement}
            onClick={this.open}
            width={headerWidth}
          >
            <CurrentValue>
              {useTranslate ? <Translate id={displayValue} /> : displayValue}
            </CurrentValue>
            <Arrow open={isOpen} />
          </Head>
        )}
        {isOpen && (
          <DropdownDrop closeCallback={this.close} params={dropdownPosition}>
            {type === "select" && (
              <SelectDrop
                closeCallback={this.close}
                items={items}
                onSelect={onSelect}
                selectedId={selected.id}
              />
            )}
            {type === "menu" && this.props.children}
          </DropdownDrop>
        )}
      </Fragment>
    );
  }
}

Dropdown.defaultProps = {
  closeTimeout: 100
};

export default Dropdown;
