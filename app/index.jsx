/** @jsx h */
import { h, render, Component } from 'preact'
import { Header, Title, Footer, Button, ButtonGroup, NavGroup } from 'preact-photon'
import Quill from './editor.jsx'
import { remote } from 'electron'
import fs from 'mz/fs'
const { dialog } = remote

// Wrap inconvenient APIs with promises
function showSaveDialogAsync (options) {
  return new Promise((resolve, reject) => {
    try {
      const files = dialog.showSaveDialog(options || {})
      resolve(files)
    } catch (err) {
      reject(err)
    }
  })
}

function showOpenDialogAsync (options) {
  const htmlDefaults = {
    properties: ['openFile'],
    filters: [
      { name: 'HTML Documents',
        extensions: ['html', 'htm', 'shtml', 'xhtml'],
      },
    ],
  }
  return new Promise((resolve, reject) => {
    try {
      const files = dialog.showOpenDialog(options || htmlDefaults)
      resolve(files)
    } catch (err) {
      reject(err)
    }
  })
}

function saveFileAsync (fileName, content) {
  if (typeof fileName !== 'string') throw Error('Filename must be a string')
  return fs.writeFile(fileName, content)
}

const Sidebar = () => (
  <div className='pane pane-sm sidebar hide'>
    <NavGroup>
      <NavGroup.Title>Places</NavGroup.Title>
      <NavGroup.Item icon='home'>Home</NavGroup.Item>
    </NavGroup>
  </div>
)

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      editor: null,
      title: 'Electron Quill',
    }
  }

  getChildContext () {
    return {
      setEditor: (editor) => {
        this.setState({ editor: editor })
      },
    }
  }

  componentDidMount () {
    this.state.editor.focus()
  }

  handleClickSave = () => {
    if (typeof this.state.editor !== 'object') return
    if (!(this.state.editor.root instanceof Element)) return
    const content = this.state.editor.root.innerHTML
    showSaveDialogAsync()
      .then((filename) => saveFileAsync(filename, content))
      .then((filename) => this.setState({ title: filename }))
      .catch((err) => console.error(err))
  }

  handleClickOpen = () => {
    showOpenDialogAsync()
      .then((filenames) => {
        this.setState({ title: filenames[0] })
        return fs.readFile(filenames[0], 'utf8')
      })
      .then((content) => this.replaceEditorContents(content))
      .catch(console.error)
  }

  handleClickNew = () => {
    this.replaceEditorContents('')
  }

  replaceEditorContents = (content) => {
    // TODO confirm contents have been saved before overriding
    try {
      this.state.editor.setText('\n')
      this.state.editor.clipboard.dangerouslyPasteHTML(0, content)
      this.state.editor.focus()
      return
    } catch (err) {
      throw err // handle in promise
    }
  }

  render () {
    return (
      <div className='window'>
        <Header>
          <Title>{this.state.title}</Title>
          <div className='toolbar-actions'>
            <ButtonGroup>
              <Button
                mini
                icon='floppy'
                onClick={this.handleClickSave}
              />
              <Button
                mini
                icon='folder'
                onClick={this.handleClickOpen}
              />
            </ButtonGroup>
            <Button
              mini
              icon='plus'
              class='pull-right'
              onClick={this.handleClickNew}
            />
          </div>
        </Header>

        <div className='window-content'>
          <div className='pane-group'>
            <Sidebar />
            <div className='pane'>
              <Quill
                placeholder={''}
                container='#editor'
                theme={'bubble'}
              />
              <div id='editor' />
            </div>
          </div>
        </div>

        <Footer>
          <Title>
            0 Words
          </Title>
        </Footer>
      </div>
    )
  }
}

render(<App />, document.body)
