import React , {Component, Fragment} from 'react'
import PropTypes from 'prop-types'

class MarkOut extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    wrapper: PropTypes.func,
    lineWrapper: PropTypes.func,
    /*
    * TODO: how about also pass strings as wrapper and line wrapper?
    * */
  }
  getWrapper = ({children}) => {
    const {wrapper} = this.props
    const Tag = wrapper ? wrapper : Fragment
    return <Tag>{children}</Tag>
  }
  getNewLines = () => {
    const {source} = this.props
    return source.split('\n')
  }
  renderLine = (line, index) => {
    const Paragraph = this.props.lineWrapper
    if (Paragraph) {
      return <Paragraph key={index}>{line}</Paragraph>
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

export default MarkOut