import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {
  Wrapper,
  Heading,
  Nav,
  Menu,
  MenuItem,
} from './WelcomeStyled'

const Welcome = ({store}) => {
  return (
    <Wrapper>
      <Heading>Welcome to Costa de Banana!</Heading>
      <Nav>
        <Menu>
          <MenuItem>
            <Link to="/play">Play</Link>
          </MenuItem>
        </Menu>
      </Nav>
    </Wrapper>
  )
}
Welcome.propTypes = {
  store: PropTypes.object.isRequired,
}

export default inject('store')(observer(Welcome))