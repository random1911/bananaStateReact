import React from 'react'
import PropTypes from 'prop-types'
import {Chip} from './GameBoardStyled'

const PlayerChip = ({color, name}) => (
  <Chip color={color} title={name} />
)

PlayerChip.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default PlayerChip