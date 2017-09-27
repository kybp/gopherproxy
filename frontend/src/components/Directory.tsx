import axios from 'axios'
import { List } from 'material-ui/List'
import * as React from 'react'
import { connect } from 'react-redux'
import { finishLoading } from '../actions'
import { setDirectoryItems } from '../actions'
import { setTextFile } from '../actions'
import { startLoading } from '../actions'
import IItem, { ItemTypes } from '../item'
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
      type: ItemTypes.DIRECTORY,
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
    this.props.dispatch(startLoading())

    axios.get(
      'http://127.0.0.1:8080/api/', { params: item },
    ).then(({ data }: { data: any }) => {
      this.props.dispatch(finishLoading())

      switch (item.type) {
        case ItemTypes.DIRECTORY:
          this.props.dispatch(setDirectoryItems(data.items))
          break
        case ItemTypes.TEXT_FILE:
          this.props.dispatch(setTextFile(data.body))
      }
    }).catch((error) => alert(error))
  }
}

const mapStateToProps = (state: any): IDirectoryProps => ({
  fontStyle: state.fontStyle,
  items: state.directoryItems.items,
})

export default connect(mapStateToProps)(Directory)
