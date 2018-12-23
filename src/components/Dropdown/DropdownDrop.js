import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import FocusLock, {AutoFocusInside} from 'react-focus-lock'
import {isElementInsideParent} from '../../helpers/helpers'
import {DropdownWrapper} from './DropdownStyled'

class DropdownDrop extends Component {
  static propTypes = {
    children: PropTypes.node,
    closeCallback: PropTypes.func.isRequired,
    params: PropTypes.shape({
      minWidth: PropTypes.number,
      height: PropTypes.number,
      top: PropTypes.number,
      left: PropTypes.number,
    }),
  }
  constructor(props) {
    super(props)
    this.node = React.createRef()
    this.state = {
      style: {},
    }
  }
  componentDidMount() {
    document.body.addEventListener('click', this.handleOutSideClick)
    this.setStyles()
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOutSideClick)
  }

  setStyles = () => {
    const params = this.props
    if (!params) return
    const {minWidth, top, left, height} = this.props.params
    const {innerHeight, pageYOffset} = window
    const style = {
      minWidth: `${minWidth}px` || 0,
      top: `${top + height + pageYOffset}px` || 'auto',
      left: `${left}px` || 'auto',
      maxHeight: `${innerHeight - height - top}px`,
    }
    this.setState({style})
  }
  handleOutSideClick = e => {
    if (!isElementInsideParent(e.target, this.node.current)) {
      this.props.closeCallback()
    }
  }
  render() {
    const dropdownRoot = document.getElementById('dropdown-root')
    const {
      children,
    } = this.props
    const drop = (
      <FocusLock>
        <AutoFocusInside>
          <DropdownWrapper innerRef={this.node} style={this.state.style}>
            {children}
          </DropdownWrapper>
        </AutoFocusInside>
      </FocusLock>
    )
    return ReactDOM.createPortal(drop, dropdownRoot)
  }
}

export default DropdownDrop
