import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {PlayersWrapper} from './PlayerSummaryStyled'
import PlayerSummary from './PlayerSummary'

const PlayersBar = ({store}) => {
  const {players} = store
  const renderPlayer = player => {
    return <PlayerSummary player={player} key={player.color} />
  }
  return (
    <PlayersWrapper>
      {players.map(renderPlayer)}
    </PlayersWrapper>
  )
}

PlayersBar.propTypes = {
  store: PropTypes.object.isRequired,
}

export default inject('store')(observer(PlayersBar))