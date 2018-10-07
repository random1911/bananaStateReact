import React from 'react'
import {Link} from 'react-router-dom'
import Translate from "../Translate/Translate";
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
        <Translate id="notFound.notFoundText" /> <Link to="/"><Translate id="notFound.mainPage" /></Link>.
      </Text>
    </Wrapper>
  )
}

export default NotFound