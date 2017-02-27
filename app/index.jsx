/** @jsx h */
import { h, render, Component } from 'preact'
import { Header, Title, Footer, Button, ButtonGroup, NavGroup } from 'preact-photon'
import Quill from './editor.jsx'
import { remote } from 'electron'
const { dialog } = remote

const Sidebar = () => (
  <div className='pane pane-sm sidebar hide'>
    <NavGroup>
      <NavGroup.Title>Places</NavGroup.Title>
      <NavGroup.Item icon='home'>Home</NavGroup.Item>
    </NavGroup>
  </div>
)

class App extends Component {

  handleClickSave = () => {
    dialog.showSaveDialog()
  }

  handleClickOpen = () => {
    dialog.showOpenDialog({
      properties: ['openFile'],
    })
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
