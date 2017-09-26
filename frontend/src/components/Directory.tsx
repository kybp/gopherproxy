import axios from 'axios'
import { List } from 'material-ui/List'
import * as React from 'react'
import { connect } from 'react-redux'
import { finishLoadingItems } from '../actions'
import { setDirectoryItems } from '../actions'
import { startLoadingItems } from '../actions'
import IItem, { ItemType } from '../item'
import Item from './Item'

interface IDirectoryProps {
  items: IItem[],
  fontStyle: string,
  dispatch?: any,
}

class Directory extends React.Component<IDirectoryProps, {}> {
  public componentWillMount() {
    this.onSelect({
      description: '',
      host: 'gopher.floodgap.com',
      port: 70,
      selector: '',
      type: ItemType.DIRECTORY,
    })
  }

  public render() {
    return (
      <List>
        { this.props.items.map((item: IItem, i: number) => (
          <Item
            key={ i }
            item={ item }
            fontStyle={ this.props.fontStyle }
            onSelect={ this.onSelect.bind(this) }
          />
        )) }
      </List>
    )
  }

  private onSelect(item: IItem) {
    this.props.dispatch(startLoadingItems())

    axios.get(
      'http://127.0.0.1:8080/api/', { params: item },
    ).then((items) => {
      this.props.dispatch(finishLoadingItems())
      this.props.dispatch(setDirectoryItems(items.data))
    }).catch((error) => alert(error))
  }
}

const mapStateToProps = (state: any): IDirectoryProps => ({
  fontStyle: state.fontStyle,
  items: state.directoryItems.items,
})

export default connect(mapStateToProps)(Directory)
