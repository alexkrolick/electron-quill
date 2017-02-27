/** @jsx h */
import { h, Component } from 'preact'
import { PropTypes } from 'react'
import Quill from 'quill'

class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      html: '',
      editor: null,
    }
  }

  componentDidMount () {
    this.editor = new Quill(this.props.container, {
      theme: this.props.theme,
      placeholder: this.props.placeholder,
    })
    // Set global reference to editor so IO functions can interact with it
    this.context.setEditor(this.editor)
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

Editor.contextTypes = {
  setEditor: PropTypes.func,
}

Editor.defaultProps = {
  placeholder: '',
  theme: 'snow',
}

export default Editor
