import React from 'react'
import {Link} from 'react-router-dom'
import {
  Wrapper,
  Status,
  Text,
} from './NotFoundStyled'

const NotFound = () => {
  return (
    <Wrapper>
      <Status>
        404
      </Status>
      <Text>
        Not found. You can go to the <Link to="/">main page</Link>.
      </Text>
    </Wrapper>
  )
}

export default NotFound