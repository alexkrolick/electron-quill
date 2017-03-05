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
    }
  }

  getChildContext () {
    return {
      setEditor: (editor) => {
        this.setState({ editor: editor })
      },
    }
  }

  handleClickSave = () => {
    if (typeof this.state.editor !== 'object') return
    if (!(this.state.editor.root instanceof Element)) return
    const content = this.state.editor.root.innerHTML
    showSaveDialogAsync()
      .then((fileName) => this.saveFileAsync(fileName, content))
      .catch((err) => console.error(err))
  }

  handleClickOpen = () => {
    dialog.showOpenDialog({
      properties: ['openFile'],
    })
  }

  saveFileAsync = (fileName, content) => {
    if (typeof fileName !== 'string') throw Error('Filename must be a string')
    return fs.writeFile(fileName, content)
  }

  render () {
    return (
      <div className='window'>
        <Header>
          <Title>React Editor</Title>
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
            />
          </div>
        </Header>

        <div className='window-content'>
          <div className='pane-group'>
            <Sidebar />
            <div className='pane'>
              <Quill
                placeholder={"Let's go!"}
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
