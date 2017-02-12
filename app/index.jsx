/** @jsx h */
import { h, render } from 'preact'
import { Header, Title, Footer, Button, ButtonGroup, NavGroup } from 'preact-photon'
import Quill from './editor.jsx'

const Sidebar = () => (
  <div className='pane pane-sm sidebar'>
    <NavGroup>
      <NavGroup.Title>Places</NavGroup.Title>
      <NavGroup.Item icon='home'>Home</NavGroup.Item>
    </NavGroup>
  </div>
)

render((
  <div className='window'>
    <Header>
      <Title>React Editor</Title>
      <div className='toolbar-actions'>
        <ButtonGroup>
          <Button icon='left' />
          <Button icon='right' />
        </ButtonGroup>
        <Button icon='arrows-ccw' class='pull-right' />
        <Button icon='home'>Home</Button>
      </div>
    </Header>

    <div className='window-content'>
      <div className='pane-group'>
        <Sidebar />
        <div className='pane'>
          <Quill placeholder={"Let's go!"} container='#editor' />
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
), document.body)
