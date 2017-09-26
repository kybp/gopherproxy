import AppBar from 'material-ui/AppBar'
import * as React from 'react'
import { connect } from 'react-redux'
import { ItemTypes } from '../item'
import Directory from './Directory'
import TextFile from './TextFile'

interface IProps {
  currentItemType: ItemTypes
}

class App extends React.Component<IProps, {}> {
  public render() {
    return (
      <div>
        <AppBar title="Gopher" />
        { this.props.currentItemType === ItemTypes.DIRECTORY
          ? <Directory />
          : <TextFile /> }
      </div>
    )
  }
}

const mapStateToProps = (
  { currentItemType }:
  { currentItemType: ItemTypes },
): IProps => ({
  currentItemType,
})

export default connect(mapStateToProps)(App)
