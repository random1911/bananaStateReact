import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown'

const DropMenu = props => <Dropdown type="menu" {...props} />


DropMenu.propTypes = {
  useTranslate: PropTypes.bool,
  headerText: PropTypes.string,
  closeTimeout: PropTypes.number,
  customHead: PropTypes.func,
  headerWidth: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]).isRequired,
}

export default DropMenu
