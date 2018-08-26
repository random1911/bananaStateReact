import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {
  Bar,
  BarLeft,
  BarRight,
  TurnIndicator,
} from "./TopBarStyled"

const TopBar = ({store}) => {
  const {currentTurn, activePlayerColor} = store
  return (
    <Bar>
      <BarLeft />
      <TurnIndicator color={activePlayerColor}>Turn: {currentTurn}</TurnIndicator>
      <BarRight />
    </Bar>
  )
}

TopBar.propTypes = {
  store: PropTypes.object.isRequired,
}

export default inject('store')(observer(TopBar))