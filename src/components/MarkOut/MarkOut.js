import React , {Component, Fragment} from 'react'
import PropTypes from 'prop-types'

class MarkOut extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    wrapper: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    lineWrapper: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
  }
  getWrapper = ({children}) => {
    const Wrapper = this.props.wrapper
    if (Wrapper && typeof Wrapper === 'function') {
      return <Wrapper>{children}</Wrapper>
    }
    if (Wrapper && typeof Wrapper === 'string') {
      return React.createElement(Wrapper, {}, children)
    }
    return <Fragment>{children}</Fragment>
  }
  getNewLines = () => {
    const {source} = this.props
    return source.split('\n')
  }
  renderLine = (line, index) => {
    const Paragraph = this.props.lineWrapper
    if (Paragraph && typeof Paragraph === 'function') {
      return <Paragraph key={index}>{line}</Paragraph>
    }
    if (Paragraph && typeof Paragraph === 'string') {
      return React.createElement(Paragraph, {}, line)
    }
    return <Fragment key={index}>{line}<br /></Fragment>
  }
  render() {
    const Wrapper = this.getWrapper
    const lines = this.getNewLines()
    return (
      <Wrapper>
        {lines.map(this.renderLine)}
      </Wrapper>
    )
  }
}

export const LineBreaker = ({source, wrapper, lineWrapper}) => {
  const getWrapper = ({children}) => {
    const Wrapper = wrapper
    if (Wrapper && typeof Wrapper === 'function') {
      return <Wrapper>{children}</Wrapper>
    }
    if (Wrapper && typeof Wrapper === 'string') {
      return React.createElement(Wrapper, {}, children)
    }
    return <Fragment>{children}</Fragment>
  }
  const getNewLines = () => {
    return source.split('\n')
  }
  const renderLine = (line, index) => {
    const Paragraph = lineWrapper
    if (Paragraph && typeof Paragraph === 'function') {
      return <Paragraph key={index}>{line}</Paragraph>
    }
    if (Paragraph && typeof Paragraph === 'string') {
      return React.createElement(Paragraph, {}, line)
    }
    return <Fragment key={index}>{line}<br /></Fragment>
  }
  const Wrapper = getWrapper
  const lines = getNewLines()
  return (
    <Wrapper>
      {lines.map(renderLine)}
    </Wrapper>
  )
}

LineBreaker.propTypes = {
  source: PropTypes.string.isRequired,
  wrapper: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  lineWrapper: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
}

export default MarkOut