/** @jsx h */
import { h, Component } from 'preact'
import { PropTypes } from 'react'
import Quill from 'quill'

class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      html: '',
      quillInstance: null,
    }
  }

  componentDidMount () {
    this.quillInstance = new Quill(this.props.container, {
      theme: this.props.theme,
      placeholder: this.props.placeholder,
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  render () {
    return <div />
  }
}

Editor.propTypes = {
  placeholder: PropTypes.string,
  container: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['snow', 'bubble']),
}

Editor.defaultProps = {
  placeholder: '',
  theme: 'snow',
}

export default Editor
