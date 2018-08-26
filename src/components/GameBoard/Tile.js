import React from 'react'
import PropTypes from 'prop-types'
import {
  TileBody,
  TileCaption,
  TileNumber,
  TileDescription,
} from './GameBoardStyled'
import PlayerChip from './PlayerChip'

/*
id: types.number,
  caption: types.string,
  description: types.string,
  players: types.optional(types.array(availableColors), []),
  position: coordinates,
  next: types.array(coordinates),
 */

const Tile = ({id, caption, position, description, players, prev, next, borders}) => {
  const renderPlayers = player => <PlayerChip color={player.color} name={player.name} key={player.color} />
  return (
    <TileBody position={position} borders={borders}>
      <TileNumber>
        {id}
      </TileNumber>
      <TileCaption>
        {caption}
      </TileCaption>
      <TileDescription>
        {description}
      </TileDescription>
      <div>
        {players && players.map(renderPlayers)}
      </div>
    </TileBody>
  )
}

Tile.propTypes = {
  id: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  description: PropTypes.string,
  players: PropTypes.array,
}

export default Tile