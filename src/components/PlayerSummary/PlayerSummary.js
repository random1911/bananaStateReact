import React from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {
  Container,
  Header,
  PlayerMain,
  Name,
  Status,
  AvatarContainer,
  PlayerRest,
  PlayerButtons,
} from './PlayerSummaryStyled'

const PlayerSummary = props => {
  const {color, name, formattedBalance, isFrozen, frozenStatus, frozenTurnsCount} = props.player
  return (
    <Container>
      <Header color={color}>
        <AvatarContainer />
        <PlayerMain>
          <Name>{name}</Name>
          <Status>TODO status</Status>
        </PlayerMain>
      </Header>
      <PlayerRest>
        <div>Balance: ${formattedBalance}</div>
        <div>Income: TODO</div>
        <div>Frozen: {isFrozen ? 'yes' : 'no'}</div>
        <div>{frozenStatus}, frozen for {frozenTurnsCount} turns</div>
      </PlayerRest>
      <PlayerButtons>
        <button>details</button>
        <button>find</button>
      </PlayerButtons>
    </Container>
  )
}

PlayerSummary.propTypes = {
  player: PropTypes.object.isRequired,
}

export default observer(PlayerSummary)