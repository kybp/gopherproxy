import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import * as React from 'react'
import { connect } from 'react-redux'
import { setCurrentItem } from '../actions'
import { setMonospace } from '../actions'
import { selectItem } from '../actions'
import IItem, { ItemTypes } from '../item'
import Directory from './Directory'
import TextFile from './TextFile'

interface IProps {
  currentItem: IItem
  loading: boolean
  dispatch?: any
}

interface IState {
  drawerOpen: boolean
}

const Loading = () => (
  <h1>Loading...</h1>
)

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { drawerOpen: false }
  }

  public componentWillMount() {
    window.onpopstate = ({ state }) => {
      this.props.dispatch(setCurrentItem(state as IItem))
    }

    if (window.location.search.length === 0) {
      selectItem(this.props.dispatch, this.props.currentItem)
    } else {
      const splitBinding = (binding: string) => {
        const [key, value] = binding.split('=')
        return [key, decodeURIComponent(value)]
      }
      const queryParams = window.location.search.substring(1).split('&')
      const newItem: IItem = {
        data: null,
        description: '',
        host: '',
        port: 70,
        selector: '',
        type: ItemTypes.DIRECTORY,
      }
      const isItemKey = (key: string) => (
        Object.keys(newItem).indexOf(key) !== -1
      )

      for (const [key, value] of queryParams.map(splitBinding)) {
        if (isItemKey(key) && key !== 'data') {
          newItem[key as keyof IItem] = value
        }
      }

      selectItem(this.props.dispatch, newItem)
    }
  }

  public componentWillReceiveProps(newProps: IProps) {
    if (this.props.loading && ! newProps.loading) {
      const value = (key: keyof IItem) => (
        encodeURIComponent(this.props.currentItem[key]))
      const queryString = '?' + Object
        .keys(this.props.currentItem)
        .filter((key) => key !== 'data')
        .map((key: keyof IItem) => `${key}=${value(key)}`)
        .join('&')
      window.history.pushState(this.props.currentItem, '', queryString)
    }
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
              onToggle={ (_: any, newValue: boolean) => {
                  this.props.dispatch(setMonospace(newValue))
              } }
            />
          </MenuItem>
        </Drawer>
        <div style={ { display: 'flex', justifyContent: 'center' } }>
          { this.props.loading
            ? <Loading />
            : this.props.currentItem.type === ItemTypes.DIRECTORY
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
  { currentItem, loading }: { currentItem: IItem, loading: boolean },
): IProps => ({ currentItem, loading })

export default connect(mapStateToProps)(App)
