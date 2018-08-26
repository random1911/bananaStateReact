import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import GameInit from '../GameInit/GameInit'
import GameContainer from '../GameContainer/GameContainer'

const GameWrapper = ({store}) => {
  return (
    <div>
      {store.isRunning ? <GameContainer /> : <GameInit />}
    </div>
  )
}
GameWrapper.propTypes = {
  store: PropTypes.object.isRequired,
}

export default inject('store')(observer(GameWrapper))