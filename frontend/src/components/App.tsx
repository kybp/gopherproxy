import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import * as React from 'react'
import { connect } from 'react-redux'
import { setMonospace } from '../actions'
import { ItemTypes } from '../item'
import Directory from './Directory'
import TextFile from './TextFile'

interface IProps {
  currentItemType: ItemTypes
  dispatch?: any
}

interface IState {
  drawerOpen: boolean
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { drawerOpen: false }
  }

  public render() {
    return (
      <div>
        <AppBar
          title="Gopher"
          onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) }
        />
        <Drawer
          docked={ false }
          open={ this.state.drawerOpen }
          onRequestChange={ (drawerOpen: boolean) => {
              this.setState({ drawerOpen })
          } }
        >
          <MenuItem>
            <Toggle
              label="Monospace"
              defaultToggled={ true }
              onToggle={ (_, newValue) => {
                  this.props.dispatch(setMonospace(newValue))
              } }
            />
          </MenuItem>
        </Drawer>
        <div style={ { display: 'flex', justifyContent: 'center' } }>
          { this.props.currentItemType === ItemTypes.DIRECTORY
            ? <Directory />
            : <TextFile /> }
        </div>
      </div>
    )
  }

  private toggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }
}

const mapStateToProps = (
  { currentItemType }:
  { currentItemType: ItemTypes },
): IProps => ({
  currentItemType,
})

export default connect(mapStateToProps)(App)
